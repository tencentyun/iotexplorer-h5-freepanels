import sdk from 'qcloud-iotexplorer-h5-panel-sdk';

export const getGatewayBindProducts = async ({ offset, limit = 40 }) => {
  const { Products, Total } = await sdk.requestTokenApi('AppDescribeBindedProducts', {
    GatewayProductId: sdk.productId,
    Limit: limit,
    Offset: offset,
  });
  console.log(Products, Total);
  return { total: Total, list: Products };
};

// export const AppBindedGatewayByProduct
export const getGatewayBindDeviceList = async ({ Offset, Limit = 50, ProductId }) => {
  const { Total, DeviceList } = await sdk.requestTokenApi('AppGetGatewayBindDeviceList', {
    ProductId,
    GatewayProductId: sdk.productId,
    GatewayDeviceName: sdk.deviceName,
    Offset,
    Limit,
  });
  return { total: Total, list: DeviceList };
};

export async function getFreePanelInfo({ PanelId }) {
  try {
    const { PanelSetting } = await sdk.requestTokenApi('AppGetCategoryPanelInfoById', { PanelId: Number(PanelId) });

    return JSON.parse(PanelSetting);
  } catch (err) {
    console.error('getFreePanelInfo', PanelId, err);
    return null;
  }
}
