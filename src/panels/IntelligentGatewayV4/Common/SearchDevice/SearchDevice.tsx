import React, { useEffect, useRef, useState } from 'react';
import { getErrorMsg } from './utils';
import { Circle } from './Circle';
import { Production } from './Production';
import { BindProduction } from './BindProduction';
import { Spin } from '@custom/Spin';


function base64toHEX(base64) {
  const raw = atob(base64);
  let HEX = '';
  for (let i = 0; i < raw.length; i++) {
    const _hex = raw.charCodeAt(i).toString(16);
    HEX += (_hex.length == 2 ? _hex : `0${_hex}`);
  }
  return HEX.toUpperCase();
}

// 转换64截取最后6位

const tansSplit = (uuid) => {
  const hex = base64toHEX(uuid);
  return hex.slice(hex.length - 6, hex.length);
};
/**
 *  添加子设备
 */

const IS_TEST = false;

interface SearchResultInfo {
  productId: string;
  uuid: string;
  protocol: number;
  device_name: string;
}

interface ProtocolScanReport {
  protocol: number;
  product_id: string;
  uuids: string;
}

/**
 *
 * 设备收索
 *
 */
const defaultScanResult = [];

export function SearchDevice(props) {
  const { sdk, deviceData, history: { query, goBack }, log } = props;

  const scan_time = 60; // 扫描时间
  const BIND_TIMEOUT = 20000; // 绑定超时时间
  // 0 标识未开始 1标识开始 -1标识超时 3 表示已经收到数据 -2 表示其他错误  10 表示绑定设备界面 11 重新添加
  const STATUS = {
    UNSCAN: 0,
    STARTSCAN: 1,
    SUCCESS: 3,
    TIMEOUT: -1,
    ERROR: -2,
    OVER: 4, // 搜索完毕
    BINDBEGIN: 10, // 开始绑定
    BINDBERROR: 11, // 绑定失败
    BINDSUCCESS: 12, // 绑定成功
    BINDOVER: 13, // 全部绑定结束
  };

  // 每个状态对应的标题
  const TITLE = {
    0: '搜索设备',
    1: '搜索设备',
    3: '搜索设备',
    '-1': '搜索设备',
    '-2': '搜索设备',
    10: '添加设备',
    11: '添加设备',
    12: '成功添加',
  };

  // 不能使用useState 因为有延迟
  const [status, _setStatus] = useState(STATUS.UNSCAN);

  // status 变为同步
  const statusRef = useRef(status);
  const setStatus = (v) => {
    console.log('状态status', v);
    statusRef.current = v;
    _setStatus(v);
  };

  const [errorMsg, setErrorMsg] = useState(['正在搜索附近设备', '请确保设备处于配网状态']); // 错误信息
  const [bindErrorMsg, setBindErrorMsg] = useState(''); // 错误信息

  const [isLisenceScan, _setLisenceScan] = useState(false);
  const setLisenceScan = (stat) => {
    if (!stat) log.mi('停止监听设备上报数据接受-------------------', stat);
    _setLisenceScan(stat);
  };
  // 扫描的数据
  const [searchResult, setSearchResult] = useState<SearchResultInfo[]>(defaultScanResult);
  // 需要绑定的数据
  const [bindData, _setBindData] = useState(defaultScanResult);

  const clone = v => JSON.parse(JSON.stringify(v));
  // 兼容直接设置后不能渠道值
  const setBindData = (data) => {
    window._bindData = clone(data);
    _setBindData(clone(data));
  };

  const MESSAGE = {
    0: ['未发现设备', '请确保设备处于待配网状态并在附近'],
    1: ['正在搜索附近设备', '请确保设备处于配网状态'],
    3: ['正在搜索附近设备', '请确保设备处于配网状态'],
    4: ['本次搜索结束', '您可以添加当前子设备'],
    '-1': ['未发现设备', '请确保设备处于待配网状态并在附近'],
  };
  const MSG = {
    0: '请开始搜索',
    1: '搜索中',
    '-1': '搜索超时',
  };

  // 设置绑定成功的状态
  const setSuccess = (deviceName, isSuccess) => {
    const newBindData = (window._bindData || []).map((item) => {
      if (item.device_name === deviceName) {
        return { ...item, success: isSuccess };
      }
      return item;
    });
    log.mi('设置绑定结果:', deviceName, isSuccess, newBindData);
    setBindData(newBindData);
  };


  // 处理扫描上报的数据
  const handleScanReport = (scanReport: ProtocolScanReport[]) => {
    let result: SearchResultInfo[] = [];
    scanReport.forEach((protocolScanReport) => {
      protocolScanReport.uuids
        .split(';')
        .filter(item => item.length > 0)
        .forEach((uuid) => {
          result.push({
            productId: protocolScanReport.product_id,
            protocol: protocolScanReport.protocol,
            uuid,
            device_name: tansSplit(uuid),
            // name:"",
          });
        });
    });

    // 按照uuid去重 追加数据
    const existUUID = {};

    if (!result.length) { // 上报空数据 不处理状态和数据
      log.mw('上报的数据为空');
      return;
    }
    result = searchResult.concat(result).filter(({ uuid }) => {
      const res = !existUUID[uuid];
      existUUID[uuid] = uuid;
      return res;
    });
    setSearchResult(result);
    setStatus(STATUS.SUCCESS);
  };


  // 监听处理上报的设备
  const dealScanReport = (scanResponse) => {
    console.log('监听上报扫描数据:', scanResponse);
    if (typeof scanResponse !== 'string') {
      setStatus(STATUS.ERROR);
      setErrorMsg(['_sys_gw_scan_report', '不是字符串']);
      return;
    }
    const scanData = JSON.parse(scanResponse);
    if (!Array.isArray(scanData)) {
      setStatus(STATUS.ERROR);
      setErrorMsg(['_sys_gw_scan_report', '不是数组 JSON']);
      return;
    }
    // 处理监听的设备
    handleScanReport(scanData);
  };

  /**
   * 开始扫描
   */
  const startSearch = async () => {
    log.mi('开始扫描----------------------------------');
    setStatus(STATUS.STARTSCAN);
    // 停止扫描
    await stopSearch();
    // 开启扫描
    sdk.callDeviceAction({ scan: 1, scan_timeout: scan_time }, '_sys_gw_scan_subdev')
      .then(() => {
        // 外层开始监听数据
        // 超时处理
        setLisenceScan(true); // 停止接受数据
        setTimeout(() => {
          setLisenceScan(false); // 停止接受数据
          stopSearch();
          if (statusRef.current == STATUS.STARTSCAN) { // 还在在搜索 数据未回来
            setStatus(STATUS.TIMEOUT); // 超时处理
          } else {
            if (statusRef.current <= STATUS.SUCCESS) { // 扫描成功时 才有结束的状态
              setStatus(STATUS.OVER); // 扫描完毕
            }
          }
        }, scan_time * 1000);
      })
      .catch((err) => {
        console.error(err);
        setErrorMsg([getErrorMsg(err)]);
        setStatus(STATUS.ERROR);
      });
  };

  // 停扫描
  const stopSearch = () => new Promise((resolve, reject) => {
    log.mi('停止上一次服务端扫描');
    sdk.callDeviceAction({
      scan: 0,
      scan_timeout: 0,
    }, '_sys_gw_scan_subdev')
      .then(() => {
        log.mi('停止扫描>>>>>成功停止');
        resolve('');
      })
      .catch((err) => {
        log.me('停止扫描>>>>>:调用停止搜索失败：', getErrorMsg(err));
        reject(getErrorMsg(err));
      });
  });


  // 是否开始扫描
  const start = statusRef.current == STATUS.STARTSCAN;

  // 绑定子设备
  const onStartBind = (scan, product) => {
    console.log('开始单个绑定设备', scan);
    setBindData([scan]);
    setStatus(STATUS.BINDBEGIN);
    startBinds([scan]);
  };

  // 绑定全部设备
  const onStartBindAll = (scans) => {
    console.log('绑定全部设备', scans);
    setBindData(scans);
    setStatus(STATUS.BINDBEGIN);
    startBinds(scans);
  };

  // 重新绑定
  const recoverBind = () => {
    setStatus(STATUS.SUCCESS);
  };

  // 等待绑定结果
  const waitBind = info => new Promise((__resolve, __reject) => {
    let removeListener: () => void = () => {
      // noop
    };
    Promise.race([
      // 监听设备上报事件
      new Promise((resolve, reject) => {
        const listener = ({ deviceId, Payload }: { deviceId: string; Payload: any }) => {
          if (deviceId !== sdk.deviceId) return;
          log.mi('监听到绑定上报数据:', Payload, info);
          if (Payload.eventId !== '_sys_gw_bind_result') return;
          if (Payload.params.product_id === info.productId
            && Payload.params.protocol === info.protocol
            && (Payload.params.uuid || '').split(';')[0] === info.uuid) {
            const resultCode = Payload.params.code;
            if (resultCode === 0) {
              // 设置指定设备未成功状态
              const device_name = Payload?.params?.device_name;
              setSuccess(device_name, true);
              resolve(Payload.params.device_name);
            } else {
              const device_name = Payload?.params?.device_name;
              setSuccess(device_name, false);
              reject({ code: 'GATEWAY_REPLY_BIND_FAIL', msg: `网关回复绑定子设备失败，错误码=${resultCode} ` });
            }
          }
        };

        log.mi('开始监听------绑定设备------->', info);
        sdk.on('wsEventReport', listener);

        removeListener = () => {
          sdk.off('wsEventReport', listener);
        };
      }),

      // 超时
      new Promise((_resolve, reject) => {
        setTimeout(() => {
          console.log('绑定超时', info.device_name, info);
          // 如果有反馈 则不进行超时处理
          // removeListener()
          const cuurent = window._bindData.filter(({ device_name }) => device_name === info.device_name);
          if (cuurent[0]?.success) return _resolve(info.device_name);
          console.log('超时处理', info.device_name, info);
          setSuccess(info.device_name, false);
          reject({ code: 'WAIT_GATEWAY_BIND_RESULT_TIMEOUT', msg: '等待网关回复绑定结果超时' });
        }, BIND_TIMEOUT);
      }),
    ]).then((resultSubDeviceId) => {
      // 绑定成功
      __resolve({
        productId: info.productId,
        resultSubDeviceId,
      });
    })
      .catch(__reject)
      .finally(() => {
        removeListener();
      });
  });


  // 开始绑定
  const startBind = info => new Promise((__resolve, __reject) => {
    log.mi('-----------------------------------开始绑定:', info, new Date());
    // 请求绑定
    sdk.callDeviceAction({ // 测试数据
      protocol: info.protocol,
      product_id: info.productId,
      uuids: info.uuid,
    }, '_sys_gw_join_subdev').then(() => {
      waitBind(info).then(__resolve, __reject)
        .catch(__reject);
    })
      .catch(__reject);
  });

  const serialPromises = (promises = [], args = []) => new Promise((resolve, reject) => {
    const allResult = [];
    const successResult = [];
    const errorResult = [];

    // 最后结束
    const finnalyFn = () => {
      console.log('最后---结束');
      resolve({ allResult, successResult, errorResult });
    };

    // 分布执行
    const process = (index, promiseArg, preResult) => {
      const current = promises[index];

      const next = result => process(index + 1, args[index + 1], result);

      if (current) {
        current(promiseArg, preResult).then((success) => {
          allResult.push(success);
          successResult.push(success);
          if (promises.length - 1 === index) {
            finnalyFn();
          }
          next(success);
        })
          .catch((err) => {
            allResult.push(err);
            errorResult.push(err);
            if (promises.length - 1 === index) {
              finnalyFn();
            }
            next(err);
          });
      }
    };
    process(0, args[0], null);
  });


  /**
   *  开始绑定指定或多个设备
   */
  const startBinds = (scans) => {
    setLisenceScan(false); // 取消监听扫描
    serialPromises(scans.map(() => startBind), scans).then(() => {
      // if (errorResult?.length) return setStatus(STATUS.BINDBERROR);
      setStatus(STATUS.BINDOVER);
    });
  };

  // 监听上报的设备数据
  const scanResponse = deviceData?._sys_gw_scan_report;
  useEffect(() => {
    if (query.start) {
      startSearch();
    }
    return () => {
      log.mi('扫描清空数据-----------');
      // 清空页面数据
      setBindData([]);
      setSearchResult([]);
      setStatus(STATUS.UNSCAN);
      stopSearch(); // 停止扫描
      setErrorMsg([]);
      window._bindData = [];
      // 清空历史存储的扫描数据 _sys_gw_scan_report？
    };
  }, [query.start]);


  // 监听并且处理上报数据
  useEffect(() => {
    if (isLisenceScan) {
      log.mw('接受到扫描的设备：', statusRef.current, scanResponse);
      scanResponse && dealScanReport(scanResponse);
    }
  }, [scanResponse, isLisenceScan]);


  log.mi('RENDER:', { status: statusRef.current, searchResult, scanResponse, bindData, _bindData: window._bindData });

  return (
    <div className='search-device'>
      {/*  一直未收到数据显示 */}
      {(statusRef.current == STATUS.UNSCAN || statusRef.current == STATUS.STARTSCAN || statusRef.current == STATUS.ERROR || statusRef.current == STATUS.TIMEOUT)
        ? <div className='start-content'>
          <Circle status={start} message={MESSAGE[status] || errorMsg} msg={MSG[status] || '搜索异常'}></Circle>
          {/* 异常情况 显示再次尝试 */}
          {
            (statusRef.current == STATUS.TIMEOUT || statusRef.current == STATUS.ERROR) ? <>
              <div className='fexid-btn center' onClick={startSearch}>再次尝试</div>
            </> : null
          }
        </div>
        : null}
      {/* 收到扫描数据 */}
      {/* // 目前需求缺少扫描完毕页面  则采用扫描成功月面*/}
      {
        statusRef.current === STATUS.SUCCESS || statusRef.current == STATUS.OVER
          ? <>
            <div className='scan-success'>
              <div className='scan-msg'>{
                MESSAGE[statusRef.current].map(val => <div>{val}</div>)
              }</div>
              <div className='list'>
                {/* 列表显示数据 */}
                {searchResult.map(info => <Production
                  IS_TEST={IS_TEST}
                  key={info?.uuid}
                  onStartBind={product => onStartBind(info, product)}
                  info={info}
                  sdk={sdk}
                >
                </Production>)}

              </div>
            </div>
            <div className='fexid-btn center' onClick={() => onStartBindAll(searchResult)}>一键添加</div>
          </>
          : null

      }

      {/* 扫描完毕 */}
      {/* // 目前需求缺少改页面 */}

      {/* 进行绑定 */}
      {
        (statusRef.current === STATUS.BINDBEGIN || statusRef.current === STATUS.BINDSUCCESS
          || statusRef.current == STATUS.BINDBERROR || statusRef.current === STATUS.BINDOVER)
          ? <>
            <Spin loading={statusRef.current != STATUS.BINDOVER}>
              <div className='begin-bind'>
                {
                  window._bindData.map(info => <BindProduction IS_TEST={IS_TEST} key={info?.uuid} info={info}
                                                               sdk={sdk} />)
                }
              </div>
            </Spin>
            {
              // 成功或者失败都是直接完成
              (statusRef.current === STATUS.BINDOVER)
                ? <>
                  <div className='fexid-btn center' onClick={
                    () => goBack()}>完成
                  </div>
                </>
                : null
            }
          </>
          : null
      }
    </div>
  );
}
