import { useEffect, useState } from 'react';

/**
 * 单个产品信息
 */

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

export function Production({ info, onStartBind, sdk, IS_TEST }) {

    const [data, setData] = useState();

    const getProductInfoPromise = async (productId: string) => {
        if (productInfoPromiseCache[productId] === null || productInfoPromiseCache[productId] === undefined) {
            let data = await sdk.getProductInfo({ productId });
            productInfoPromiseCache[productId] = data[0];
        }
        return productInfoPromiseCache[productId];
    };

    const getProductionData = async (info) => {
        const result = await getProductInfoPromise(info.productId);
        setData(result.data);
    }

    // 测试数据
    const getTestProductionData = async (info) => {
        setData({
            IconUrl: "https://main.qcloudimg.com/raw/05ca75c84bb7c1e2dbc9d762cf3af1f1.png",
            Name: "门窗传感器",
            productId: "11111111",
            device_name: "设备名"
        });
    }


    useEffect(() => {
        let fn = IS_TEST ? getTestProductionData : getProductionData;
        fn(info);
    }, [info.productId])


    if (!data) return null;

    return (<div className="production center" onClick={() => onStartBind(data)}>
        {/* 图标 */}
        <div>
            {
                data?.IconUrl ? <img src={data.IconUrl} width={56} height={56} /> :
                    <img src="https://main.qcloudimg.com/raw/05ca75c84bb7c1e2dbc9d762cf3af1f1.png" width={56} height={56} />
            }
        </div>
        {/* 名称 */}
        <div className="name-flag">{String(data?.Name || info.productId)}</div>
        {/* 产品名称 */}
        <div>{String(data?.device_name || info.productId)}</div>
    </div >
    );
}