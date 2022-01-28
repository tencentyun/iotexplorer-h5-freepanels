import React from 'react';
import './oven_head.less';
import classNames from 'classnames';
import {SvgIcon} from '@components/common/icon';
import {getThemeType} from '@libs/theme';
import { apiControlDeviceData } from '@hooks/useDeviceData';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';

export function Oven_head() {
  const themeType = getThemeType();
  const heatModeSrc = (mode: String) => {
    switch (mode) {
      case '0':
        return '上管加热';
      case '1':
        return '下管加热';
      case '2':
        return '上下管加热';
      default:
        return '无模式';
    }
  };
  const getCookingIconCard = () => {
    if (themeType == 'blueWhite') {
      return (<div></div>)
    } else {
      return (<SvgIcon className={sdk.deviceData.work_state === '1' && 'icon-electric-oven-cooking-effect'}
                       name={(sdk.deviceData.power_switch != 1 || sdk.deviceData.work_state === '0') && 'icon-electric-oven-standby-' + themeType || 'icon-electric-oven-cooking-' + themeType}
                       color="#0F0F0F" width={200} height={120}/>)
    }
  }
  const getCookingProgressBar = () => {
    if (themeType == 'blueWhite') {
      return (<div className='cooking_icon_card'>
        <div
          className={classNames('cooking_icon_foot_card_progress', sdk.deviceData.work_state === '1' && 'cooking_effect_animation')}></div>
      </div>)
    } else {
      return (<div></div>)
    }
  }
  const getCookingMorandiBar = () => {
    if (themeType == 'morandi') {
      return (<div className='cooking_icon_foot_card'>
        <div
          className={classNames('cooking_icon_foot_card_progress', sdk.deviceData.work_state === '1' && 'cooking_effect_animation')}></div>
      </div>)
    } else {
      return (<div></div>)
    }
  }
  const getTimeToHour = (time: number) => {
    const minute = (time % 60).toString().length < 2 ? "0" + (time % 60).toString() : (time % 60).toString();
    const hour = Math.floor(time / 60).toString() + ":" + minute;
    return hour;
  };
  const getStateStr = () => {
    if (sdk.deviceData.power_switch != 1) {
      return (<div className="span_center center_closure">设备已关机</div>);
    } else {
      if (sdk.deviceData.work_state == 1) {
        return <div className="span_center center_cooking">工作中</div>;
      } else if (sdk.deviceData.work_state == 2) {
        return <div className="span_center center_paused">预约中</div>;
      } else if (sdk.deviceData.work_state == 3) {
        return <div className="span_center center_paused">保温中</div>;
      } else if (sdk.deviceData.work_state == 4) {
        return <div className="span_center center_paused">预热中</div>;
      } else if (sdk.deviceData.work_state == 5) {
        return <div className="span_center center_paused">暂停中</div>;
      } else if (sdk.deviceData.work_state == 6) {
        return <div className="span_center center_paused">完成</div>;
      } else if (sdk.deviceData.work_state == 7) {
        return <div className="span_center center_paused">结束</div>;
      } else return <div className="span_center center_standby">待机</div>;
    }
  }
  const handlePowerSwitch = () => {
    apiControlDeviceData({
      power_switch: sdk.deviceData.power_switch === 1 ? 0 : 1
    });
  };
  return (
    <article id={'oven_head'} className={classNames('oven_head')}>
      <div className="head_card">
        <div className="card_top">
          <div className="card_span">
            <div className="span_left" onClick={handlePowerSwitch}>
              <SvgIcon name={'icon-electric-oven-boot-' + themeType} color="#0F0F0F" width={62.5} height={56.25}/>
            </div>

            {getStateStr()}

            <div>
              <SvgIcon name={'icon-electric-oven-equipment-shutdown-' + themeType} color="#0F0F0F" width={75}
                       height={47.5}/>

              {/* <SvgIcon name={'icon-electric-oven-equipment-shutdown-normal'} width={75} height={47.5}/> */}
            </div>
          </div>

          <div className="card_span1">
            <div
              className={classNames("foot_size", sdk.deviceData.power_switch != 1 && 'power-off', sdk.deviceData.work_state === '0' && 'idle-state')}>
              {sdk.deviceData.work_type ? sdk.deviceData.work_type : ''}
            </div>
          </div>

        </div>

        <div className="card_center">
          <div className="center_left">
            <div
              className={classNames("left_size", sdk.deviceData.power_switch != 1 && 'power-off', sdk.deviceData.work_state === '0' && 'idle-state')}>当前温度
            </div>
            <div
              className={classNames("left_num", sdk.deviceData.power_switch != 1 && 'power-off', sdk.deviceData.work_state === '0' && 'idle-state')}>
              {sdk.deviceData.temperature ? sdk.deviceData.temperature : 0}℃
            </div>
          </div>

          <div className="center_right">
            <div
              className={classNames("right_size", sdk.deviceData.power_switch != 1 && 'power-off', sdk.deviceData.work_state === '0' && 'idle-state')}>烹饪时长
            </div>
            <div
              className={classNames("right_num", sdk.deviceData.power_switch != 1 && 'power-off', sdk.deviceData.work_state === '0' && 'idle-state')}>
              {sdk.deviceData.remaining_time ? getTimeToHour(sdk.deviceData.remaining_time) : 0}
            </div>
          </div>
        </div>

        <div className="card_foot">
          <div className="foot_span">
            <div
              className={classNames("span_size1", sdk.deviceData.power_switch != 1 && 'power-off', sdk.deviceData.work_state === '0' && 'idle-state')}>加热模式
            </div>
            <div
              className={classNames("span_size", sdk.deviceData.power_switch != 1 && 'power-off', sdk.deviceData.work_state === '0' && 'idle-state')}>上管温度
            </div>
            <div
              className={classNames("span_size", sdk.deviceData.power_switch != 1 && 'power-off', sdk.deviceData.work_state === '0' && 'idle-state')}>下管温度
            </div>
            <div
              className={classNames("span_size", sdk.deviceData.power_switch != 1 && 'power-off', sdk.deviceData.work_state === '0' && 'idle-state')}>预设时常
            </div>
          </div>

          <div className="card_cooking">
            {getCookingIconCard()}
          </div>

          <div className="foot_span">
            <div
              className={classNames("span_size2", sdk.deviceData.power_switch != 1 && 'power-off', sdk.deviceData.work_state === '0' && 'idle-state')}>
              {sdk.deviceData.heat_mode ? heatModeSrc(sdk.deviceData.heat_mode) : '无模式'}
            </div>
            <div
              className={classNames("right_botton", sdk.deviceData.power_switch != 1 && 'power-off', sdk.deviceData.work_state === '0' && 'idle-state')}
            >
              <div
                className={classNames("span_num", sdk.deviceData.power_switch != 1 && 'power-off', sdk.deviceData.work_state === '0' && 'idle-state')}
              >
                {sdk.deviceData.temperature_set_up ? sdk.deviceData.temperature_set_up + '°C' : '-·-'}
              </div>
              <SvgIcon className="arrowhead" name={'icon-electric-oven-arrowhead-normal'} width={15} height={30}/>
            </div>

            <div
              className={classNames("right_botton", sdk.deviceData.power_switch != 1 && 'power-off', sdk.deviceData.work_state === '0' && 'idle-state')}>
              <div
                className={classNames("span_num", sdk.deviceData.power_switch != 1 && 'power-off', sdk.deviceData.work_state === '0' && 'idle-state')}
              >
                {sdk.deviceData.temperature_set_down ? sdk.deviceData.temperature_set_down + '°C' : '-·-'}
              </div>
              <SvgIcon className="arrowhead" name={'icon-electric-oven-arrowhead-normal'} width={15} height={30}/>
            </div>

            <div
              className={classNames("right_botton1", sdk.deviceData.power_switch != 1 && 'power-off', sdk.deviceData.work_state === '0' && 'idle-state')}>
              <div
                className={classNames("font_right1", sdk.deviceData.power_switch != 1 && 'power-off', sdk.deviceData.work_state === '0' && 'idle-state')}
              >
                {sdk.deviceData.TimeOfAppointment ? sdk.deviceData.TimeOfAppointment + '分钟' : '-·-'}
              </div>
              <SvgIcon className="arrowhead" name={'icon-electric-oven-arrowhead-normal'} width={15} height={30}/>
            </div>
          </div>
        </div>
        {getCookingProgressBar()}
      </div>
      {getCookingMorandiBar()}
    </article>
  );
};

export default Oven_head;
