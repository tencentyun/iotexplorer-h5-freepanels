/*
 * @Author: wrq
 * @Date: 2021-09-19 15:22:09
 * @Description: 设置页
 */
import React from 'react';
import { Block } from '../../../components/layout';
import { SettingPannel } from '../components/settingPanel';
import styled from 'styled-components';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { SvgIcon } from '@/components/common';
import { getThemeType } from '@/business';
import { ThemeType } from '@/global';
import { CurrentSkinProps } from '../skinProps';
import './setting.less';

export function Setting() {
  const theme: ThemeType = getThemeType();

  return (
    <main className="setting-view">
      <SettingPannel className="setting-main" />

      {/* 底部 */}
      <Block className="setting-footer">
        <SvgIcon name="icon-medal" width={108} height={121} {...CurrentSkinProps.medal}/>
        <p className="target-tip">每日跳绳目标次数</p>
        <span className="target-value">{sdk.deviceData.target_count || 0}</span>
      </Block>
    </main>
  );
}
