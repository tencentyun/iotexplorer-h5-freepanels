import React, {useState} from 'react';
import classNames from 'classnames';
import './home.less';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import {getThemeType} from '@libs/theme';
import {onControlDevice} from '@hooks/useDeviceData';
import {WhiteLightDisplay} from './white-light-display/white-light-display';
import {ColoredLightDisplay} from './colored-light-display/colored-light-display';
import {ScenarioDisplay} from './scenario-display/scenario-display';
import {Scenario_progress_bar} from './scenario-progress-bar/scenario_progress_bar';
import {SvgIcon} from '@components/common/icon';
import {LightBright} from '@components/business/light-bright/light-bright';
import {Light_temperature} from './temperature/temperature';
import {Buttom} from './buttom/buttom';

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
  const changeBrightness = (val, touchEnd) => {
    if (touchEnd) {
      onControlDevice('brightness', val);
    }
  }

  const getMenu = () => {
    return (
      <div id={'menu'} className={classNames('menu')}>
        <div className="menu_left" onClick={onClickLeft}>
          <SvgIcon
            name={sdk.deviceData.power_switch != 1 && ('icon-five-bw-whitemode-' + themeType + '1') || (stateFlag == 0 && 'icon-five-bw-whitemode-' + themeType || 'icon-five-bw-whitemode-' + themeType + '2')}
            color="#000000" width={50} height={50}/>
          {/* <div id={'menu-left-font'} className={classNames(sdk.deviceData.power_switch != 1 && "menu_left_font" || (stateFlag==0 &&"select_font_color"||""))}>白光</div> */}
          <div id={'menu-left-font'}
               className={classNames("menu_left_font", stateFlag == 0 && "select_font_color" || "")}>白光
          </div>

        </div>

        <div className="menu_center" onClick={onClickMiddle}>
          <SvgIcon
            name={sdk.deviceData.power_switch != 1 && ('icon-five-bw-coloredmode-' + themeType + '1') || (stateFlag == 1 && 'icon-five-bw-coloredmode-' + themeType || 'icon-five-bw-coloredmode-' + themeType + '2')}
            color="#000000" width={50} height={50}/>

          {/* <SvgIcon name={stateFlag==1 && 'icon-five-bw-coloredmode-'+ themeType || 'icon-five-bw-coloredmode-' + themeType + '2'} color="#000000" width={65} height={65}/> */}
          <div id={'menu-center-font'}
               className={classNames("menu_center_font", stateFlag == 1 && "select_font_color" || "")}>彩光
          </div>
        </div>

        <div className="menu_right" onClick={onClickRight}>
          <SvgIcon
            name={sdk.deviceData.power_switch != 1 && ('icon-five-bw-scene-' + themeType + '1') || (stateFlag == 2 && 'icon-five-bw-scene-' + themeType || 'icon-five-bw-scene-' + themeType + '2')}
            color="#000000" width={50} height={50}/>

          {/* <SvgIcon name={stateFlag==2 && 'icon-five-bw-scene-'+ themeType || 'icon-five-bw-scene-'+ themeType + '2'} color="#000000" width={65} height={65}/> */}
          <div id={'menu-right-font'}
               className={classNames("menu_right_font", stateFlag == 2 && "select_font_color" || "")}>场景
          </div>
        </div>
      </div>
    )
  }

  const getMenuOrdinary = () => {
    return (
      <div id={'menu'} className={classNames('menu')}>
        <div className="menu_left" onClick={onClickLeft}>
          <SvgIcon
            name={sdk.deviceData.power_switch != 1 && ('icon-five-bw-whitemode-' + themeType + '2') || (stateFlag == 0 && 'icon-five-bw-whitemode-' + themeType || 'icon-five-bw-whitemode-' + themeType + '2')}
            color="#000000" width={50} height={50}/>
          <div id={'menu-left-font'}
               className={classNames("menu_left_font", stateFlag == 0 && "select_font_color" || "")}>白光
          </div>
        </div>

        <div className="menu_center" onClick={onClickMiddle}>
          <SvgIcon
            name={sdk.deviceData.power_switch != 1 && ('icon-five-bw-coloredmode-' + themeType + '2') || (stateFlag == 1 && 'icon-five-bw-coloredmode-' + themeType || 'icon-five-bw-coloredmode-' + themeType + '2')}
            color="#000000" width={50} height={50}/>

          {/* <SvgIcon name={stateFlag==1 && 'icon-five-bw-coloredmode-'+ themeType || 'icon-five-bw-coloredmode-' + themeType + '2'} color="#000000" width={65} height={65}/> */}
          <div id={'menu-center-font'}
               className={classNames("menu_center_font", stateFlag == 1 && "select_font_color" || "")}>彩光
          </div>
        </div>

        <div className="menu_right" onClick={onClickRight}>
          <SvgIcon
            name={sdk.deviceData.power_switch != 1 && ('icon-five-bw-scene-' + themeType + '2') || (stateFlag == 2 && 'icon-five-bw-scene-' + themeType || 'icon-five-bw-scene-' + themeType + '2')}
            color="#000000" width={50} height={50}/>

          {/* <SvgIcon name={stateFlag==2 && 'icon-five-bw-scene-'+ themeType || 'icon-five-bw-scene-'+ themeType + '2'} color="#000000" width={65} height={65}/> */}
          <div id={'menu-right-font'}
               className={classNames("menu_right_font", stateFlag == 2 && "select_font_color" || "")}>场景
          </div>
        </div>
      </div>
    )
  }
  const getHomePage = () => {
    if (themeType == 'normal' || themeType == 'colorful') {
      return (
        <article id={'home'} className={classNames('home', sdk.deviceData.power_switch != 1 && 'power-off')}>
          {getMenuOrdinary()}
          {/* 白光 */}
          <div className={classNames(stateFlag != 0 && 'vhide' || "")}>
            <WhiteLightDisplay/>
          </div>
          {/* 彩光 */}
          <div className={classNames(stateFlag != 1 && 'vhide' || "")}>
            <ColoredLightDisplay/>
          </div>
          {/* 场景 */}
          <div className={classNames(stateFlag != 2 && 'vhide' || "")}>
            <ScenarioDisplay/>
          </div>
          <div className={classNames(stateFlag == 2 && 'vhide' || "")}>
            <article id={'lightbright'} className={classNames('lightbright')}>
              <LightBright defaultValue={sdk.deviceData.brightness ? sdk.deviceData.brightness : 80}
                           onChange={changeBrightness}/>
            </article>
          </div>

          <div className={classNames(stateFlag != 1 && 'vhide' || "")}>
            <Light_temperature/>
          </div>
          <div className={classNames(stateFlag != 2 && 'vhide' || "")}>
            <Scenario_progress_bar/>
          </div>
          < Buttom/>

        </article>
      )
    } else if (themeType == 'dark' || themeType == 'morandi') {
      return (
        <article id={'home'} className={classNames('home', sdk.deviceData.power_switch != 1 && 'power-off')}>
          {/* 白光 */}
          <div className={classNames(stateFlag != 0 && 'vhide' || "")}>
            <WhiteLightDisplay/>
          </div>
          {/* 彩光 */}
          <div className={classNames(stateFlag != 1 && 'vhide' || "")}>
            <ColoredLightDisplay/>
          </div>
          {/* 场景 */}
          <div className={classNames(stateFlag != 2 && 'vhide' || "")}>
            <ScenarioDisplay/>
          </div>

          <div className={classNames(stateFlag == 2 && 'vhide' || "")}>
            <article id={'lightbright'} className={classNames('lightbright')}>
              <LightBright defaultValue={sdk.deviceData.brightness ? sdk.deviceData.brightness : 80}
                           onChange={changeBrightness}/>
            </article>
          </div>

          <div className={classNames(stateFlag != 1 && 'vhide' || "")}>
            <Light_temperature/>
          </div>
          <div className={classNames(stateFlag != 2 && 'vhide' || "")}>
            <Scenario_progress_bar/>
          </div>
          <div className="botton_card">
            < Buttom/>
            {getMenu()}
          </div>
        </article>
      )
    } else {
      return (
        <article id={'home'} className={classNames('home', sdk.deviceData.power_switch != 1 && 'power-off')}>

          {/* 白光 */}
          <div className={classNames(stateFlag != 0 && 'vhide' || "")}>
            <WhiteLightDisplay/>
          </div>
          {/* 彩光 */}
          <div className={classNames(stateFlag != 1 && 'vhide' || "")}>
            <ColoredLightDisplay/>
          </div>
          {/* 场景 */}
          <div className={classNames(stateFlag != 2 && 'vhide' || "")}>
            <ScenarioDisplay/>
          </div>

          <div className={classNames(stateFlag == 2 && 'vhide' || "")}>
            <article id={'lightbright'} className={classNames('lightbright')}>
              <LightBright defaultValue={sdk.deviceData.brightness ? sdk.deviceData.brightness : 80}
                           onChange={changeBrightness}/>
            </article>
          </div>

          <div className={classNames(stateFlag != 1 && 'vhide' || "")}>
            <Light_temperature/>
          </div>
          <div className={classNames(stateFlag != 2 && 'vhide' || "")}>
            <Scenario_progress_bar/>
          </div>
          <div className="botton_card">
            < Buttom/>
            {getMenuOrdinary()}
          </div>
        </article>
      )
    }
  };
  return (
    getHomePage()
  )
}

export default Home;

