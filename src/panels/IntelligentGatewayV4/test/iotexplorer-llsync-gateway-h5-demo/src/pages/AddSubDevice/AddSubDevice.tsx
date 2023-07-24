import { useRequest } from 'ahooks';
import h5PanelSdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { useEffect, useState } from 'react';
import { Button, Cell, CellGroup, Divider, Message, Popup, Tag } from 'tdesign-mobile-react';
import { getErrorMsg } from '../../utils';

interface SearchResultInfo {
  productId: string;
  uuid: string;
  protocol: number;
}

interface ProtocolScanReport {
  protocol: number;
  product_id: string;
  uuids: string;
}

const protocolNameMap: Record<number, string> = {
  0: 'BLE MESH',
  1: 'PLC',
  2: 'RS485',
};

const productInfoPromiseCache: Record<string, Promise<null | {
  ProductId: string,
  Name: string,
  Description: string,
  DataTemplate: string,
  NetType: string,
  CategoryId: number,
  ProductType: number,
  UpdateTime: number,
  IconUrl: string,
}>> = {};

const getProductInfoPromise = (productId: string) => {
  if (productInfoPromiseCache[productId] === null || productInfoPromiseCache[productId] === undefined) {
    productInfoPromiseCache[productId] = h5PanelSdk.getProductInfo({ productId }).then(infoList => infoList[0]);
  }
  return productInfoPromiseCache[productId];
};

function SearchResult({ info, onStartBind }: { info: SearchResultInfo; onStartBind: () => void }) {
  const { data } = useRequest(async () => getProductInfoPromise(info.productId));
  return (
    <Cell
      title={data ? String(data.Name) : String(info.productId)}
      description={<>
        <Tag style={{ display: 'inline-flex', marginRight: 8 }}>{String(protocolNameMap[info.protocol] || info.protocol)}</Tag>
        <Tag style={{ display: 'inline-flex', marginRight: 8 }}>{String(info.productId)}</Tag>
        <Tag style={{ display: 'inline-flex', marginRight: 8 }}>{String(info.uuid)}</Tag>
      </>}
      image={
        data?.IconUrl
          ? <img src={data.IconUrl} width={56} height={56} />
          : <img src="https://main.qcloudimg.com/raw/05ca75c84bb7c1e2dbc9d762cf3af1f1.png" width={56} height={56} />
      }
      arrow
      onClick={() => onStartBind()}
    />
  );
}

export function AddSubDevice() {
  const [reported, setReported] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [bindStatus, setBindStatus] = useState({
    type: 'binding',
    msg: '',
    info: null as any,
    cancel: () => { },
  });
  const [searchResult, setSearchResult] = useState<SearchResultInfo[]>([]);

  const handleScanReport = (scanReport: ProtocolScanReport[]) => {
    const result: SearchResultInfo[] = [];
    scanReport.forEach((protocolScanReport) => {
      protocolScanReport.uuids
        .split(';')
        .filter(item => item.length > 0)
        .forEach((uuid) => {
          result.push({
            productId: protocolScanReport.product_id,
            protocol: protocolScanReport.protocol,
            uuid,
          });
        });
    });

    setReported(true);
    setSearchResult(result);
  };

  useEffect(() => {
    const handlePropertyReport = ({ deviceId, deviceData }: {
      deviceId: string;
      deviceData: Record<string, { Value: any; LastUpdate: number; }>;
    }) => {
      if (deviceId !== h5PanelSdk.deviceId) return;
      if (!('_sys_gw_scan_report' in deviceData)) return;

      const reportJson = deviceData._sys_gw_scan_report.Value;
      let reportData: any;

      try {
        if (typeof reportJson !== 'string') {
          throw { msg: '_sys_gw_scan_report 不是字符串' };
        }

        reportData = JSON.parse(reportJson);

        if (!Array.isArray(reportData)) {
          throw { msg: '_sys_gw_scan_report 不是数组 JSON' };
        }

        handleScanReport(reportData);
      } catch (error) {
        console.error('解析 _sys_gw_scan_report 上报失败', error, reportJson);
      }
    };

    h5PanelSdk.on('wsReport', handlePropertyReport);

    return () => {
      h5PanelSdk.off('wsReport', handlePropertyReport);
    };
  }, []);

  const startSearch = () => {
    h5PanelSdk.callDeviceAction({
      scan: 1,
      scan_timeout: 300,
    }, '_sys_gw_scan_subdev')
      .then(() => {
        // @ts-ignore
        Message.info({
          content: '已开始搜索',
        });
      })
      .catch((err) => {
        // @ts-ignore
        Message.error({
          content: `调用开始搜索失败：${getErrorMsg(err)}`,
        });
      });
  };

  const stopSearch = () => {
    h5PanelSdk.callDeviceAction({
      scan: 0,
      scan_timeout: 0,
    }, '_sys_gw_scan_subdev')
      .then(() => {
        // @ts-ignore
        Message.info({
          content: '已停止搜索',
        });
      })
      .catch((err) => {
        // @ts-ignore
        Message.error({
          content: `调用停止搜索失败：${getErrorMsg(err)}`,
        });
      });
  };

  const startBind = async (info: SearchResultInfo) => {
    let isCancelled = false;
    let removeListener: () => void = () => {
      // noop
    };

    const cancel = () => {
      isCancelled = true;
      removeListener();
    };

    setPopupVisible(true);
    setBindStatus({
      type: 'binding',
      msg: '正在请求网关开始绑定',
      info,
      cancel,
    });

    try {
      await h5PanelSdk.callDeviceAction({
        protocol: info.protocol,
        product_id: info.productId,
        uuids: info.uuid,
      }, '_sys_gw_join_subdev');
    } catch (error) {
      if (isCancelled) return;
      setBindStatus({
        type: 'fail',
        msg: `请求网关开始绑定失败 ${getErrorMsg(error)}`,
        info,
        cancel,
      });

      return;
    }

    if (isCancelled) return;
    setBindStatus({
      type: 'binding',
      msg: '等待绑定结果…',
      info,
      cancel,
    });

    try {
      const resultSubDeviceId = await Promise.race([
        // 监听设备上报事件
        new Promise((resolve, reject) => {
          const listener = ({ deviceId, Payload }: { deviceId: string; Payload: any }) => {
            if (deviceId !== h5PanelSdk.deviceId) return;
            if (Payload.eventId !== '_sys_gw_bind_result') return;
            if (Payload.params.product_id === info.productId
              && Payload.params.protocol === info.protocol
              && Payload.params.uuid === info.uuid) {
              const resultCode = Payload.params.code;
              if (resultCode === 0) {
                resolve(Payload.params.device_name);
              } else {
                reject({ code: 'GATEWAY_REPLY_BIND_FAIL', msg: `网关回复绑定子设备失败，错误码=${resultCode} ` });
              }
              removeListener();
            }
          };

          h5PanelSdk.on('wsEventReport', listener);

          removeListener = () => {
            h5PanelSdk.off('wsEventReport', listener);
          };
        }),

        // 超时
        new Promise((_resolve, reject) => {
          setTimeout(() => {
            reject({ code: 'WAIT_GATEWAY_BIND_RESULT_TIMEOUT', msg: '等待网关回复绑定结果超时' });
          }, 30000);
        }),
      ]);

      if (isCancelled) return;
      setBindStatus({
        type: 'success',
        msg: `设备 ID: ${info.productId}/${resultSubDeviceId}`,
        info,
        cancel,
      });
    } catch (error) {
      if (isCancelled) return;
      setBindStatus({
        type: 'fail',
        msg: getErrorMsg(error),
        info,
        cancel,
      });
    } finally {
      removeListener?.();
    }
  };

  const renderBinding = () => (
    <div style={{ height: 260, background: '#fff', padding: '40px 24px 40px', textAlign: 'center' }}>
      <div style={{ fontSize: 24, marginBottom: 12 }}>绑定中…</div>
      <div style={{ color: '#999', marginBottom: 12, fontSize: 14 }}>协议：{protocolNameMap[bindStatus.info?.protocol] || bindStatus.info?.protocol}</div>
      <div style={{ color: '#999', marginBottom: 12, fontSize: 14 }}>产品ID：{bindStatus.info?.productId}</div>
      <div style={{ color: '#999', marginBottom: 24, fontSize: 14 }}>UUID：{bindStatus.info?.uuid}</div>
      <div style={{ marginBottom: 24 }}>{bindStatus.msg}</div>
      <div>
        <Button size="large" theme="primary" shape="rectangle" variant="outline" block onClick={() => {
          bindStatus.cancel();
          setPopupVisible(false);
        }}>
          取消
        </Button>
      </div>
    </div>
  );

  const renderBindSuccess = () => (
    <div style={{ height: 260, background: '#fff', padding: '40px 24px 40px', textAlign: 'center' }}>
      <div style={{ fontSize: 24, marginBottom: 12 }}>绑定成功</div>
      <div style={{ color: '#999', marginBottom: 12, fontSize: 14 }}>协议：{protocolNameMap[bindStatus.info?.protocol] || bindStatus.info?.protocol}</div>
      <div style={{ color: '#999', marginBottom: 12, fontSize: 14 }}>产品ID：{bindStatus.info?.productId}</div>
      <div style={{ color: '#999', marginBottom: 24, fontSize: 14 }}>UUID：{bindStatus.info?.uuid}</div>
      <div style={{ marginBottom: 24 }}>{bindStatus.msg}</div>
      <div>
        <Button size="large" theme="primary" shape="rectangle" variant="outline" block onClick={() => {
          setPopupVisible(false);
        }}>
          返回
        </Button>
      </div>
    </div>
  );

  const renderBindFail = () => (
    <div style={{ height: 260, background: '#fff', padding: '40px 24px 40px', textAlign: 'center' }}>
      <div style={{ fontSize: 24, marginBottom: 12 }}>绑定失败</div>
      <div style={{ color: '#999', marginBottom: 12, fontSize: 14 }}>协议：{protocolNameMap[bindStatus.info?.protocol] || bindStatus.info?.protocol}</div>
      <div style={{ color: '#999', marginBottom: 12, fontSize: 14 }}>产品ID：{bindStatus.info?.productId}</div>
      <div style={{ color: '#999', marginBottom: 24, fontSize: 14 }}>UUID：{bindStatus.info?.uuid}</div>
      <div style={{ marginBottom: 24 }}>{bindStatus.msg}</div>
      <div>
        <Button size="large" theme="primary" shape="rectangle" variant="outline" block onClick={() => {
          setPopupVisible(false);
        }}>
          返回
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ width: '50%', padding: 16 }}>
          <Button size="large" theme="primary" shape="rectangle" variant="outline" block onClick={stopSearch}>
            停止搜索
          </Button>
        </div>
        <div style={{ width: '50%', padding: 16 }}>
          <Button size="large" shape="rectangle" theme="primary" block onClick={startSearch}>
            开始搜索
          </Button>
        </div>
      </div>

      <Divider align="center" content="搜索结果" style={{
        margin: '16px',
      }}></Divider>

      <CellGroup>
        {searchResult.length === 0 && (
          <Cell title={reported ? '搜索结果为空' : '请点击开始搜索'} />
        )}
        {searchResult.map(info => (
          <SearchResult
            info={info}
            key={`${info.protocol}|${info.productId}|${info.uuid}`}
            onStartBind={() => {
              startBind(info);
            }}
          />
        ))}
      </CellGroup>

      <Popup visible={popupVisible} placement="bottom">
        <div>
          {bindStatus.type === 'binding' && renderBinding()}
          {bindStatus.type === 'success' && renderBindSuccess()}
          {bindStatus.type === 'fail' && renderBindFail()}
        </div>
      </Popup>
    </>
  );
}
