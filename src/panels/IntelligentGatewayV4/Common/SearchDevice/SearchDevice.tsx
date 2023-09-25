import React, { createContext, CSSProperties, Fragment, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Checkbox, DotLoading, Ellipsis, Toast } from 'antd-mobile';
import { useInterval, useLatest, useRequest } from 'ahooks';
import { Circle } from '@src/panels/IntelligentGatewayV4/Common/SearchDevice/Circle';
import { delay, noop } from '@utillib';
import useSWR from 'swr';
import classNames from 'classnames';

function base64toHEX(base64) {
  const raw = atob(base64);
  let HEX = '';
  for (let i = 0; i < raw.length; i++) {
    const _hex = raw.charCodeAt(i).toString(16);
    HEX += (_hex.length == 2 ? _hex : `0${_hex}`);
  }
  return HEX.toUpperCase();
}

const getDeviceNameByUUID = (uuid) => {
  const hex = base64toHEX(uuid);
  return hex.slice(-6);
};

interface IScanReport {
  protocol: number;
  product_id: string;
  uuids: string;
}

interface IScanSubDevice {
  protocol: number;
  productId: string;
  deviceName: string;
  uuid: string;
  checked: boolean;
}

const SCAN_TIMEOUT = 60;
const BIND_TIMEOUT = 60;

const enum BindStatus {
  WaitScan = 'WaitScan',
  Scanning = 'Scanning',
  ScanTimeout = 'ScanTimeout',
  Binding = 'Binding',
  BindEnd = 'BindEnd',
}

const SubDeviceConfContext = createContext<{
  scanSubDeviceList: IScanSubDevice[];
  bindStatus: BindStatus;
  cloudRecentBindSubDeviceList: any[];
}>({
  scanSubDeviceList: [],
  cloudRecentBindSubDeviceList: [],
  bindStatus: BindStatus.WaitScan,
});

export function SearchDevice(props) {
  const {
    sdk,
    history: { goBack },
  } = props;

  const [bindStatus, setBindStatus] = useState(BindStatus.WaitScan);
  const latestBindStatus = useLatest(bindStatus);
  const [countdown, setCountdown] = useState(SCAN_TIMEOUT);
  const [countdownInterval, setCountdownInterval] = useState<undefined | number>();
  const [scanSubDeviceList, setScanSubDeviceList] = useState<IScanSubDevice[]>([]);
  const latestScanSubDeviceListRef = useLatest(scanSubDeviceList);

  const totalBindCount = useMemo(() => scanSubDeviceList.filter(item => item.checked).length, [scanSubDeviceList]);
  const scanSubProductIds = useMemo(() => {
    const productIds: string[] = [];
    scanSubDeviceList.forEach((item) => {
      if (!productIds.includes(item.productId) && item.checked) {
        productIds.push(item.productId);
      }
    });
    return productIds;
  }, [scanSubDeviceList]);

  const prevCloudBindCount = useRef(0);

  // 可能绑定时间超过五分钟，需要缓存一下云端查询子设备绑定结果
  const cloudRecentBindSubDeviceCache = useRef<any[]>([]);

  const getCloudRecentBindSubDeviceList = async () => {
    let result: any[] = [];

    try {
      const data = await Promise.all(scanSubProductIds.map(productId => sdk.requestTokenApi('AppGetBindSubDeviceList', {
        GatewayProductId: sdk.productId,
        GatewayDeviceName: sdk.deviceName,
        ProductId: productId, // 子设备产品ID
        // TODO:一次绑定超过100个会查询有问题
        Limit: 100, // 取值 10-255
        Offset: 0,
      })));
      data.forEach((respItem) => {
        // console.log('respItem=', respItem);
        result.push(...(respItem.Devices || []));
      });
      // 过滤出扫描到的
      // eslint-disable-next-line max-len
      result = result.filter(cloudDevice => scanSubDeviceList.find(scanDevice => scanDevice.deviceName === cloudDevice.DeviceName && scanDevice.productId === cloudDevice.ProductId));
      // 过滤出新增的，合并结果
      // eslint-disable-next-line max-len
      const newBindList = result.filter(cloudDevice => !cloudRecentBindSubDeviceCache.current.find(cacheDevice => cacheDevice.ProductId === cloudDevice.ProductId && cacheDevice.DeviceName === cloudDevice.DeviceName));

      cloudRecentBindSubDeviceCache.current.push(...newBindList);

      result = cloudRecentBindSubDeviceCache.current;
      console.log('[云端查询最近子设备绑定]', result);
    } catch (err) {
      console.error('[云端查询最近子设备绑定]', err);
    }
    return result;
  };

  const {
    data: cloudRecentBindSubDeviceList = [],
    run: runQueryCloudRecentBind,
    cancel: cancelQueryCloudRecentBind,
  } = useRequest(getCloudRecentBindSubDeviceList, {
    pollingInterval: 2000,
    manual: true,
  });

  // 每成功一个-30s
  useEffect(() => {
    const prevBindCount = prevCloudBindCount.current;
    const latestBindCount = cloudRecentBindSubDeviceList.length;
    if (latestBindCount > prevBindCount) {
      const nextCountdown = (totalBindCount - latestBindCount) * BIND_TIMEOUT;
      setCountdown(nextCountdown >= 0 ? nextCountdown : 0);
    }
    prevCloudBindCount.current = latestBindCount;
  }, [cloudRecentBindSubDeviceList.length]);

  const clearSubDeviceConf = async () => {
    console.log('clear-停止子设备配网', latestBindStatus.current);
    setCountdownInterval(undefined);
    if (latestBindStatus.current === BindStatus.Binding) {
      await stopBind();
    }
    if (latestBindStatus.current === BindStatus.Scanning) {
      await stopScan();
    }
  };

  useEffect(() => {
    handleStartScanSubDevice();
    return () => {
      clearSubDeviceConf();
    };
  }, []);

  // 开启/关闭UI倒计时
  const startCountdownInterval = (s) => {
    setCountdown(s);
    setCountdownInterval(1000);
  };

  // 倒计时结束的回调
  const onCountdownEnd = async () => {
    switch (bindStatus) {
      case BindStatus.Scanning: {
        setBindStatus(BindStatus.ScanTimeout);
        await stopScan();
        break;
      }
      case BindStatus.Binding:
        setBindStatus(BindStatus.BindEnd);
        await stopBind();
        break;
      default:
        Toast.show({ content: '未处理的倒计时结束回调' });
    }
  };

  useInterval(() => {
    if (countdown > 0) {
      setCountdown(countdown - 1);
    } else {
      onCountdownEnd();
      setCountdown(0);
      setCountdownInterval(undefined);
    }
  }, countdownInterval);

  // 开启搜索
  const startScan = async ({ beforeHandler = noop } = {}) => {
    try {
      const toast = Toast.show({
        content: '开启搜索中...',
        icon: 'loading',
        duration: 0,
        maskClickable: false,
      });
      await beforeHandler();
      await sdk.callDeviceAction({ scan: 1, scan_timeout: SCAN_TIMEOUT }, '_sys_gw_scan_subdev');
      // 开启监听物模型上报
      sdk.on('wsReport', handleScanSubDeviceReport);
      toast.close();
    } catch (err) {
      console.error('[开启搜索错误]', err);
      Toast.show({ content: '开启搜索失败', icon: 'fail' });
      throw err;
    }
  };

  // 停止搜索
  const stopScan = async () => {
    try {
      const toast = Toast.show({
        content: '停止搜索中...',
        icon: 'loading',
        duration: 0,
        maskClickable: false,
      });
      sdk.off('wsReport', handleScanSubDeviceReport);
      setCountdownInterval(undefined);
      await delay(1000);
      await sdk.callDeviceAction({ scan: 0, scan_timeout: SCAN_TIMEOUT }, '_sys_gw_scan_subdev');
      toast.close();
    } catch (err) {
      console.error('[停止搜索错误]', err);
      Toast.show({ content: '停止搜索失败', icon: 'fail' });
      throw err;
    }
  };

  // 开始绑定 join
  const startBind = async (params) => {
    try {
      const toast = Toast.show({
        content: '开始绑定中...',
        icon: 'loading',
        duration: 0,
        maskClickable: false,
      });
      await sdk.callDeviceAction(params, '_sys_gw_join_subdev');
      runQueryCloudRecentBind();
      toast.close();
    } catch (err) {
      console.error('[开始绑定错误]', err);
      Toast.show({ content: '开启绑定失败', icon: 'fail' });
      throw err;
    }
  };

  // 停止绑定
  const stopBind = async () => {
    try {
      const toast = Toast.show({
        content: '停止绑定中...',
        icon: 'loading',
        duration: 0,
        maskClickable: false,
      });
      setCountdownInterval(undefined);
      await sdk.callDeviceAction({ subdev_join: 0 }, '_sys_gw_stop_join_subdev');
      cancelQueryCloudRecentBind();
      toast.close();
    } catch (err) {
      console.error('[停止绑定错误]', err);
      Toast.show({ content: '停止绑定失败', icon: 'fail' });
      throw err;
    }
  };

  // TODO:clear函数 switch-case 不同情况处理

  // 处理开始扫描
  const handleStartScanSubDevice = async () => {
    // 开启扫描
    await startScan({
      beforeHandler: async () => {
        // 总先停止扫描
        await sdk.callDeviceAction({ scan: 0, scan_timeout: SCAN_TIMEOUT }, '_sys_gw_scan_subdev');
        await delay(1000);
      },
    });
    setBindStatus(BindStatus.Scanning);
    // 开启倒计时
    startCountdownInterval(SCAN_TIMEOUT);
  };

  // 处理子设备搜索结果 _sys_gw_scan_report
  const handleScanSubDeviceReport = (resp) => {
    if (!resp?.deviceData?._sys_gw_scan_report) return;
    console.log('[物模型_sys_gw_scan_report变化]', resp.deviceData._sys_gw_scan_report);
    let scanReport: IScanReport[] = [];
    try {
      scanReport = JSON.parse(resp.deviceData._sys_gw_scan_report.Value);
      if (!Array.isArray(scanReport)) {
        return;
      }
    } catch (err) {
      return;
    }
    console.info('[网关扫描子设备上报]', scanReport);
    const newSubDeviceList: IScanSubDevice[] = [];
    const curSubDeviceList = latestScanSubDeviceListRef.current;
    scanReport.forEach((item) => {
      const { product_id, uuids, protocol } = item;
      uuids.split(';').filter(uuid => !!uuid)
        .forEach(async (uuid) => {
          // 去重
          const isExist = curSubDeviceList.find(subDevice => subDevice.uuid === uuid);
          if (isExist) return;
          newSubDeviceList.push({
            protocol,
            uuid,
            productId: product_id,
            deviceName: getDeviceNameByUUID(uuid),
            checked: true,
          });
        });
    });
    setScanSubDeviceList([
      ...curSubDeviceList,
      ...newSubDeviceList,
    ]);
  };

  const handleStartBindSubDevice = async () => {
    try {
      const needBindSubDeviceList = scanSubDeviceList.filter(item => item.checked);

      if (!needBindSubDeviceList.length) {
        Toast.show({ content: '未选择子设备' });
        return;
      }

      const productJoinParamsMap = new Map();
      needBindSubDeviceList.forEach((item) => {
        const { protocol, productId, uuid } = item;
        if (!productJoinParamsMap.has(productId)) {
          productJoinParamsMap.set(productId, { protocol, product_id: productId, uuids: '' });
        }
        const params = productJoinParamsMap.get(productId);
        productJoinParamsMap.set(productId, { protocol, product_id: productId, uuids: `${params.uuids}${uuid};` });
      });

      // 搜索时点击绑定，先关闭搜索。
      if (countdownInterval) {
        await stopScan();
      }

      // 绑定loading
      const bindLoading = Toast.show({
        content: '绑定中...',
        icon: 'loading',
        duration: 0,
        maskClickable: false,
      });
      for (const [, params] of productJoinParamsMap) {
        await startBind(params);
      }
      setBindStatus(BindStatus.Binding);
      startCountdownInterval(needBindSubDeviceList.length * BIND_TIMEOUT);

      bindLoading.close();
    } catch (err) {
      console.error(err);
      Toast.show({ content: '开始绑定失败', icon: 'fail' });
    }
  };

  const toggleSubDeviceCheck = (_, index: number) => {
    if (
      [
        BindStatus.Scanning,
        BindStatus.ScanTimeout,
      ].includes(bindStatus)
    ) {
      scanSubDeviceList[index].checked = !scanSubDeviceList[index].checked;
      setScanSubDeviceList([...scanSubDeviceList]);
    }
  };

  const renderView = () => {
    switch (bindStatus) {
      case BindStatus.WaitScan:
        return (
          <SubDeviceConfView
            showCircleScan={true}
            circleScanProps={{
              isActive: false,
              msg: '未开启搜索',
            }}
            showBottomBtn={true}
            bottomBtnText={'开启搜索'}
            onClickBottomBtn={handleStartScanSubDevice}
          />
        );
      case BindStatus.Scanning: {
        return (
          <>
            {scanSubDeviceList.length ? (
              <SubDeviceConfView
                showStatusDesc={true}
                showSubDeviceListView={true}
                subDeviceListViewProps={{
                  onClickSubDeviceItem: toggleSubDeviceCheck,
                }}
                showBottomBtn={true}
                renderBindStatusDesc={() => (
                  <>
                    <strong>
                      正在搜索附近设备（{countdown}s）
                      <DotLoading />
                    </strong>
                    <div>请确保子设备处于配网状态</div>
                  </>
                )}
                bottomBtnText={'一键绑定'}
                onClickBottomBtn={handleStartBindSubDevice}
              />
            ) : (
              <SubDeviceConfView
                showCircleScan={true}
                circleScanProps={{
                  isActive: true,
                  msg: `搜索中（${countdown}s）`,
                  message: ['正在搜索附近设备', '请确保子设备处于配网状态'],
                }}
              />
            )}
          </>
        );
      }
      case BindStatus.ScanTimeout:
        return (
          <>
            {scanSubDeviceList.length ? (
              <SubDeviceConfView
                showStatusDesc={true}
                renderBindStatusDesc={() => (
                  <>
                    <strong>搜索设备完成</strong>
                    <div>请选择子设备进行配网绑定</div>
                  </>
                )}
                subDeviceListViewProps={{
                  onClickSubDeviceItem: toggleSubDeviceCheck,
                }}
                showSubDeviceListView={true}
                showBottomBtn={true}
                bottomBtnText={'一键绑定'}
                onClickBottomBtn={handleStartBindSubDevice}
              />
            ) : (
              <SubDeviceConfView
                showCircleScan={true}
                showBottomBtn={true}
                circleScanProps={{
                  isActive: false,
                  msg: '未开启搜索',
                  message: ['搜索设备超时，未发现任何设备', '确保子设备处于配网状态'],
                }}
                bottomBtnText={'重新开启搜索'}
                onClickBottomBtn={handleStartScanSubDevice}
              />
            )}
          </>
        );
      case BindStatus.Binding: {
        const successCount = cloudRecentBindSubDeviceList.length;
        return (
          <SubDeviceConfView
            showStatusDesc={true}
            showBottomBtn={true}
            showSubDeviceListView={true}
            renderBindStatusDesc={() => (
              <>
                <strong>
                  子设备配网绑定中（{countdown}s）
                  <DotLoading />
                </strong>
                <div>请确保子设备处于配网状态</div>
                <div>成功绑定到云端（{successCount}/{totalBindCount}）个</div>
              </>
            )}
            subDeviceListViewProps={{
              hiddenDeviceIfNotCheck: true,
              hiddenCheckBox: true,
              showBindStatus: true,
            }}
            bottomBtnText={'停止绑定'}
            onClickBottomBtn={async () => {
              await stopBind();
              setBindStatus(BindStatus.BindEnd);
            }}
          />
        );
      }
      case BindStatus.BindEnd: {
        const totalCount = scanSubDeviceList.filter(item => item.checked).length;
        const successCount = cloudRecentBindSubDeviceList.length;
        return (
          <SubDeviceConfView
            showStatusDesc={true}
            showSubDeviceListView={true}
            subDeviceListViewProps={{
              hiddenDeviceIfNotCheck: true,
              hiddenCheckBox: true,
              showBindStatus: true,
            }}
            showBottomBtn={true}
            renderBindStatusDesc={() => (
              <>
                <strong>绑定子设备结束，成功{successCount}个，失败{totalCount - successCount}个</strong>
              </>
            )}
            bottomBtnText={'完成'}
            onClickBottomBtn={() => goBack()}
          />
        );
      }
      default:
        return '未知状态view，请反馈工程师';
    }
  };

  return (
    <SubDeviceConfContext.Provider value={{
      scanSubDeviceList,
      cloudRecentBindSubDeviceList,
      bindStatus,
    }}>
      {renderView()}
    </SubDeviceConfContext.Provider>
  );
}


const SubDeviceConfView = ({
  renderBindStatusDesc,
  showCircleScan = false,
  circleScanProps = {},
  subDeviceListViewProps = {},
  showStatusDesc = false,
  showSubDeviceListView = false,
  showBottomBtn = false,
  bottomBtnText = '底部按钮',
  onClickBottomBtn = noop,
}: Partial<{
  bindStatus: BindStatus;
  showCircleScan: boolean;
  circleScanProps: any;
  subDeviceListViewProps: Partial<SubDeviceListViewProps>
  showStatusDesc: boolean;
  showSubDeviceListView: boolean;
  showBottomBtn: boolean;
  renderBindStatusDesc: () => React.ReactNode;
  bottomBtnText: string;
  onClickBottomBtn: () => void;
// eslint-disable-next-line arrow-body-style
}>) => {
  return (
    <div className='search-device'>
      {showStatusDesc && <div className='scan-msg'>{renderBindStatusDesc?.()}</div>}
      {showCircleScan && (
        <div className='start-content'>
          <Circle {...circleScanProps} />
        </div>
      )}
      {showSubDeviceListView && <SubDeviceListView {...subDeviceListViewProps} />}
      {showBottomBtn && (
        <div className='fexid-btn center' onClick={onClickBottomBtn}>
          {bottomBtnText}
        </div>
      )}
    </div>
  );
};

interface SubDeviceListViewProps {
  deviceList: IScanSubDevice[];
  hiddenDeviceIfNotCheck: boolean;
  hiddenCheckBox: boolean;
  showBindStatus: boolean;
  style: CSSProperties;
  onClickSubDeviceItem: (...args: any) => void;
}

const SubDeviceListView = ({
  hiddenDeviceIfNotCheck = false,
  hiddenCheckBox = false,
  showBindStatus = false,
  style = {},
  onClickSubDeviceItem = noop,
}: Partial<SubDeviceListViewProps>) => {
  const { scanSubDeviceList, bindStatus, cloudRecentBindSubDeviceList } = useContext(SubDeviceConfContext);

  const SubDeviceItem = ({
    subDevice,
    onClick = noop,
  }) => {
    const { data: productInfo = {} } = useSWR(
      [subDevice.productId, 'AppGetProducts', 'AppGetProductsConfig'],
      async () => {
        const data = await window.h5PanelSdk.getProductInfo({
          productId: subDevice.productId,
        });
        const { Data } = await window.h5PanelSdk.requestTokenApi('AppGetProductsConfig', {
          ProductIds: [subDevice.productId],
        });
        let ProductConfig = {};
        try {
          ProductConfig = JSON.parse(Data[0].Config);
        } catch (err) {
          /* noop */
        }
        return { ...data[0], ProductConfig };
      },
      {
        revalidateIfStale: false,
        keepPreviousData: true,
      },
    );
    // eslint-disable-next-line max-len
    const isBindCloud = cloudRecentBindSubDeviceList.find(item => item.ProductId === subDevice.productId && item.DeviceName === subDevice.deviceName);
    const isSuccess = isBindCloud;
    const isLoading = !isBindCloud && bindStatus === BindStatus.Binding;
    const isFail = !isBindCloud && bindStatus === BindStatus.BindEnd;
    return (
      <div className='sub-device-list-item' onClick={onClick}>
        {!hiddenCheckBox && (
          <Checkbox
            style={{ '--icon-size': '16px' }}
            className='sub-device-list-item__checkbox'
            checked={subDevice.checked}
          />
        )}
        <img className='sub-device-list-item__icon' src={productInfo.IconUrl} />
        <Ellipsis
          className='sub-device-list-item__productName'
          rows={2}
          direction={'end'}
          content={productInfo.ProductConfig?.Global?.ProductDisplayName || productInfo.Name || '-'}
        />
        <div className='sub-device-list-item__deviceName'>{subDevice.deviceName || '-'}</div>
        {showBindStatus && (
          <div
            className={classNames('sub-device-list-item__bindStatus', {
              loading: isLoading,
              success: isSuccess,
              fail: isFail,
            })}
          >
            {isLoading && '绑定中...'}
            {isSuccess && '绑定成功'}
            {isFail && '绑定失败'}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className='sub-device-list' style={style}>
      {scanSubDeviceList.map((item, index) => (
        <Fragment key={item.uuid + item.productId}>
          {hiddenDeviceIfNotCheck && !item.checked ? null : (
            <SubDeviceItem subDevice={item} onClick={() => onClickSubDeviceItem(item, index)} />
          )}
        </Fragment>
      ))}
    </div>
  );
};
