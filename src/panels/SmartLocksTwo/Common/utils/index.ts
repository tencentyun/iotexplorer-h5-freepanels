import sdk from 'qcloud-iotexplorer-h5-panel-sdk';

export const getTimeArr = (time: string) => {
  if (!time) return null;
  return time.split(':');
};

export const sleep = (delay: number) => new Promise(resolve => setTimeout(resolve, delay));
export const shortid = () => {
  // 防止shortid中出现%，导致urlquery解析失败
  sdk.appDevSdk.utils.shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_');
  return sdk.appDevSdk.utils.shortid();
};

