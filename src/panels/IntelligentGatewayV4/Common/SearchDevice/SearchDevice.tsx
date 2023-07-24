import React, { useEffect, useState, useRef } from 'react';
import { getErrorMsg } from "./utils";
import { setTitle } from '@hooks/useTitle';
import { Circle } from "./Circle";
import { Production } from "./Production";
import { BindProduction } from "./BindProduction";
import { Spin } from '@custom/Spin';


function base64toHEX(base64) {
    let raw = atob(base64);
    let HEX = '';
    for (let i = 0; i < raw.length; i++) {
        let _hex = raw.charCodeAt(i).toString(16)
        HEX += (_hex.length == 2 ? _hex : '0' + _hex);
    }
    return HEX.toUpperCase();
}

// 转换64截取最后6位

const tansSplit = (uuid) => {
    let hex = base64toHEX(uuid)
    return hex.slice(hex.length - 6, hex.length)
}
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

/**
 * 
 * 设备收索
 * 
 */
const defaultScanResult = IS_TEST ? [
    { productId: 'ANODBJFLG1', protocol: "0", uuids: "1234;", uuid: "1234" },
    { productId: 'ANODBJFLG2', protocol: "0", uuids: "1234;", uuid: "1234" },
    { productId: 'ANODBJFLG3', protocol: "0", uuids: "1234;", uuid: "1234" },
    { productId: 'ANODBJFLG4', protocol: "0", uuids: "1234;", uuid: "1234" },
    { productId: 'ANODBJFLG5', protocol: "0", uuids: "1234;", uuid: "1234" },
    { productId: 'ANODBJFLG6', protocol: "0", uuids: "1234;", uuid: "1234" },
    { productId: 'ANODBJFLG7', protocol: "0", uuids: "1234;", uuid: "1234" },
    { productId: 'ANODBJFLG8', protocol: "0", uuids: "1234;", uuid: "1234" }
] : [];


export function SearchDevice(props) {
    let { sdk, deviceData, history: { query, push }, log } = props;

    const scan_time = 60; // 扫描时间
    const BIND_TIMEOUT = 10000; // 绑定超时时间
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
    }

    // 每个状态对应的标题
    const TITLE = {
        0: "搜索设备",
        1: "搜索设备",
        3: "搜索设备",
        "-1": "搜索设备",
        "-2": "搜索设备",
        10: "添加设备",
        11: "添加设备",
        12: "成功添加",
    }

    // 不能使用useState 因为有延迟
    const [status, _setStatus] = useState(STATUS.UNSCAN);

    // status 变为同步
    const statusRef = useRef(status);
    const setStatus = (v) => {
        console.log("扫描--设置---页面状态", v)
        statusRef.current = v;
        _setStatus(v);
    }

    const [errorMsg, setErrorMsg] = useState(['正在搜索附近设备', '请确保设备处于配网状态']); // 错误信息
    const [bindErrorMsg, setBindErrorMsg] = useState(''); // 错误信息

    // 扫描的数据
    // const [searchResult, setSearchResult] = useState<SearchResultInfo[]>([]);
    const [searchResult, setSearchResult] = useState<SearchResultInfo[]>(defaultScanResult);

    // 需要绑定的数据
    // const [bindData, setBindData] = useState([]);
    const [bindData, _setBindData] = useState(defaultScanResult);

    // 兼容直接设置后不能渠道值
    const setBindData = (data) => {
        window._bindData = data;
        _setBindData(data)
    }

    const MESSAGE = {
        0: ["未发现设备", "请确保设备处于待配网状态并在附近"],
        1: ["正在搜索附近设备", "请确保设备处于配网状态"],
        3: ["正在搜索附近设备", "请确保设备处于配网状态"],
        4: ["本次搜索结束", "您可以添加当前子设备"],
        "-1": ["未发现设备", "请确保设备处于待配网状态并在附近"]
    }
    const MSG = {
        0: "请开始搜索",
        1: "搜索中",
        "-1": "搜索超时"
    }

    // 设置绑定成功的状态
    const setSuccess = (deviceName, isSuccess) => {
        let newBindData = (window._bindData || []).map(item => {
            if (item.device_name === deviceName) {
                return { ...item, success: isSuccess }
            } else {
                return item;
            }
        })
        setBindData(newBindData)
    }




    // 测试数据 

    const callDeviceAction = (param, p2) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("OK");
                // reject({ code: '————TEST-callDeviceAction', msg: '请求扫描异常' });
            }, scan_time * 1000)
        })
    }

    const callDeviceActionBind = (param, p2) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("OK");
                // reject({ code: '————TEST-callDeviceActionBind', msg: '请求绑定异常' });
            }, scan_time)
        })
    }

    // 处理扫描上报的数据
    const handleScanReport = (scanReport: ProtocolScanReport[]) => {
        let result: SearchResultInfo[] = [];
        scanReport.forEach((protocolScanReport) => {
            protocolScanReport.uuids
                .split(';')
                .filter(item => item.length > 0)
                .forEach((uuid) => {
                    console.log("------------------'", uuid)

                    result.push({
                        productId: protocolScanReport.product_id,
                        protocol: protocolScanReport.protocol,
                        uuid,
                        device_name: tansSplit(uuid)
                        // name:"",
                    });
                });
        });

        // 按照uuid去重 追加数据
        let existUUID = {};
        result = searchResult.concat(result).filter(({ uuid }) => {
            let res = !existUUID[uuid];
            existUUID[uuid] = uuid;
            return res;
        })

        setSearchResult(result);
        console.log("扫描有收到数据-------------------------", result)
        setStatus(STATUS.SUCCESS);
    };


    // 监听处理上报的设备
    const dealScanReport = (scanResponse) => {
        console.log("监听上报扫描数据:", scanResponse);
        if (typeof scanResponse !== 'string') {
            setStatus(STATUS.ERROR);
            setErrorMsg(['_sys_gw_scan_report', '不是字符串'])
            return;
        }
        let scanData = JSON.parse(scanResponse);
        if (!Array.isArray(scanData)) {
            setStatus(STATUS.ERROR);
            setErrorMsg(['_sys_gw_scan_report', '不是数组 JSON'])
            return;
        }
        // 处理监听的设备
        handleScanReport(scanData)
    }

    /**
     * 开始扫描
     */
    const startSearch = () => {
        setStatus(STATUS.STARTSCAN);
        let fn = IS_TEST ? callDeviceAction : sdk.callDeviceAction;
        fn.call(sdk, { scan: 1, scan_timeout: scan_time }, '_sys_gw_scan_subdev')
            // sdk.callDeviceAction({ scan: 1, scan_timeout: scan_time}, '_sys_gw_scan_subdev')
            .then(() => {
                // 外层deviceData监听上报设备
                if (IS_TEST) { // 测试数据
                    dealScanReport(JSON.stringify(defaultScanResult))
                }

                // 超时处理
                setTimeout(() => {
                    if (statusRef.current == STATUS.STARTSCAN) { // 还在在搜索 数据未回来
                        setStatus(STATUS.TIMEOUT); // 超时处理
                    } else {
                        if (statusRef.current < STATUS.SUCCESS) { // 扫描成功时 才有结束的状态
                            setStatus(STATUS.OVER); // 扫描完毕
                        }
                    }
                }, scan_time * 1000) // 多加一秒  避免数据在回来的路上
            })
            .catch((err) => {
                console.error(err);
                setErrorMsg([getErrorMsg(err)])
                setStatus(STATUS.ERROR);
            });
    };




    // 是否开始扫描
    const start = statusRef.current == STATUS.STARTSCAN;

    // 绑定子设备
    const onStartBind = (scan, product) => {
        console.log("开始单个绑定设备", scan);
        setBindData([scan]);
        setStatus(STATUS.BINDBEGIN);
        startBinds([scan])
    }

    // 绑定全部设备
    const onStartBindAll = (scans) => {
        console.log("绑定全部设备", scans)
        setBindData(scans);
        setStatus(STATUS.BINDBEGIN);
        startBinds(scans)
    }

    // 重新绑定
    const recoverBind = () => {
        setStatus(STATUS.SUCCESS);
    }

    // 等待绑定结果
    const waitBind = (info) => new Promise((__resolve, __reject) => {
        let removeListener: () => void = () => {
            // noop
        };
        Promise.race([
            // 监听设备上报事件
            new Promise((resolve, reject) => {


                if (IS_TEST) {
                    // 测试数据
                    setTimeout(() => {
                        resolve("监听成功");
                        // reject({ code: 'GATEWAY_REPLY_BIND_FAIL', msg: `网关回复绑定子设备失败`});
                    }, 3000)
                } else {
                    const listener = ({ deviceId, Payload }: { deviceId: string; Payload: any }) => {
                        if (deviceId !== sdk.deviceId) return;
                        log.mi("监听到绑定上报数据:", Payload);
                        if (Payload.eventId !== '_sys_gw_bind_result') return;
                        if (Payload.params.product_id === info.productId
                            && Payload.params.protocol === info.protocol
                            && (Payload.params.uuid || '').split(';')[0] === info.uuid) {
                            const resultCode = Payload.params.code;
                            if (resultCode === 0) {
                                // 设置指定设备未成功状态
                                let device_name = Payload?.params?.device_name;
                                setSuccess(device_name, true)
                                resolve(Payload.params.device_name);
                            } else {
                                let device_name = Payload?.params?.device_name;
                                setSuccess(device_name, false)
                                reject({ code: 'GATEWAY_REPLY_BIND_FAIL', msg: `网关回复绑定子设备失败，错误码=${resultCode} ` });
                            }
                            removeListener();
                        }
                    };

                    sdk.on('wsEventReport', listener);

                    removeListener = () => {
                        sdk.off('wsEventReport', listener);
                    };
                }
            }),

            // 超时
            new Promise((_resolve, reject) => {
                setTimeout(() => {
                    console.log("超时", info.device_name, info)
                    // 如果有反馈 则不进行超时处理
                    removeListener()
                    let cuurent = window._bindData.filter(({ device_name }) => device_name === info.device_name);
                    if (cuurent[0]?.success) return _resolve( info.device_name);
                    console.log("处理", info.device_name, info)
                    reject({ code: 'WAIT_GATEWAY_BIND_RESULT_TIMEOUT', msg: '等待网关回复绑定结果超时' });
                    setSuccess(info.device_name, false);
                }, BIND_TIMEOUT * window._bindData.length);
            }),
        ]).then(resultSubDeviceId => {
            // 绑定成功
            __resolve({
                productId: info.productId,
                resultSubDeviceId,
            })
        }).catch(__reject);
    });


    // 开始绑定
    const startBind = (info) => new Promise((__resolve, __reject) => {
        let fn = IS_TEST ? callDeviceActionBind : sdk.callDeviceAction;
        // 请求绑定
        fn.call(sdk, { // 测试数据
            protocol: info.protocol,
            product_id: info.productId,
            uuids: info.uuid,
        }, '_sys_gw_join_subdev').then(() => {
            waitBind(info).then(__resolve, __reject).catch(__reject)
        }).catch(__reject);
    });


    /**
     *  开始绑定指定或多个设备
     */
    const startBinds = (scans) => {
        let allPromsie = scans.map(scan => startBind(scan));
        Promise.all(allPromsie).then(() => {
            setStatus(STATUS.BINDSUCCESS);
        }).catch(error => {
            console.error(error);
            setStatus(STATUS.BINDBERROR);
            setBindErrorMsg(getErrorMsg(error))
        })
    }



    // 监听上报的设备数据
    // let scanResponse = deviceData?._sys_gw_scan_subdev;

    let scanResponse = deviceData?._sys_gw_scan_report;

    useEffect(() => {
        if (query.start) { // 标题还是不会生效
            // console.log("-----TITLE---------BEFORE-------------------------------------------------", window.document.title)
            setTitle(TITLE[statusRef.current])
            // console.log("------TITLE-------AFTER--------------------------------------------------", window.document.title)
        }
    }, [statusRef.current, query.start])


    useEffect(() => {
        query.start && startSearch();
        console.log("开始扫描----------------------------------:", query.start)
    }, [query.start])

    // 监听并且处理上报数据
    useEffect(() => {
        if (scanResponse) {
            console.log("--扫描--接受到扫描的子设备的数据:", statusRef.current, scanResponse)
        }

        // 接受到数据 并且页面状态是开始扫描或者部分扫描成功时 才处理数据
        if (scanResponse && (statusRef.current === STATUS.STARTSCAN || statusRef.current === STATUS.SUCCESS)) { // 存在扫描数据
            dealScanReport(scanResponse);
        }
    }, [scanResponse])




    log.mi("RENDER_扫描结果:", { status: statusRef.current, searchResult, scanResponse, bindData })

    return (
        <div className="search-device">
            {/*  一直未收到数据显示 */}
            {(statusRef.current == STATUS.UNSCAN || statusRef.current == STATUS.STARTSCAN || statusRef.current == STATUS.ERROR || statusRef.current == STATUS.TIMEOUT) ?
                <div className="start-content">
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
                statusRef.current === STATUS.SUCCESS || statusRef.current == STATUS.OVER ?
                    <>
                        <div className='scan-success'>
                            <div className='scan-msg'>{
                                MESSAGE[statusRef.current].map(val => <div>{val}</div>)
                            }</div>
                            <div className="list">
                                {/* 列表显示数据 */}
                                {searchResult.map(info => {
                                    return <Production
                                        IS_TEST={IS_TEST}
                                        key={info?.productId}
                                        onStartBind={(product) => onStartBind(info, product)}
                                        info={info}
                                        sdk={sdk}
                                    >
                                    </Production>
                                })}

                            </div>
                        </div>
                        <div className="fexid-btn center" onClick={() => onStartBindAll(searchResult)}>一键添加</div>
                    </>
                    : null

            }

            {/* 扫描完毕 */}
            {/* // 目前需求缺少改页面 */}

            {/* 进行绑定 */}
            {
                (statusRef.current === STATUS.BINDBEGIN || statusRef.current === STATUS.BINDSUCCESS || statusRef.current == STATUS.BINDBERROR) ?
                    <>
                        <Spin loading={statusRef.current == STATUS.BINDBEGIN}>
                            <div className='begin-bind'>
                                {
                                    window._bindData.map(info => {
                                        return <BindProduction IS_TEST={IS_TEST} key={info?.id} info={info} sdk={sdk} />
                                    })
                                }
                            </div>
                        </Spin>
                        {
                            // 成功或者失败都是直接完成
                            (statusRef.current === STATUS.BINDSUCCESS || statusRef.current == STATUS.BINDBERROR) ?
                                <>
                                    <div className="fexid-btn center" onClick={
                                        () => push("/home")}>完成</div>
                                </>
                                : null
                        }
                    </>
                    : null
            }
            {/* 
            {
                statusRef.current === STATUS.BINDBERROR ?
                    <>
                        <div className='bind-error-panel center'>
                            <div>
                                <Icon name="bind-error" />
                            </div>
                            <div className="fexid-btn center" onClick={() => recoverBind()}>重新添加</div>
                        </div>
                        <div>{bindErrorMsg}</div>
                    </>
                    : null
            } */}
            {/* 页面状态测试 */}

            {/* <div>状态:{status}</div>
            <div>错误信息:{errorMsg}</div>
            <div>返回数据结果:{deviceData._sys_gw_scan_report}</div> */}
        </div>
    );
}
