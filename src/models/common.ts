import { requestStaticConfig } from '@src/libs/request';

// 根据panelid获取虚拟设备（没有productid、deviceid)对应的设备商品购买地址
export const getVirtualDeviceShopUrl = async () => {
  const { data } = await requestStaticConfig('/51/config3.js');
  return data;
};
