import React, { useState } from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import classNames from 'classnames';
import { Tabs } from '@components/business';
import { SvgIcon } from '@components/common';
import { Setting } from '../setting/setting';
import { Home } from '../home/home';
import './container.less';
import { onControlDevice } from '@hooks/useDeviceData';
const { TabPane } = Tabs;

export function Container() {
  const [activeKey, setActiveKey] = useState(sdk.deviceData.activeKey ? sdk.deviceData.activeKey : 'training');
  const handleSetting = () => {
    sdk.goDeviceDetailPage({});
  };
  return (
    <div className={classNames('app-container')}>
      <Tabs
        className="top-nav"
        activeKey={activeKey}
        position="top"
        onChange={(key: string) => {
          setActiveKey(key);
          onControlDevice('activeKey', key);
        }}
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
        <TabPane
          title=""
          icon={<SvgIcon name="icon-dev-setting-close" />}
          key="dev-setting"
        >
        </TabPane>
      </Tabs>
      <div className="devSetting" onClick={handleSetting}/>
    </div>
  );
}
