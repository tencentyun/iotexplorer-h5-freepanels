import React from 'react';
import './home_colorful.less';
import classNames from 'classnames';
import { getThemeType } from '@libs/theme';
import { apiControlDeviceData } from '@hooks/useDeviceData';
import { toggleBooleanByNumber } from '@libs/utillib';
import { SvgIcon } from '@components/common/icon';
import { Cell, Switch } from '@components/base';
import { Normal_progress_bar } from '../normal-progress-bar/normal_progress_bar';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';

export function Home_colorful() {
  const themeType = getThemeType();

  // const [lampSrc] = useState(lampIcon);
  return (
    <article id={'emergency_button'} className={classNames('emergency_button')}>
      <div className="emergency_head_colorful">
        <div className="scale_foot_state">
          <div className="state_span">
            <div className="state_font">{sdk.deviceData.sos_state === '1' ? '打开' : '关闭'}</div>
            <div className="state_font1">紧急报警</div>
          </div>

          <div className="vertical"></div>

          <div className="state_span">
            <div className="state_font">{sdk.deviceData.tamper_alarm === '1' ? '打开' : '关闭'}</div>
            <div className="state_font1">防拆报警</div>
          </div>

          <div className="vertical"></div>

          <div className="state_span">
            <div
              className="state_font">{sdk.deviceData.battery_state ? statusSrc(sdk.deviceData.battery_state) : '-'}</div>
            <div className="state_font1">电池状态</div>
          </div>
        </div>

        <div className="icon_card">
          <div className="head-icon">
            <SvgIcon name={`icon-emergency-button-${themeType}`} width={160} height={160}/>
          </div>

          <div id={'center_scale'}>
            <Normal_progress_bar/>
          </div>
        </div>

      </div>

      <div className="product-setting_colorful">
        <Cell
          className="_color_white_"
          title="撤防"
          // isLink={false}
          isLink={false}
          value={
            <Switch
              name={''}
              theme={themeType}
              checked={toggleBooleanByNumber(sdk.deviceData.disarmed ? sdk.deviceData.disarmed : 0)}
              onChange={(value: boolean) => {
                apiControlDeviceData({ disarmed: value ? 1 : 0 });
              }}
            />
          }
          valueStyle="gray"
          size="medium"
          prefixIcon={<SvgIcon name={`icon-emergency-disarm-${themeType}`} width={40} height={40}/>}
        />

        <Cell
          className="_color_white_"
          title="外出布防"
          // isLink={false}
          isLink={false}
          value={
            <Switch
              name={''}
              theme={themeType}
              checked={toggleBooleanByNumber(sdk.deviceData.arm ? sdk.deviceData.arm : 0)}
              onChange={(value: boolean) => {
                apiControlDeviceData({ arm: value ? 1 : 0 });
              }}
            />
          }
          valueStyle="gray"
          size="medium"
          prefixIcon={<SvgIcon name={`icon-emergency-go-out-and-arm-${themeType}`} width={40} height={40}/>}
        />

        <Cell
          className="_color_white_"
          title="在家布防"
          // isLink={false}
          isLink={false}
          value={
            <Switch
              name={''}
              theme={themeType}
              checked={toggleBooleanByNumber(sdk.deviceData.home ? sdk.deviceData.home : 0)}
              onChange={(value: boolean) => {
                apiControlDeviceData({ home: value ? 1 : 0 });
              }}
            />
          }
          valueStyle="gray"
          size="medium"
          prefixIcon={<SvgIcon name={`icon-emergency-arm-your-home-${themeType}`} width={40} height={40}/>}
        />

        <Cell
          className="_color_white_"
          title="SOS紧急"
          // isLink={false}
          isLink={false}
          value={
            <Switch
              name={''}
              theme={themeType}
              checked={toggleBooleanByNumber(sdk.deviceData.sos ? sdk.deviceData.sos : 0)}
              onChange={(value: boolean) => {
                apiControlDeviceData({ sos: value ? 1 : 0 });
              }}
            />
          }
          valueStyle="gray"
          size="medium"
          prefixIcon={<SvgIcon name={`icon-emergency-urgent-${themeType}`} width={45} height={45}/>}
        />
      </div>
    </article>
  );
}

export default Home_colorful;
