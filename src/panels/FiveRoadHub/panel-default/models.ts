import sdk from 'qcloud-iotexplorer-h5-panel-sdk';

export const ModifyModalName = async ({
  DeviceKey,
  DeviceValue,
}) => {
  await sdk.requestTokenApi('AppSetDeviceConfig', {
    DeviceId: sdk.deviceId,
    DeviceKey,
    DeviceValue
  })
}

export const GetModalName = async ({
  DeviceKey,
}) => {
  const { Configs } = await sdk.requestTokenApi('AppGetDeviceConfig',{
    DeviceId: sdk.deviceId,
    DeviceKey
  }) 
  return { Configs };
}