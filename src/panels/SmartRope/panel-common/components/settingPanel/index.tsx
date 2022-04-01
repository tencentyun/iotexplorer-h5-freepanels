/*
 * @Author: wrq
 * @Date: 2021-09-19 17:15:33
 * @Description: 通用设置面板(表单需要改成可配置，且本地维护相关数据)
 */
import React, { useState } from 'react';
import { Dialog, Input, DatePicker } from 'antd-mobile';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { useDeviceData, onControlDevice, formatDeviceData } from '@hooks/useDeviceData';
import { useUserInfo } from '@hooks/useUserInfo';
import { Block } from '@components/layout';
import { Cell, Switch } from '@components/base';
import { ListPicker, ValuePicker } from '@components/business';
import { StyledProps } from '@libs/global';
import { SvgIcon } from '@components/common';
import { getThemeType } from '@libs/theme';

import { mapsToOptions } from '@libs/utillib';
import dayjs from 'dayjs';
import { SkinProps } from '../../skinProps';
import './style.less';

export interface SettingPannelProps extends StyledProps {
  // 表单字段
  fields?: object;
  options?: [];
  abc?: number;
}

interface DeviceMaps {
  gender: [];
  height: object;
  weight: object;
}

export const SettingPannel = (props: SettingPannelProps) => {
  const themeType = getThemeType();
  const CurrentSkinProps: any = SkinProps[themeType];
  const { className } = props;
  const [state] = useDeviceData(sdk);
  const deviceData = state.deviceData || {};
  // 从 sdk 读取到的物模型 maps
  const deviceMaps = formatDeviceData(state.templateMap) as DeviceMaps;
  const [userInfo, { onUpdateUserInfo }] = useUserInfo();

  // 昵称
  const [editNickname, onEditNickname] = useState('');
  // 性别选择器
  const [genderVisible, onToggleGender] = useState(false);
  // 生日选择器
  const [birthVisible, onToggleBirth] = useState(false);
  // 身高选择器
  const [heightVisible, onToggleHeight] = useState(false);
  // 体重选择器
  const [weightVisible, onToggleWeight] = useState(false);
  // 运动员模式
  const isPlayerMode = userInfo.playerMode === '1';

  // 获取性别描述文字
  const getGenderDesc = (type: string): string => {
    const { gender } = state.templateMap;
    if (gender) {
      return gender.define.mapping[type] || '';
    }
    return '';
  };
  // 获取度量字段
  const getUnitData = (name: string): string => {
    if (!deviceMaps[name]) return '';

    const unit: string = deviceMaps[name].unit || '';
    if (deviceData[name]) {
      return deviceData[name] + unit;
    }
    return '';
  };

  const getGenderDes = () => {
    if (deviceMaps.gender) {
      return deviceMaps.gender.map((t: any) => ({
        label: t.desc,
        value: t.name,
      }));
    }
    return [];
  };

  // 昵称编辑框
  const nicknameEditor = (
    <Input
      placeholder="请填写昵称"
      onChange={(val) => {
        onEditNickname(val);
      }}
    />
  );

  return (
    <div className={`component_business_setting-panel ${className}`}>
      <Block className="setting-block">
        <div className="panel-top">
          <SvgIcon name="icon-avatar" width={134} height={151} {...CurrentSkinProps.settingAvatar} />
          <div
            className="panel-nickname-edit-area"
            onClick={() => {
              Dialog.confirm({
                title: '编辑昵称',
                content: nicknameEditor,
                cancelText: '取消',
                confirmText: '完成',
                onConfirm: () => {
                  onControlDevice('nickName', editNickname);
                },
              });
            }}
          >
            <p>{userInfo.nickName || '编辑昵称'}</p>
            <SvgIcon className='edit' name="icon-edit" {...CurrentSkinProps.settingEdit} />
          </div>
        </div>

        <div className="setting-panel-body">
          <Cell
            title="性别"
            value={getGenderDesc(deviceData.gender)}
            onClick={() => {
              onToggleGender(true);
            }}
          >
            <ListPicker
              visible={genderVisible}
              title="性别"
              defaultValue={[deviceData.gender]}
              options={getGenderDes()}
              onCancel={() => onToggleGender(false)}
              onConfirm={(value) => {
                onControlDevice('gender', value[0]);
                onToggleGender(false);
              }}
            />
          </Cell>
          <Cell
            title="生日"
            value={
              userInfo.birthday
                ? dayjs(userInfo.birthday).format('YYYY-MM-DD')
                : '-'
            }
            onClick={() => onToggleBirth(true)}
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
            title="身高"
            value={getUnitData('height')}
            onClick={() => onToggleHeight(true)}
          >
            <ValuePicker
              visible={heightVisible}
              title="身高"
              value={[deviceData.height]}
              columns={[mapsToOptions('height', deviceMaps)]}
              onCancel={() => onToggleHeight(false)}
              onConfirm={(value) => {
                onControlDevice('height', +(value[0] || '0'));
                onToggleHeight(false);
              }}
            />
          </Cell>
          <Cell
            title="体重"
            value={getUnitData('weight')}
            valueStyle="gray"
            onClick={() => onToggleWeight(true)}
          >
            <ValuePicker
              visible={weightVisible}
              value={[deviceData.weight]}
              title="体重"
              columns={[mapsToOptions('weight', deviceMaps)]}
              onCancel={() => onToggleWeight(false)}
              onConfirm={(value) => {
                onControlDevice('weight', +(value[0] || '0'));
                onToggleWeight(false);
              }}
            />
          </Cell>
          <Cell
            title="运动员模式"
            desc="参与排行榜后，你的排名信息将公开给其他用户"
            isLink={false}
            value={
              <Switch
                name="mode"
                theme={themeType}
                checked={isPlayerMode}
                onChange={(val: boolean) => {
                  onUpdateUserInfo({ playerMode: val ? '1' : '0' });
                }}
              />
            }
          />
        </div>
      </Block>
    </div>
  );
};
