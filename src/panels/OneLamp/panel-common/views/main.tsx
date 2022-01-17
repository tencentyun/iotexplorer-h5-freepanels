import React, { useState } from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { Tabs } from '@components/business';
import { SvgIcon } from '@components/common';
import { White } from './view-white';
import { Scene } from './view-scene';
import {getThemeType} from '@libs/theme';
const { TabPane } = Tabs;

export function Main() {
  const themeType = getThemeType();
  const [activeKey, setActiveKey] = useState('white');

  const whiteImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return (
          <SvgIcon
            name="icon-white-normal"
            width={45}
            height={45}
            color="#000"
          />
        );
      case 'blueWhite':
        return (
          <SvgIcon name="icon-white-blue" width={45} height={45} color="#000" />
        );
      case 'dark':
        return (
          <SvgIcon name="icon-white-dark" width={45} height={45} color="#000" />
        );
      case 'colorful':
        return (
          <SvgIcon name="icon-white-blue" width={45} height={45} color="#000" />
        );
      case 'morandi':
        return (
          <SvgIcon
            name="icon-white-morandi"
            width={45}
            height={45}
            color="#000"
          />
        );
      default:
        return (
          <SvgIcon
            name="icon-white-normal"
            width={45}
            height={45}
            color="#000"
          />
        );
    }
  };
  const sceneImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return (
          <SvgIcon
            name="icon-scene-normal"
            width={45}
            height={45}
            color="#000"
          />
        );
      case 'blueWhite':
        return (
          <SvgIcon name="icon-scene-blue" width={45} height={45} color="#000" />
        );
      case 'dark':
        return (
          <SvgIcon name="icon-scene-dark" width={45} height={45} color="#000" />
        );
      case 'colorful':
        return (
          <SvgIcon name="icon-scene-blue" width={45} height={45} color="#000" />
        );
      case 'morandi':
        return (
          <SvgIcon
            name="icon-scene-morandi"
            width={45}
            height={45}
            color="#000"
          />
        );
      default:
        return (
          <SvgIcon
            name="icon-scene-normal"
            width={45}
            height={45}
            color="#000"
          />
        );
    }
  };
  return (
    <Tabs
      className="top-nav"
      activeKey={activeKey}
      onChange={(key: string) => {
        if (sdk.deviceData.power_switch === 1) {
          setActiveKey(key);
        }
      }}
    >
      <TabPane
        title="白光"
        icon={
          activeKey === 'white' ? (
            whiteImageSrc()
          ) : (
            <SvgIcon
              name="icon-white-default"
              width={45}
              height={45}
              color="#000"
            />
          )
        }
        key="white"
      >
        <White />
      </TabPane>
      <TabPane
        title="情景"
        icon={
          activeKey === 'scene' ? (
            sceneImageSrc()
          ) : (
            <SvgIcon
              name="icon-scene-default"
              width={45}
              height={45}
              color="#000"
            />
          )
        }
        key="scene"
      >
        <Scene />
      </TabPane>
    </Tabs>
  );
}
