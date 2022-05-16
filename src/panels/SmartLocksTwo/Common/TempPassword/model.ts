import sdk from 'qcloud-iotexplorer-h5-panel-sdk';

export const getSign = async (payload: string) => {
  const res = await sdk.requestTokenApi('AppDeviceCustomSignature', {
    DeviceId: sdk.deviceId,
    Content: payload,
    SignMethod: 'hmacsha1',
  });
  return res.Signature;
};

export const getDeviceOTP = async () => {
  const res = await sdk.requestTokenApi('AppGenerateDeviceOTP', {
    DeviceId: sdk.deviceId,
    Digit: 6,
  });
  const {
    OTPPasswordProperty: {
      Expired: expired,
      OTPPassword: password,
    },
  } = res;
  return { expired, password };
};

