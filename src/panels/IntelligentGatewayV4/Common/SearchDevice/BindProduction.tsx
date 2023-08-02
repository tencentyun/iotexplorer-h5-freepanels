import React, { useEffect, useState } from 'react';


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
 * 绑定产品信息
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

export function BindProduction({ info, sdk, IS_TEST }) {
  const [data, setData] = useState();

  const getProductInfoPromise = async (productId: string) => {
    if (productInfoPromiseCache[productId] === null || productInfoPromiseCache[productId] === undefined) {
      const data = await sdk.getProductInfo({ productId });
      productInfoPromiseCache[productId] = data[0];
    }
    return productInfoPromiseCache[productId];
  };

  const getProductionData = async (info) => {
    const result = await getProductInfoPromise(info.productId);
    setData(result);
  };

  // 测试数据
  const getTestProductionData = async (info) => {
    setData({
      IconUrl: 'https://main.qcloudimg.com/raw/05ca75c84bb7c1e2dbc9d762cf3af1f1.png',
      Name: '门窗传感器',
      productId: '11111111',
      device_name: '设备名',
      onLine: true,
    });
  };


  useEffect(() => {
    const fn = IS_TEST ? getTestProductionData : getProductionData;
    fn(info);
  }, [info.productId]);

  // 自定义开发loading TODO


  if (!data) return null;

  return (
    <div className='bind-production'>
      <div className='left-content center'>
        {/* 图标 */}
        <div>
          {data?.IconUrl ? (
            <img src={data.IconUrl} width={56} height={56} />
          ) : (
            <img src='https://main.qcloudimg.com/raw/05ca75c84bb7c1e2dbc9d762cf3af1f1.png' width={56} height={56} />
          )}
        </div>
        <div className='tite-content'>
          {/* 名称 */}
          <div className='name-flag'>{String(data?.Name || info.productId)}</div>
          {/* 产品名称 */}
          {/* <div>{String(data?.device_name || info.productId)}</div> */}
          <div>{info.device_name}</div>
        </div>
      </div>
      <div className={`bind-on-line ${info?.success === true ? 'on-line' : 'off-error'}`}>
        {info?.success === true ? '添加成功' : (info?.success === false ? '添加失败' : '')}
      </div>
    </div>
  );
}
