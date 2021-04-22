import sdk from 'qcloud-iotexplorer-h5-panel-sdk';

export const getGatewayBindProducts = async({ Offset,Limit = 40}) => {
  const { ProductIds, Total } = await sdk.requestTokenApi("DescribeBindedProducts",{
    GatewayProductId: sdk.productId,
    Limit,
    Offset,
  })
  return { total: Total, list: ProductIds }
}

export const getGatewayBindDeviceList = async({ Offset,Limit = 50 }) => {
  const { Total, DeviceList } = await sdk.requestTokenApi('AppGetGatewayBindDeviceList',{
    ProductId: sdk.productId,
    GatewayProductId: sdk.productId,
    GatewayDeviceName: sdk.deviceName,
    Offset,
    Limit
  })
  return { total: Total, list: DeviceList }
}
