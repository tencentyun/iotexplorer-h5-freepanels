import React, { useState } from 'react';
import classNames from 'classnames';
import { Tabs } from '@components/business';
import { SvgIcon } from '@components/common';
import { Setting } from '../setting/setting';
import { Home } from '../home/home';
import './container.less';
const { TabPane } = Tabs;

export function Container() {
  const [activeKey, setActiveKey] = useState('training');

  return (
    <div className={classNames('app-container')}>
      <Tabs
        className="top-nav"
        activeKey={activeKey}
        onChange={(key: string) => setActiveKey(key)}
      >
        <TabPane
          title="首页"
          icon={<SvgIcon name="icon-home" />}
          key="training"
        >
          <Home />
        </TabPane>
        <TabPane
          title="设置"
          icon={<SvgIcon name="icon-setting" />}
          key="setting"
        >
          <Setting />
        </TabPane>
      </Tabs>
    </div>
  );
}
