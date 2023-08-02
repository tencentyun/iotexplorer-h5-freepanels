import React, { useEffect, useState } from 'react';
import { Icon } from '@custom/Icon';
import { getErrorMsg } from "./utils";
import { useTitle } from '@hooks/useTitle';
import { Circle } from "./Circle";
import { Production } from "./Production";
import { BindProduction } from "./BindProduction";
import { Spin } from '@custom/Spin';


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
 * @param {*} props 
 * @returns 
 */


const defaultScanResult = [
    { productId: 'ANODBJFLG0', protocol: "0", uuid: "1,2,34" },
    { productId: 'ANODBJFLG0', protocol: "0", uuid: "1,2,34" },
    { productId: 'ANODBJFLG0', protocol: "0", uuid: "1,2,34" },
    { productId: 'ANODBJFLG0', protocol: "0", uuid: "1,2,34" },
    { productId: 'ANODBJFLG0', protocol: "0", uuid: "1,2,34" },
    { productId: 'ANODBJFLG0', protocol: "0", uuid: "1,2,34" },
    { productId: 'ANODBJFLG0', protocol: "0", uuid: "1,2,34" },
    { productId: 'ANODBJFLG0', protocol: "0", uuid: "1,2,34" }
];


export function SearchDevice(props) {
    let { sdk, deviceData, history: { query }, log } = props;

    const scan_time = 3000; // 扫描时间
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
    const [status, setStatus] = useState(STATUS.BINDSUCCESS);

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


    // 解析扫描数据
    const parseData = (data) => {
        // 需要追加到原来的数据中 可能多次返回

    }


    /**
     * 开始扫描
     */
    const startSearch = () => {
        sdk.callDeviceAction({ scan: 1, scan_timeout: scan_time }, '_sys_gw_scan_subdev')
            .then(() => {
                setStatus(1);
                setTimeout(() => {
                    if (status) { // 还在在搜索 数据未回来
                        setStatus(STATUS.TIMEOUT); // 超时处理
                    } else {
                        setStatus(STATUS.OVER); // 扫描完毕
                    }
                }, scan_time + 1000) // 多加一秒  避免数据在回来的路上
            })
            .catch((err) => {
                setErrorMsg([getErrorMsg(err)])
                setStatus(STATUS.ERROR);
            });
    };


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


    let scanResponse = deviceData?._sys_gw_scan_subdev;
    useEffect(() => {
        if (scanResponse) { // 存在扫描数据
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
            parseData(scanData)
            setStatus(STATUS.SUCCESS);
        }
    }, [scanResponse])


    useEffect(() => {
        query.start && startSearch();
    }, [query.start])

    // 是否开始扫描
    const start = status == STATUS.STARTSCAN;


    // 绑定子设备
    const onStartBind = (product, scan) => {
        console.log("开始单个绑定设备", scan);
        setBindData([scan]);
        setStatus(STATUS.BINDBEGIN);

    }
    // 绑定全部设备
    const onStartBindAll = (scans) => {
        console.log("绑定全部设备", scans)
        setBindData([scans]);
        setStatus(STATUS.BINDBEGIN);
    }


    // 重新绑定
    const recoverBind = () => {
        setStatus(STATUS.SUCCESS);
    }

    // 等待绑定结果
    const waitBind = async (info) => {
        let removeListener: () => void = () => {
            // noop
        };
        try {
            const resultSubDeviceId = await Promise.race([
                // 监听设备上报事件
                new Promise((resolve, reject) => {
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
                }),

                // 超时
                new Promise((_resolve, reject) => {
                    setTimeout(() => {
                        reject({ code: 'WAIT_GATEWAY_BIND_RESULT_TIMEOUT', msg: '等待网关回复绑定结果超时' });
                    }, BIND_TIMEOUT);
                }),
            ]);
            // 绑定成功
            return {
                productId: info.productId,
                resultSubDeviceId,
            }

        } catch (error) {
            setStatus(STATUS.BINDBERROR);
            setBindErrorMsg(getErrorMsg(error))
        }
    }




    const startBind = async (info) => {
        // 请求绑定
        try {
            await sdk.callDeviceAction({
                protocol: info.protocol,
                product_id: info.productId,
                uuids: info.uuid,
            }, '_sys_gw_join_subdev');
        } catch (error) {
            let message = `请求网关开始绑定失败 ${getErrorMsg(error)}`;
            setStatus(STATUS.BINDBERROR);
            setBindErrorMsg(message);
        }

        let bindSuccess = waitBind(info);
        log.mi("绑定成功:", `设备 ID: ${bindSuccess?.productId}/${bindSuccess?.resultSubDeviceId}`)
        return bindSuccess;
    }



    /**
     *  开始绑定指定设备
     */
    const startBinds = (scans) => {

    }







    return (
        <div className="search-device">
            {/*  一直未收到数据显示 */}
            {status < STATUS.SUCCESS ?
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
            {
                status === STATUS.SUCCESS ?
                    <>
                        <div className='scan-success'>
                            <div className='scan-msg'>{
                                MESSAGE["1"].map(val => <div>{val}</div>)
                            }</div>
                            <div className="list">
                                {/* 列表显示数据 */}
                                {searchResult.map(info => {
                                    return <Production
                                        onStartBind={(product) => onStartBind(product, info)}
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
                                        return <BindProduction info={info} sdk={sdk} />
                                    })
                                }
                            </div>
                        </Spin>
                        {
                            status === STATUS.BINDSUCCESS ?
                                <>
                                    <div className="fexid-btn center" onClick={() => recoverBind()}>重新添加</div>
                                </>
                                : null
                        }
                    </>
                    : null
            }

            {
                status === STATUS.BINDBERROR ?
                    <div className='bind-error-panel center'>
                        <div>
                            <Icon name="bind-error" />
                        </div>
                        <div className="fexid-btn center" onClick={() => recoverBind()}>重新添加</div>
                    </div>
                    : null
            }


            <div>进入子设备页面</div>
            <div>状态:{status}</div>
            <div>错误信息:{errorMsg}</div>
            <div>返回数据结果:{deviceData._sys_gw_scan_report}</div>
            <div onClick={() => setStatus(1)}>启:{'' + status}</div>
            <div onClick={() => setStatus(0)}>启:{'' + status}</div>
            <div onClick={() => setStatus(-2)}>异常:{'' + status}</div>
            <div onClick={() => setStatus(-1)}>超时:{'' + status}</div>
        </div>
    );
}
