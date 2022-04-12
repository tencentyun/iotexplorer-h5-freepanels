import sdk from 'qcloud-iotexplorer-h5-panel-sdk';

export const getTimeArr = (time: string) => {
  if (!time) return null;
  return time.split(':');
};

export const sleep = (delay: number) => new Promise(resolve => setTimeout(resolve, delay));
export const shortid = () => sdk.appDevSdk.utils.shortid();

