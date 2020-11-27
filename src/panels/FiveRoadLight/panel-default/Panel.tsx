import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { Tabs } from '@components/Tabs';
import { UseDeviceInfoHandler, UserDeviceInfoData } from '@hooks/useDeviceInfo';
// import { WhiteLightTab, ColorLightTab, SceneTab } from './Tabs';
import { FreePanelLayout, getFooterHeight } from '@components/FreePanelLayout';
// import { CountDownId, getCountdownStr, WorkModeId } from '../constants';
import { PanelMoreBtn } from '@components/PanelMoreBtn';
import lightLogo from './images/light.svg';
import { CountDownId, WorkModeId } from './constants';
import { getCountdownStr } from "@components/FuncFooter";
import { PanelComponentProps } from "@src/entryWrap";
import { px2rem, rpx2px, rpx2rem } from "@utillib";
import { ColorLightTab, SceneTab, WhiteLightTab } from './Tabs';
import './Panel.less';

export interface TabProps extends UserDeviceInfoData, UseDeviceInfoHandler {
  margin?: number;
}

enum WorkMode {
  WhiteLight,
  ColorLight,
  Scene,
}

export function Panel({
  deviceInfo,
  productInfo,
  templateMap,
  deviceData,
  offline,
  powerOff,
  doControlDeviceData,
  onGoTimingProject,
  onGoDeviceDetail,
  isShareDevice,
}: PanelComponentProps) {
  const [currentTab, setCurrentTab] = useState<WorkMode>(WorkMode.WhiteLight);
  const footerHeight = useMemo(() => getFooterHeight(), []);
  const tabContentHeight = useMemo(() => {
    const { clientHeight } = document.documentElement;

    return px2rem(clientHeight - rpx2px(footerHeight) - rpx2px(90));
  }, [footerHeight]);
  //
  const tabProps: TabProps = {
    deviceInfo,
    productInfo,
    templateMap,
    deviceData,
    offline,
    powerOff,
    doControlDeviceData,
  };

  useEffect(() => {
    if (typeof deviceData[WorkModeId] !== 'undefined') {
      setCurrentTab(deviceData[WorkModeId]);
    }
  }, [deviceData[WorkModeId]]);

  const tabList = [
    {
      tabKey: WorkMode.WhiteLight,
      component: <WhiteLightTab {...tabProps} />,
    },
    {
      tabKey: WorkMode.ColorLight,
      component: <ColorLightTab {...tabProps} />,
    },
    {
      tabKey: WorkMode.Scene,
      component: <SceneTab {...tabProps} />,
    },
  ];

  return (
    <FreePanelLayout
      darkMode
      className={classNames('free-light-page', {
        'power-off': powerOff,
      })}
      isShareDevice={isShareDevice}
      title={deviceInfo.displayName}
      doControlDeviceData={doControlDeviceData}
      offline={offline}
      powerOff={powerOff}
      deviceData={deviceData}
      onGoTimingProject={onGoTimingProject}
    >
      {powerOff ? (
        <PowerOffPlaceHolder
          onGoDeviceDetail={onGoDeviceDetail}
          placeholder={
            (!offline && deviceData[CountDownId] && deviceData[CountDownId] > 0)
              ? getCountdownStr(deviceData[CountDownId], powerOff)
              : null
          }
        />
      ) : (
        <Tabs
          activeColor='#fff'
          style={{ background: 'none' }}
          tabList={[
            { key: WorkMode.WhiteLight, label: '白光' },
            { key: WorkMode.ColorLight, label: '彩光' },
            { key: WorkMode.Scene, label: '场景' },
          ]}
          currentTab={currentTab}
          onTabChange={tabKey => doControlDeviceData(WorkModeId, tabKey)}
        >
          <PanelMoreBtn
            style={{ top: rpx2rem(90) }}
            onClick={onGoDeviceDetail}
            theme='dark'
          />

          {tabList.map(item => (
            <Tabs.Panel
              key={item.tabKey}
              tabKey={item.tabKey}
              currentTab={currentTab}
              keepAlive={false}
              className="clearfix"
              style={{
                height: tabContentHeight,
              }}
            >
              {item.component}
            </Tabs.Panel>
          ))}

          {deviceData[CountDownId] > 0 && (
            <div
              className='countdown-fixed-footer'
              style={{
                // bottom: footerHeight + rpx2px(32),
              }}
            >
              {getCountdownStr(deviceData[CountDownId], powerOff)}
            </div>
          )}
        </Tabs>
      )}
    </FreePanelLayout>
  );
}

const PowerOffPlaceHolder = ({
  placeholder,
  onGoDeviceDetail,
}: {
  placeholder?: string | React.ReactNode;
  onGoDeviceDetail?: () => any;
}) => (
  <div className='power-off-placeholder'>
    <PanelMoreBtn
      onClick={onGoDeviceDetail}
      theme='dark'
    />
    <img
      className='power-off-logo'
      src={lightLogo}
    />
    <div className='power-off-placeholder-content'>
      {placeholder}
    </div>
  </div>
);
