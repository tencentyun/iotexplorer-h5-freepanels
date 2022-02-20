import React, { useState } from 'react';
import classNames from 'classnames';
import { Tabs } from '@components/business';
import { SvgIcon } from '@components/common';
import { getThemeType } from '@libs/theme';
import { Home } from '../home/home';
import { Mine } from '../mine/mine';
import { Recording } from '../recording/recording';
import './container.less';

const { TabPane } = Tabs;
export function Container() {
  const themeType = getThemeType();
  const [activeKey, setActiveKey] = useState('mine');
  const measureImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return (
          <SvgIcon
            name="icon-body-scales-measurement-normal"
            width={40}
            height={40}
          />
        );
      case 'blueWhite':
        return (
          <SvgIcon
            name="icon-body-scales-measurement-blueWhite"
            width={40}
            height={40}
            color="#000"
          />
        );
      case 'dark':
        return (
          <SvgIcon
            name="icon-body-scales-measurement-dark"
            width={40}
            height={40}
            color="#000"
          />
        );
      case 'colorful':
        return (
          <SvgIcon
            name="icon-body-scales-measurement-colorful"
            width={40}
            height={40}
            color="#000"
          />
        );
      case 'morandi':
        return (
          <SvgIcon
            name="icon-body-scales-measurement-morandi"
            width={40}
            height={40}
          />
        );
      default:
        return (
          <SvgIcon
            name="icon-body-scales-measurement-normal"
            width={40}
            height={40}
          />
        );
    }
  };
  const recordImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return (
          <SvgIcon
            name="icon-body-scales-recording-normal"
            width={40}
            height={40}
          />
        );
      case 'blueWhite':
        return (
          <SvgIcon
            name="icon-body-scales-recording-blueWhite"
            width={40}
            height={40}
            color="#000"
          />
        );
      case 'dark':
        return (
          <SvgIcon
            name="icon-body-scales-recording-dark"
            width={40}
            height={40}
            color="#000"
          />
        );
      case 'colorful':
        return (
          <SvgIcon
            name="icon-body-scales-recording-colorful"
            width={40}
            height={40}
            color="#000"
          />
        );
      case 'morandi':
        return (
          <SvgIcon
            name="icon-body-scales-recording-morandi"
            width={40}
            height={40}
          />
        );
      default:
        return (
          <SvgIcon
            name="icon-body-scales-recording-normal"
            width={40}
            height={40}
          />
        );
    }
  };
  const mineImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return (
          <SvgIcon name="icon-body-scales-mine-normal" width={40} height={40} />
        );
      case 'blueWhite':
        return (
          <SvgIcon
            name="icon-body-scales-mine-blueWhite"
            width={40}
            height={40}
            color="#000"
          />
        );
      case 'dark':
        return (
          <SvgIcon
            name="icon-body-scales-mine-dark"
            width={40}
            height={40}
            color="#000"
          />
        );
      case 'colorful':
        return (
          <SvgIcon
            name="icon-body-scales-mine-colorful"
            width={40}
            height={40}
            color="#000"
          />
        );
      case 'morandi':
        return (
          <SvgIcon
            name="icon-body-scales-mine-morandi"
            width={40}
            height={40}
          />
        );
      default:
        return (
          <SvgIcon
            name="icon-body-scales-mine-normal"
            width={40}
            height={40}
          />
        );
    }
  };
  return (
    <div className={classNames('app-container')}>
      <Tabs
        className="top-nav"
        activeKey={activeKey}
        onChange={(key: string) => setActiveKey(key)}
      >
        <TabPane
          title="测量"
          icon={
            activeKey === 'measure' ? (
              measureImageSrc()
            ) : (
              <SvgIcon
                name="icon-body-scales-measurement-close-normal"
                width={40}
                height={40}
              />
            )
          }
          key="measure"
        >
          <Home />
        </TabPane>
        <TabPane
          title="记录"
          icon={
            activeKey === 'record' ? (
              recordImageSrc()
            ) : (
              <SvgIcon
                name="icon-body-scales-recording-close-normal"
                width={40}
                height={40}
              />
            )
          }
          key="record"
        >
          <Recording />
        </TabPane>
        <TabPane
          title="我的"
          icon={
            activeKey === 'mine' ? (
              mineImageSrc()
            ) : (
              <SvgIcon
                name="icon-body-scales-mine-close-normal"
                width={40}
                height={40}
              />
            )
          }
          key="mine"
        >
          <Mine />
        </TabPane>
      </Tabs>
    </div>
  );
}
