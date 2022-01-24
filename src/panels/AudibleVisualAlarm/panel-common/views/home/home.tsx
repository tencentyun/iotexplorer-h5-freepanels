import React, {useState} from 'react';
import classNames from 'classnames';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import {SvgIcon} from '@components/common/icon';
import {Cell} from '@components/base';
import {useHistory} from 'react-router-dom';
import {getThemeType} from '@libs/theme';
import { apiControlDeviceData, onControlDevice} from '@hooks/useDeviceData';
import History from "../history/history";
import { ListPicker } from '@components/business';
import './home.less';

export function Home() {
  const themeType = getThemeType();
  const history = useHistory();
  const [alertStateVisible, onToggleAlertState] = useState(false);
  const [alarmStateVisible, onToggleAlarmState] = useState(false);
  const getAlarmState = (val: String) => {
    switch (val) {
      case 'alarm_sound':
        return '声音告警';
      case 'alarm_light':
        return '光亮报警';
      case 'alarm_sound_light':
        return '声光报警';
      case 'normal':
        return '正常';
      default:
        return '正常';
    }
  };
  const onClick = (path: string) => {
    history.push(path);
  };
  const updateAlertStatus = () => {
    if (sdk.deviceData.alarm_state === 'alarm_sound' || sdk.deviceData.alarm_state === 'alarm_light' || sdk.deviceData.alarm_state === 'alarm_sound_light') {
      apiControlDeviceData({ alarm_state: 'normal' });
    }
  };
  const handleMuffling = () => {
    apiControlDeviceData({
      muffling: sdk.deviceData.muffling === 1 ? 0 : 1
    });
  };
  return (
    <article className={classNames('home')}>
      <div className="round_card">
        {/*电量*/}
        <div className="alarm" onClick={() => onToggleAlarmState(true)}>
          <SvgIcon name={'icon-audible-bw-alarm-' + themeType} color="#000000" width={78} height={72}/>
          <div className="alarm_font">报警</div>
        </div>
        <ListPicker
          visible={alarmStateVisible}
          title="触发报警"
          defaultValue={[
            sdk.deviceData.alarm_state ? sdk.deviceData.alarm_state : 'normal'
          ]}
          options={[
            {
              label: '声音报警',
              value: 'alarm_sound'
            },
            {
              label: '光亮报警',
              value: 'alarm_light'
            },
            {
              label: '声光报警',
              value: 'alarm_sound_light'
            },
            {
              label: '正常',
              value: 'normal'
            }
          ]}
          onCancel={() => onToggleAlarmState(false)}
          onConfirm={value => {
            onControlDevice('alarm_state', value[0]);
            onToggleAlarmState(false);
          }}
        />
        {/*仪表盘*/}
        <div className="alarm_dashboard">
          <div
            id={'alarm_effect_div'}
            className={classNames(
              'alarm_effect_wrap',
              sdk.deviceData.alarm_state === 'alarm_sound' || sdk.deviceData.alarm_state === 'alarm_light' || sdk.deviceData.alarm_state === 'alarm_sound_light' ? 'isAlarming' : ''
            )}
          >
            <SvgIcon name={sdk.deviceData.alarm_state === 'alarm_sound' || sdk.deviceData.alarm_state === 'alarm_light' || sdk.deviceData.alarm_state === 'alarm_sound_light' ? 'icon-audible-bw-effect-normal2' : 'icon-audible-bw-effect-' + themeType} className={classNames('alarm_effect', sdk.deviceData.alarm_state === 'alarm_sound' || sdk.deviceData.alarm_state === 'alarm_light' || sdk.deviceData.alarm_state === 'alarm_sound_light' ? 'alarm_effect_animation' : '')} color="#000000"/>
          </div>
          <SvgIcon
            name={sdk.deviceData.alarm_state === 'alarm_sound' || sdk.deviceData.alarm_state === 'alarm_light' || sdk.deviceData.alarm_state === 'alarm_sound_light' ? 'icon-audible-bw-annunciator-' + themeType + '2' : 'icon-audible-bw-annunciator-' + themeType}
            className={classNames('alarm_annunciator')} color="#000000" width={171.73} height={191.33}/>
        </div>
      </div>

      {/* 解除按钮 */}
      <div className="alarm_relieve">
        <div className="warin1">{getAlarmState(sdk.deviceData.alarm_state)}</div>
        <div className="warin2">
          <div
            className={classNames(
              'warin2_font1',
              sdk.deviceData.alarm_state === 'alarm_sound' ||
                sdk.deviceData.alarm_state === 'alarm_light' ||
                sdk.deviceData.alarm_state === 'alarm_sound_light'
                ? 'check'
                : ''
            )}
            onClick={updateAlertStatus}
          >
            <div className="war_size">解除报警</div>
          </div>
          <div
            className={classNames(
              'warin2_font2',
              sdk.deviceData.muffling === 1 ? 'check' : ''
            )}
            onClick={handleMuffling}
          >
            <div className="war_size">消音</div>
          </div>
        </div>
      </div>

      {/* 控制区 */}
      <div className="product-setting">
        <div className="product_card">
          <Cell
            className="_color_white_"
            title="亮度检测状态"
            isLink={false}
            value="低"
            valueStyle="gray"
            size="medium"
          />
          <Cell
            className="_color_white_"
            title="布防"
            value={sdk.deviceData.alert_state === 1 ? '布防' : '撤防'}
            valueStyle="gray"
            size="medium"
            prefixIcon={<SvgIcon name={'icon-audible-bw-deployed-' + themeType} width={40} height={40}/>}
            onClick={() => {
              onToggleAlertState(true);
            }}
          >
            <ListPicker
              visible={alertStateVisible}
              title="触发报警"
              defaultValue={[
                sdk.deviceData.alert_state ? sdk.deviceData.alert_state : 0
              ]}
              options={[
                {
                  label: '撤防',
                  value: 0
                },
                {
                  label: '布防',
                  value: 1
                }
              ]}
              onCancel={() => onToggleAlertState(false)}
              onConfirm={value => {
                onControlDevice('alert_state', value[0]);
                onToggleAlertState(false);
              }}
            />
          </Cell>
          <History/>
          {/*<Cell
                className="_color_white_"
                title="智能联动"
                isLink={false}
                value=""
                valueStyle="gray"
                size="medium"
                prefixIcon={<SvgIcon name={'icon-audible-bw-smartmoves-' + themeType} width={65} height={50}/>}
                // onClick={() => setIsShowPir(true)}
              />*/}
          <Cell
            className="_color_white_"
            title="设置"
            // isLink={false}
            value=""
            valueStyle="gray"
            size="medium"
            prefixIcon={<SvgIcon name={'icon-audible-bw-setup-' + themeType} width={40} height={40}/>}
            onClick={() => onClick('/setupPage')}
          />
        </div>
      </div>
    </article>
  );
}
