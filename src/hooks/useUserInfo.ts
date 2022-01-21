import { useReducer } from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { isObject } from 'lodash';
import CryptoJS from 'crypto-js';
// 秘钥
const SECRET_KEY = '*&^54783(246GD%$#';

export interface UserInfoState {
  id: string;
  // 运动员模式 0关闭 1开
  playerMode: '0' | '1';
}

// 加密
function encrypt(message: string): string {
  if (!message) {
    return message;
  }

  return CryptoJS.AES.encrypt(message, SECRET_KEY).toString();
}

// 解密
function decrypt(message: string): string {
  if (!message) {
    return message;
  }

  return CryptoJS.AES.decrypt(message, SECRET_KEY).toString(CryptoJS.enc.Utf8);
}

function reducer(
  state: UserInfoState,
  action: {
    type: string;
    payload: any;
  }
) {
  const { type, payload } = action;

  switch (type) {
    case 'update': {
      if (!isObject(payload)) {
        return state;
      }
      const info: any = state;
      if (payload.hasOwnProperty('id')) { // eslint-disable-line
        throw new Error('id is cannot update');
      }

      Object.keys(payload || {}).forEach(key => {
        info[key] = payload[key];
      });

      localStorage.setItem(`user_${state.id}`, encrypt(JSON.stringify(info)));

      return {
        ...state,
        ...info
      };
    }
  }

  return state;
}

function initState() {
  const { UserID, NickName, Email } = sdk.userInfo;
  const userInfo: object = {
    id: UserID,
    nickName: NickName,
    email: Email,
    playerMode: '0'
  };

  const localCache = localStorage.getItem(`user_${UserID}`);
  if (localCache) {
    try {
      const info = JSON.parse(decrypt(localCache));

      return info;
    } catch (err) {
      console.error('parse local userinfo error', err);
      return userInfo;
    }
  }

  return userInfo;
}

export function useUserInfo() {
  const [state, dispatch] = useReducer(reducer, null, initState);

  const onUpdateUserInfo = (info: object) => {
    dispatch({
      type: 'update',
      payload: info
    });
  };

  return [
    state,
    {
      onUpdateUserInfo
    }
  ];
}
