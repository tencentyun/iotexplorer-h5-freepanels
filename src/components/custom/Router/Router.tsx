import log from '@libs/logger';
import React, { useState } from 'react';
import * as  utils from '@utils';
import { useTimer } from '@src/hooks/useDevice';
import { StatusTip } from '@custom/StatusTip';
import { DeviceDetail } from '@custom/DeviceDetail';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { useTitle } from '@hooks/useTitle';
import { useDeviceInfo } from '@hooks/useDeviceInfo';
import {
  HashRouter,
  Switch,
  Route,
  Redirect,
  useHistory,
} from 'react-router-dom';

let { toLineObj, getEnv } = utils;
const env = getEnv();


const setStorage = (key: string, data) => localStorage.setItem(key, JSON.stringify(data));
const getStorage = (key: string) => {
  let value = localStorage.getItem(key);
  return value ? JSON.parse(value) : value
};




const parse = (url = '', { code = '' } = {}) => {
  if (!url) return {};
  const queryString = /\?/g.test(url) ? url.split('?')[1] : url;
  if (!queryString) return {};
  const qsObj = {};
  const aQs = queryString.split('&');
  aQs.forEach((qs) => {
    const keyValue = qs.split('=');
    let value = keyValue[1];
    if (code) {
      value = code === 'encode'
        ? encodeURIComponent(value)
        : decodeURIComponent(value);
    }
    qsObj[keyValue[0]] = value;
  });
  return qsObj;
};

const stringify = (obj = {}, { code = '' } = {}) => Object.keys(obj)
  .map((key) => {
    let value = obj[key];
    if (code) {
      value = code === 'encode'
        ? encodeURIComponent(value)
        : decodeURIComponent(value);
    }
    return `${key}=${value}`;
  })
  .join('&');

const PageComponent = ({
  Component,
  PATH,
  className,
  path,
  detail,
  ...props
}) => {
  const reactDomHistory = useHistory();
  const [timerState, TimerAction] = useTimer();
  // 本地存储 记录用户第一次使用产品等信息
  let { UserID, DeviceId } = props?.deviceInfo || {}
  let uniKey = `${UserID}/${DeviceId}_`;
  const setLocal = (key, value) => setStorage(`${uniKey}${key}`, value);
  const getLocal = key => getStorage(`${uniKey}${key}`);
  const history = {
    push: (pathName, params) => {
      let url = pathName;
      if (params) {
        const queryString = stringify(params);
        url = `${pathName}?${queryString}`;
      }
      reactDomHistory.push(url);
    },
    replace: (pathName, params) => {
      let url = pathName;
      if (params) {
        const queryString = stringify(params);
        url = `${pathName}?${queryString}`;
      }
      reactDomHistory.replace(url);
    },
    goBack: reactDomHistory.goBack,
    query: parse(reactDomHistory.location.search, { code: 'need' }),
    PATH,
  };
  // tips功能
  const { tips } = sdk;

  // 查看更多 设备详情
  const goMore = () => {
    !sdk.disable && sdk?.goDeviceDetailPage()
  }

  const setTitle = (title) => useTitle(title || props?.deviceInfo?.AliasName || props?.deviceInfo?.DeviceName);

  const allProps = {
    history,
    ...props,
    timer: { ...timerState, ...TimerAction },
    tips,
    goMore,
    setLocal,
    getLocal,
    utils,
    sdk,
    setTitle
  };

  log.mi('allProps', allProps);

  if (path === '/home') setTitle('');

  return (
    <div
      className={`route-root  route-${getPathName(
        className,
        '-',
        false,
      )}`}
    >
      {detail && path === '/home' ? <DeviceDetail /> : null}
      <Component className={'HOME'} {...allProps} />
    </div>
  );
};

const getPathName = (path: string, split = '_', isUpperCase = true) => {
  const pathName = path.replace(/^\//, '').replace(/\//g, split);
  return isUpperCase
    ? pathName.toLocaleUpperCase()
    : pathName.toLocaleLowerCase();
};

export const Router = ({ route = [] as HashMap[], detail = true, ...routerProps }) => {
  const [state, action] = useDeviceInfo();
  const [context, setContextData] = useState({});
  const setContext = (key, val = true, isAppend = true) => {
    const isObject = typeof key === 'object';
    let data = isObject ? key : { [key]: val };
    if (isObject ? val : isAppend) {
      data = { ...context, ...data };
    }
    setContextData(data);
  };
  const autoDoControlDeviceData = (idOrDeviceData, value) => {
    let deviceData;
    if (typeof idOrDeviceData === 'string') {
      deviceData = { [idOrDeviceData]: value };
    } else {
      deviceData = idOrDeviceData;
    }
    action.doControlDeviceData(toLineObj(deviceData));
  };

  const { statusTip } = state;
  const isBluetoothDevice = true;
  const hasScf = /\/scf\//.test(location.href);
  let basename = env.isDev
    ? `${hasScf ? '/scf' : ''}/h5panel/developing`
    : `${hasScf ? '/scf' : ''}/h5panel`;
  if (isBluetoothDevice && env.isDev) {
    basename += '/live';
  }

  const PATH = {};
  route.forEach(({ path }) => {
    PATH[getPathName(path || '')] = path;
  });

  return statusTip ? (
    <StatusTip {...statusTip} fillContainer />
  ) : (
    <HashRouter basename={basename}>
      <Redirect exact from="/" to="/home"></Redirect>
      <Switch>
        {route.map(({ path, Component }, index) => (
          <Route
            key={index}
            path={path}
            render={() => (
              <div className={`category-root ${env.app} ${env.theme}`}>
                <PageComponent
                  className={path}
                  Component={Component}
                  {...routerProps}
                  {...state}
                  {...action}
                  context={context}
                  setContext={setContext}
                  autoDoControlDeviceData={autoDoControlDeviceData}
                  PATH={PATH}
                  path={path}
                  log={log}
                  env={env}
                  detail={detail}
                />
              </div>
            )}
          ></Route>
        ))}
      </Switch>
    </HashRouter>
  );
};
