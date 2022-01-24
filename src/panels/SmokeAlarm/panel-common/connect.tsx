import React, { useState, useEffect } from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';

export const connect = (App) => {
  console.log(App)
  return () => {
    const [sdkReady, setSdkReady] = useState(false);
    useEffect(() => {
      sdk.sdkReady().then(() => setSdkReady(true));
    }, []);
    return sdkReady ? <App /> : <div>loading...</div>
  }
}