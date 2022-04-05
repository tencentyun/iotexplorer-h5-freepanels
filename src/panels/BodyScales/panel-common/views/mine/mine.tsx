import React, { useState } from 'react';
import classNames from 'classnames';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { DatePicker } from 'antd-mobile';
import { ListPicker, ValuePicker } from '@components/business';
import { useHistory } from 'react-router';
import { Cell, Switch } from '@components/base';
import { getThemeType } from '@libs/theme';
import { apiControlDeviceData, onControlDevice, useDeviceData } from '@hooks/useDeviceData';
import { useUserInfo } from '@hooks/useUserInfo';
import { numberToArray, toggleBooleanByNumber } from '@libs/utillib';
import NickName from './nickName/nickName';
import Unit from './unit/unit';
import dayjs from 'dayjs';
import './mine.less';

import AvatarImage from '../icons/normal/avatar.svg';
import AvatarImageBlueWhite from '../icons/blue-white/avatar.svg';
import AvatarImageDark from '../icons/dark/avatar.svg';
import AvatarImageMorandi from '../icons/morandi/avatar.svg';

import EditImage from '../icons/normal/edit.svg';
import EditImageDark from '../icons/dark/edit.svg';
import EditImageMorandi from '../icons/morandi/edit.svg';

export function Mine() {
  const themeType = getThemeType();
  const avatarImageSrc = () => {
    switch (themeType) {
      case 'blueWhite':
        return AvatarImageBlueWhite;
      case 'dark':
        return AvatarImageDark;
      case 'colorful':
        return AvatarImageBlueWhite;
      case 'morandi':
        return AvatarImageMorandi;
      default:
        return AvatarImage;
    }
  };
  const editImageSrc = () => {
    switch (themeType) {
      case 'dark':
        return EditImageDark;
      case 'morandi':
        return EditImageMorandi;
      default:
        return EditImage;
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
  // 昵称
  const [unit, onUnit] = useState(false);
  const history = useHistory();
  const handleUnit = () =>
    // 单位跳转
    history.push('/unitSetting')
  ;
  const heightColumns = () => {
    const heightCols = numberToArray(250, 'cm');
    return [heightCols];
  };
  const weightColumns = () => {
    const weightCols = numberToArray(500, '千克');
    return [weightCols];
  };
  return (
    <article
      className={classNames(
        'mine',
        sdk.deviceData.power_switch === 0 && 'power-off',
      )}
    >
      <div id={'sacles_center'} className={classNames('sacles_center')}>
        <div className="card">
          <div className="card_span">
            <div className="card_top">
              <img
                className="card_top_img"
                src={avatarImageSrc()}
                width={134}
                height={151}
                alt=""
              />
              <div
                className="edit"
                onClick={() => {
                  onEditNickname(true);
                }}
              >
                {userInfo.nickName || '编辑昵称'}
                <img className="edit_img" src={editImageSrc()} alt="" />
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
          </div>
          <div>
            <Cell
              className="setting_title"
              title="性别"
              value={deviceData.gender ? (deviceData.gender == '0' ? '男' : '女') : '-'}
              valueStyle="gray"
              size="medium"
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
              className="setting_title"
              title="生日"
              // isLink={false}
              value={
                userInfo.birthday
                  ? dayjs(userInfo.birthday).format('YYYY-MM-DD')
                  : '-'
              }
              valueStyle="gray"
              size="medium"
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
              />
            </Cell>
            <Cell
              className="setting_title"
              title="身高"
              value={
                sdk.deviceData.height ? `${sdk.deviceData.height}cm` : '-'
              }
              valueStyle="gray"
              size="medium"
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
              className="setting_title"
              title="体重"
              value={sdk.deviceData.weight ? `${sdk.deviceData.weight}千克` : '-'}
              valueStyle="gray"
              size="medium"
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
            <Cell
              className="setting_title"
              title="单位"
              value=""
              valueStyle="gray"
              size="medium"
              onClick={() => {
                onUnit(true);
              }}
            />
            <Cell
              className="setting_title"
              title="运动员模式"
              isLink={false}
              value={
                <Switch
                  name={''}
                  theme={themeType}
                  checked={toggleBooleanByNumber(sdk.deviceData.player ? sdk.deviceData.player : 0)}
                  onChange={(value: boolean) => {
                    apiControlDeviceData({ player: value ? 1 : 0 });
                  }}
                />
              }
              valueStyle="gray"
              size="medium"
            />
            <Unit
              isShow={unit}
              onClose={() => {
                onUnit(false);
              }}
            />
          </div>
        </div>
      </div>
      <div id={'sacles_foot'} className={classNames('sacles_foot')}>
        <div className="sacles_foot_card">
          <div className="card_remark">
            <div>本产品的体脂计算以成年人为标准,当用户未满18岁时,</div>
            <div>在计算体脂数据时可能存在较大误差</div>
          </div>
        </div>
      </div>
    </article>
  );
}
