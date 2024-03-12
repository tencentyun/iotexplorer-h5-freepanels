const padTimeDigits = (value: number) => {
  return value < 10 ? `0${value}` : `${value}`;
};

export const formatSecondsMMDD = (seconds: number) => {
  return [
    padTimeDigits(Math.floor(seconds / 60)),
    padTimeDigits(Math.floor(seconds % 60)),
  ].join(':');
};

export const formatTimeHHMMDD = (time: number) => {
  const date = new Date(time);
  return [
    padTimeDigits(date.getHours()),
    padTimeDigits(date.getMinutes()),
    padTimeDigits(date.getSeconds()),
  ].join(':');
};

export const describeError = (err: any) => {
  if (err instanceof Error) {
    return err.stack || String(err);
  }

  if (typeof err === 'string') {
    return err;
  }

  return JSON.stringify(err);
};

export const withResult = (promise: Promise<any>) => {
  window.h5PanelSdk.tips.showLoading('下发中');
  promise
    .then(() => window.h5PanelSdk.tips.showSuccess('下发成功'))
    .catch((err) => window.h5PanelSdk.tips.showError(err));
};
