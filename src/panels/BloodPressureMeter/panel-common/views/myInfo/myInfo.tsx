import React, { useState } from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { DatePicker } from 'antd-mobile';
import classNames from 'classnames';
import { Cell } from '@components/base';
import { ListPicker, ValuePicker } from '@components/business';
import { getThemeType } from '@libs/theme';
import { onControlDevice, useDeviceData } from '@hooks/useDeviceData';
import { useUserInfo } from '@hooks/useUserInfo';
import { numberToArray } from '@libs/utillib';
import NickName from './nickName/nickName';
import './myInfo.less';

import HeadImage from '../icons/normal/head.svg';
import HeadImageBlueWhite from '../icons/blue-white/head.svg';
import HeadImageDark from '../icons/normal/head-white.svg';
import HeadImageMorandi from '../icons/morandi/head.svg';

import RedactImage from '../icons/normal/redact.svg';
import RedactImageDark from '../icons/dark/redact.svg';
import RedactImageMorandi from '../icons/morandi/redact.svg';
import dayjs from 'dayjs';

export function MyInfo() {
  const themeType = getThemeType();

  const headImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return HeadImage;
      case 'blueWhite':
        return HeadImageBlueWhite;
      case 'dark':
        return HeadImageDark;
      case 'colorful':
        return HeadImageBlueWhite;
      case 'morandi':
        return HeadImageMorandi;
      default:
        return HeadImageBlueWhite;
    }
  };
  const redactImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return RedactImage;
      case 'dark':
        return RedactImageDark;
      case 'morandi':
        return RedactImageMorandi;
      default:
        return RedactImage;
    }
  };
  const [state] = useDeviceData(sdk);
  const deviceData = state.deviceData || {};
  // 从 sdk 读取到的物模型 maps
  const [userInfo, { onUpdateUserInfo }] = useUserInfo();
  // 昵称
  const [editNickname, onEditNickname] = useState(false);
  // 性别选择器
  const [genderVisible, onToggleGender] = useState(false);
  // 生日选择器
  const [birthVisible, onToggleBirth] = useState(false);
  // 身高选择器
  const [heightVisible, onToggleHeight] = useState(false);
  // 体重选择器
  const [weightVisible, onToggleWeight] = useState(false);
  const heightColumns = () => {
    const heightCols = numberToArray(250, 'cm');
    return [heightCols];
  };
  const weightColumns = () => {
    const weightCols = numberToArray(500, '千克');
    return [weightCols];
  };
  return (
    <article className={classNames('my-detail')}>
      <ul>
        <li className="list-item">
          <div className="my-head">
            <img className="head-name" src={headImageSrc()} alt="昵称" />
            <div
              className="head-redact"
              onClick={() => {
                onEditNickname(true);
              }}
            >
              {userInfo.nickName || '编辑昵称'}
              <img src={redactImageSrc()} alt="编辑昵称" />
            </div>
          </div>
          <NickName
            isShow={editNickname}
            onClose={(value) => {
              if (value != '') {
                onUpdateUserInfo({ nickName: value });
              }
              onEditNickname(false);
            }}
          />
          <Cell
            size="medium"
            title="性别"
            value={deviceData.gender == '1' ? '女' : '男'}
            valueStyle="gray"
            onClick={() => {
              onToggleGender(true);
            }}
          >
            <ListPicker
              visible={genderVisible}
              title="性别"
              defaultValue={[deviceData.gender]}
              options={[
                {
                  label: '男',
                  value: '0',
                },
                {
                  label: '女',
                  value: '1',
                },
              ]}
              onCancel={() => onToggleGender(false)}
              onConfirm={(value) => {
                onControlDevice('gender', value[0]);
                onToggleGender(false);
              }}
            />
          </Cell>
          <Cell
            size="medium"
            title="生日"
            value={
              userInfo.birthday
                ? dayjs(userInfo.birthday).format('YYYY-MM-DD')
                : '-'
            }
            valueStyle="gray"
            onClick={() => {
              onToggleBirth(true);
            }}
          >
            <DatePicker
              visible={birthVisible}
              onClose={() => onToggleBirth(false)}
              onConfirm={(value) => {
                onUpdateUserInfo({ birthday: dayjs(value).valueOf() });
              }}
            ></DatePicker>
          </Cell>
          <Cell
            size="medium"
            title="身高"
            value={
              sdk.deviceData.height ? `${sdk.deviceData.height}cm` : '-'
            }
            valueStyle="gray"
            onClick={() => {
              onToggleHeight(true);
            }}
          >
            <ValuePicker
              visible={heightVisible}
              title="身高"
              value={[sdk.deviceData.height ? `${sdk.deviceData.height}cm` : '100cm']}
              columns={heightColumns}
              onCancel={() => onToggleHeight(false)}
              onConfirm={(value) => {
                let height = value[0];
                if (height != null) {
                  height = height.substr(0, height.length - 2);
                }
                onControlDevice('height', height);
                onToggleHeight(false);
              }}
            />
          </Cell>
          <Cell
            size="medium"
            title="体重"
            value={
              sdk.deviceData.weight ? `${sdk.deviceData.weight}千克` : '-'
            }
            valueStyle="gray"
            onClick={() => {
              onToggleWeight(true);
            }}
          >
            <ValuePicker
              visible={weightVisible}
              value={[sdk.deviceData.weight ? `${sdk.deviceData.weight}千克` : '45千克']}
              title="体重"
              columns={weightColumns}
              onCancel={() => onToggleWeight(false)}
              onConfirm={(value) => {
                let weight = value[0];
                if (weight != null) {
                  weight = weight.substr(0, weight.length - 2);
                }
                onControlDevice('weight', weight);
                onToggleWeight(false);
              }}
            />
          </Cell>
        </li>
      </ul>
    </article>
  );
}
