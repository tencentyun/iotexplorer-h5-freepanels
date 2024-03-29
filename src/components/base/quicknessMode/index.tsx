import React, { useState, useEffect } from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { Loading } from '../loading';
export const QuicknessMode = App => () => {
  const [sdkReady, setSdkReady] = useState(false);
  useEffect(() => {
    sdk.sdkReady().then(() => setSdkReady(true));
  }, []);
  return sdkReady ? <App /> : <Loading size='middle' marginTop={100} />;
};
