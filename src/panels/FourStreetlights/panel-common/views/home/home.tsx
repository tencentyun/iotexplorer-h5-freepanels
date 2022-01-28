import React, {useState} from 'react';
import classNames from 'classnames';
import './home.less';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import {SvgIcon} from '@components/common/icon';
import {Content} from './content/content';
import {ScenarioContent} from './scenario-content/scenario_content';
import {Progress_bar} from './progress-bar/progress_bar';
import {Scenario_progress_bar} from './scenario-progress-bar/scenario_progress_bar';
import {Buttom} from './buttom/buttom';
import { getThemeType } from '@libs/theme';
import {onControlDevice} from '@hooks/useDeviceData';
import {LightSwitch} from "@components/business";

export function Home() {
  const themeType = getThemeType();
  const [stateFlag, onToggleStateFlag] = useState(0);

  const onClickLeft = () => {
    onToggleStateFlag(0);
    onControlDevice('work_mode', '0');
  };
  const onClickMiddle = () => {
    onToggleStateFlag(1);
    onControlDevice('work_mode', '1');
  };
  const onClickRight = () => {
    onToggleStateFlag(2);
    onControlDevice('work_mode', '2');
  };

  const getMenu = () => {
    return (<div id={'menu'} className={classNames('menu')}>
      <div className="menu_left" onClick={onClickLeft}>
        <SvgIcon
          name={stateFlag == 0 && 'icon-four-bw-whitemode-' + themeType || 'icon-four-bw-whitemode-' + themeType + '1'}
          color="#000000" width={40} height={40}/>
        <div id={'menu-left-font'}
             className={classNames("menu_left_font", "menu_font", stateFlag == 0 && "select_font_color" || "")}>白光
        </div>
      </div>

      <div className="menu_center" onClick={onClickMiddle}>
        <SvgIcon
          name={stateFlag == 1 && 'icon-four-bw-coloredmode-' + themeType || 'icon-four-bw-coloredmode-' + themeType + '1'}
          color="#000000" width={40} height={40}/>
        <div id={'menu-center-font'}
             className={classNames("menu_center_font", "menu_font", stateFlag == 1 && "select_font_color" || "")}>彩光
        </div>
      </div>

      <div className="menu_right" onClick={onClickRight}>
        <SvgIcon name={stateFlag == 2 && 'icon-four-bw-scene-' + themeType || 'icon-four-bw-scene-' + themeType + '1'}
                 color="#000000" width={40} height={40}/>
        <div id={'menu-right-font'}
             className={classNames("menu_right_font", "menu_font", stateFlag == 2 && "select_font_color" || "")}>场景
        </div>
      </div>
    </div>)
  }

  const getHomePage = () => {
    if (themeType == 'normal' || themeType == 'colorful') {
      return (
        <article id={'home'} className={classNames('home', sdk.deviceData.power_switch != 1 && 'power-off')}>
          {getMenu()}
          <div id={'white-light-body'} className={classNames(stateFlag != 0 && 'vhide' || "")}>
            <LightSwitch
              defaultValue={sdk.deviceData.brightness ? sdk.deviceData.brightness / 100 : 0.4}
              disable={sdk.deviceData.power_switch === 1 ? 1 : 0}
              onChange={(value: any) => {
                if (sdk.deviceData.power_switch === 1){
                  onControlDevice('brightness', value.toFixed(2) * 100);
                }
              }}
            />
          </div>
          <div id={'colorful-body'} className={classNames(stateFlag != 1 && 'vhide' || "")}>
            <Content/>
          </div>
          <div id={'colorful-progress'} className={classNames(stateFlag != 1 && 'vhide' || "")}>
            <Progress_bar/>
          </div>
          <div id={'scenario-body'} className={classNames(stateFlag != 2 && 'vhide' || "")}>
            <ScenarioContent/>
          </div>
          <div id={'scenario-progress'} className={classNames(stateFlag != 2 && 'vhide' || "")}>
            <Scenario_progress_bar/>
          </div>
          <Buttom/>
        </article>)
    } else if (themeType == 'morandi') {
      return (
        <article id={'home'} className={classNames('home', sdk.deviceData.power_switch != 1 && 'power-off')}>
          <div className={classNames('body_card')}>
            <div id={'white-light-body'} className={classNames(stateFlag != 0 && 'vhide' || "")}>
              <LightSwitch
                defaultValue={sdk.deviceData.brightness ? sdk.deviceData.brightness / 100 : 0.8}
                disable={sdk.deviceData.power_switch === 1 ? 1 : 0}
                onChange={(value: any) => {
                  if (sdk.deviceData.power_switch === 1){
                    onControlDevice('brightness', value.toFixed(2) * 100);
                  }
                }}
              />
            </div>
            <div id={'colorful-body'} className={classNames(stateFlag != 1 && 'vhide' || "")}>
              <Content/>
            </div>
            <div id={'colorful-progress'} className={classNames(stateFlag != 1 && 'vhide' || "")}>
              <Progress_bar/>
            </div>
            <div id={'scenario-body'} className={classNames(stateFlag != 2 && 'vhide' || "")}>
              <ScenarioContent/>
            </div>
            <div id={'scenario-progress'} className={classNames(stateFlag != 2 && 'vhide' || "")}>
              <Scenario_progress_bar/>
            </div>
          </div>
          <Buttom/>
          {getMenu()}
        </article>)
    } else {
      return (
        <article id={'home'} className={classNames('home', sdk.deviceData.power_switch != 1 && 'power-off')}>
          <div className={classNames('body_card')}>
            <div id={'white-light-body'} className={classNames(stateFlag != 0 && 'vhide' || "")}>
              <LightSwitch
                defaultValue={sdk.deviceData.brightness ? sdk.deviceData.brightness / 100 : 0.4}
                disable={sdk.deviceData.power_switch === 1 ? 1 : 0}
                onChange={(value: any) => {
                  if (sdk.deviceData.power_switch === 1){
                    onControlDevice('brightness', value.toFixed(2) * 100);
                  }
                }}
              />
            </div>
            <div id={'colorful-body'} className={classNames(stateFlag != 1 && 'vhide' || "")}>
              <Content/>
            </div>
            <div id={'colorful-progress'} className={classNames(stateFlag != 1 && 'vhide' || "")}>
              <Progress_bar/>
            </div>
            <div id={'scenario-body'} className={classNames(stateFlag != 2 && 'vhide' || "")}>
              <ScenarioContent/>
            </div>
            <div id={'scenario-progress'} className={classNames(stateFlag != 2 && 'vhide' || "")}>
              <Scenario_progress_bar/>
            </div>
          </div>
          <Buttom/>
          {getMenu()}
        </article>)
    }
  }
  return (
    getHomePage()
  );
}

export default Home;

