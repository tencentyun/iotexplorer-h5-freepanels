import sdk from 'qcloud-iotexplorer-h5-panel-sdk';

export const modifyModalName = async ({
  DeviceKey,
  DeviceValue,
}) => {
  await sdk.requestTokenApi('AppSetDeviceConfig', {
    DeviceId: sdk.deviceId,
    DeviceKey,
    DeviceValue,
  });
};

export const getModalName = async ({
  DeviceKey,
}) => {
  const { Configs } = await sdk.requestTokenApi('AppGetDeviceConfig', {
    DeviceId: sdk.deviceId,
    DeviceKey,
  });
  return { Configs };
};
