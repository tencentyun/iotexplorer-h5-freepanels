/*
 * @Author: wrq
 * @Date: 2021-09-20 22:48:41
 * @Description: 首页内容
 */
import React, { useState } from 'react';
import classNames from 'classnames';
import { Tabs } from '@components/business';
import { SvgIcon } from '@components/common';
import { Setting } from '../../views/setting';
import { Data } from '../../views/data';
import { Home } from '../../views/home';
import { getThemeType } from '@libs/theme';
import { ThemeType } from '@libs/global';
import { SkinProps } from '../../skinProps';
const { TabPane } = Tabs;

export function Container() {
  const theme: ThemeType = getThemeType();
  const CurrentSkinProps: any = SkinProps[theme];
  const [activeKey, setActiveKey] = useState('training');

  return (
    <div className={classNames('app-container')}>
      <Tabs
        className="top-nav"
        activeKey={activeKey}
        position={theme === 'dark' ? 'bottom' : 'top'}
        onChange={(key: string) => setActiveKey(key)}
      >
        <TabPane
          title="训练"
          icon={<SvgIcon name="icon-home" {...CurrentSkinProps['home'][activeKey == 'training' ? 'active' : 'default']}/>}
          key="training"
        >
          <Home />
        </TabPane>
        <TabPane
          title="数据"
          icon={<SvgIcon name="icon-data"  {...CurrentSkinProps['data'][activeKey == 'data' ? 'active' : 'default']}/>}
          key="data"
        >
          <Data />
        </TabPane>
        <TabPane
          title="设置"
          icon={<SvgIcon name="icon-setting"  {...CurrentSkinProps['setting'][activeKey == 'setting' ? 'active' : 'default']}/>}
          key="setting"
        >
          <Setting />
        </TabPane>
      </Tabs>
    </div>
  );
}
