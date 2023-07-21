import React, { useEffect, useState } from 'react';
import { Icon } from '@custom/Icon';
import { getErrorMsg } from "./utils";
import { useTitle, setTitle } from '@hooks/useTitle';
import { Circle } from "./Circle";
import { Production } from "./Production";
import { BindProduction } from "./BindProduction";
import { Spin } from '@custom/Spin';


/**
 *  添加子设备
 */

const IS_TEST = false;

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

    const scan_time = 300; // 扫描时间
    const BIND_TIMEOUT = 3000; // 绑定超时时间
    useTitle('搜索设备');
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
    const [status, setStatus] = useState(STATUS.UNSCAN);

    const [errorMsg, setErrorMsg] = useState(['正在搜索附近设备', '请确保设备处于配网状态']); // 错误信息
    const [bindErrorMsg, setBindErrorMsg] = useState(''); // 错误信息

    // 扫描的数据
    // const [searchResult, setSearchResult] = useState<SearchResultInfo[]>([]);
    const [searchResult, setSearchResult] = useState<SearchResultInfo[]>(defaultScanResult);

    // 需要绑定的数据
    // const [bindData, setBindData] = useState([]);
    const [bindData, setBindData] = useState(defaultScanResult);

    const MESSAGE = {
        0: ["未发现设备", "请确保设备处于待配网状态并在附近"],
        1: ["正在搜索附近设备", "请确保设备处于配网状态"],
        "-1": ["未发现设备", "请确保设备处于待配网状态并在附近"]
    }
    const MSG = {
        0: "请开始搜索",
        1: "搜索中",
        "-1": "搜索超时"
    }

    // 测试数据 

    const callDeviceAction = (param, p2) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("OK");
                // reject({ code: '————TEST-callDeviceAction', msg: '请求扫描异常' });
            }, scan_time)
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

    // 处理上报的数据
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
        setSearchResult(result);
    };


    // 监听处理上报的设备
    const lisenerScanReport = (scanResponse) => {
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
        if (status === STATUS.BINDBEGIN) {
            setStatus(STATUS.SUCCESS);
        }

    }

    /**
     * 开始扫描
     */
    const startSearch = () => {
        setStatus(STATUS.STARTSCAN);
        let fn = IS_TEST ? callDeviceAction : sdk.callDeviceAction;
        fn.call(sdk,{ scan: 1, scan_timeout: scan_time}, '_sys_gw_scan_subdev')
        // sdk.callDeviceAction({ scan: 1, scan_timeout: scan_time}, '_sys_gw_scan_subdev')
            .then(() => {
                // 外层deviceData监听上报设备
                setStatus(1);

                if (IS_TEST) { // 测试数据
                    lisenerScanReport(JSON.stringify(defaultScanResult))
                }

                // 超时处理
                setTimeout(() => {
                    if (status) { // 还在在搜索 数据未回来
                        setStatus(STATUS.TIMEOUT); // 超时处理
                    } else {
                        setStatus(STATUS.OVER); // 扫描完毕
                    }
                }, scan_time + 1000) // 多加一秒  避免数据在回来的路上
            })
            .catch((err) => {
                console.error(err);
                setErrorMsg([getErrorMsg(err)])
                setStatus(STATUS.ERROR);
            });
    };




    // 是否开始扫描
    const start = status == STATUS.STARTSCAN;

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
        setTitle("添加设备")
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

                    sdk.on('wsEventReport', listener);

                    removeListener = () => {
                        sdk.off('wsEventReport', listener);
                    };
                }
            }),

            // 超时
            new Promise((_resolve, reject) => {
                setTimeout(() => {
                    reject({ code: 'WAIT_GATEWAY_BIND_RESULT_TIMEOUT', msg: '等待网关回复绑定结果超时' });
                }, BIND_TIMEOUT);
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
        fn.call(sdk,{ // 测试数据
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
            setTitle("添加成功");
            setStatus(STATUS.BINDSUCCESS);
        }).catch(error => {
            console.error(error);
            setStatus(STATUS.BINDBERROR);
            setBindErrorMsg(getErrorMsg(error))
        })
    }



    // 监听上报的设备数据
    let scanResponse = deviceData?._sys_gw_scan_subdev;
    useEffect(() => {
        if (scanResponse) { // 存在扫描数据
            lisenerScanReport(scanResponse);
        }
    }, [scanResponse])


    useEffect(() => {
        query.start && startSearch();
    }, [query.start])


    return (
        <div className="search-device">
            {/*  一直未收到数据显示 */}
            {(status == STATUS.UNSCAN || status == STATUS.STARTSCAN || status == STATUS.ERROR || status == STATUS.TIMEOUT) ?
                <div className="start-content">
                    <Circle status={start} message={MESSAGE[status] || errorMsg} msg={MSG[status] || '搜索异常'}></Circle>
                    {/* 异常情况 显示再次尝试 */}
                    {
                        (status == STATUS.TIMEOUT || status == STATUS.ERROR) ? <>
                            <div className='fexid-btn center' onClick={startSearch}>再次尝试</div>
                        </> : null
                    }
                </div>

                : null}
            {/* 收到扫描数据 */}
            {/* // 目前需求缺少扫描完毕页面  则采用扫描成功月面*/}
            {
                status === STATUS.SUCCESS || status == STATUS.OVER ?
                    <>
                        <div className='scan-success'>
                            <div className='scan-msg'>{
                                MESSAGE["1"].map(val => <div>{val}</div>)
                            }</div>
                            <div className="list">
                                {/* 列表显示数据 */}
                                {searchResult.map(info => {
                                    return <Production
                                        IS_TEST={IS_TEST}
                                        key={info?.id}
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
                (status === STATUS.BINDBEGIN || status === STATUS.BINDSUCCESS) ?
                    <>
                        <Spin loading={status == STATUS.BINDBEGIN}>
                            <div className='begin-bind'>
                                {
                                    bindData.map(info => {
                                        return <BindProduction IS_TEST={IS_TEST} key={info?.id} info={info} sdk={sdk} />
                                    })
                                }
                            </div>
                        </Spin>
                        {
                            status === STATUS.BINDSUCCESS ?
                                <>
                                    <div className="fexid-btn center" onClick={
                                        () => push("/home")}>完成</div>
                                </>
                                : null
                        }
                    </>
                    : null
            }

            {
                status === STATUS.BINDBERROR ?
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
            }
            {/* 页面状态测试 */}

            {/* <div>状态:{status}</div>
            <div>错误信息:{errorMsg}</div>
            <div>返回数据结果:{deviceData._sys_gw_scan_report}</div> */}
        </div>
    );
}
