import React from 'react';
import './detail.less';
import classNames from 'classnames';
import {SvgIcon} from '@components/common/icon';
import {getThemeType} from '@libs/theme';
import { apiControlDeviceData, onControlDevice} from '@hooks/useDeviceData';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import {ProgressBar} from '../progess-bar/progess-bar';

const Detail = ({onClose, food_name}) => {
  const themeType = getThemeType();

  const toggleDoCooking = () => {
    if(sdk.deviceData.work_state != '1'){
      apiControlDeviceData({ work_state: '1', operation_control: '0' });
      onClose();
    } else {
      sdk.tips.showError('当前设备状态无法进行该操作！');
    }
  };
  const onHeatMode = (mode: String) => {
    onControlDevice('heat_mode', mode);
    onControlDevice('temperature_set_down', 200);
  };
  const onHeatType = (type: String) => {
    onControlDevice('heat_type', type);
  };
  return (
    <article id={'detail'} className={classNames('detail')}>
      <div className="detail_title">{food_name}</div>

      <div className="heating">
        <div className="heating_top">
          <div>加热模式</div>
        </div>

        <div className="heating_footer">
          <div className="heating_span" onClick={() => onHeatMode('2')}>
            <div>
              <SvgIcon
                name={sdk.deviceData.heat_mode === '2' && 'icon-electric-oven-arrow-tube-' + themeType || 'icon-electric-oven-arrow-tube-ash-' + themeType}
                color="#0F0F0F" width={100} height={100}/>
            </div>
            <div className={sdk.deviceData.heat_mode === '2' ? 'heating_font1' : 'heating_font'}>上下管</div>
          </div>

          <div className="heating_span" onClick={() => onHeatMode('0')}>
            <div>
              <SvgIcon
                name={sdk.deviceData.heat_mode === '0' && 'icon-electric-oven-up-tube-' + themeType || 'icon-electric-oven-up-tube-ash-' + themeType}
                color="#0F0F0F" width={100} height={100}/>
            </div>
            <div className={sdk.deviceData.heat_mode === '0' ? 'heating_font1' : 'heating_font'}>上管</div>
          </div>

          <div className="heating_span" onClick={() => onHeatMode('1')}>
            <div>
              <SvgIcon
                name={sdk.deviceData.heat_mode === '1' && 'icon-electric-oven-under-tube-' + themeType || 'icon-electric-oven-under-tube-ash-' + themeType}
                color="#0F0F0F" width={100} height={100}/>
            </div>
            <div className={sdk.deviceData.heat_mode === '1' ? 'heating_font1' : 'heating_font'}>下管</div>
          </div>

          <div className="heating_span" onClick={() => onHeatType('1')}>
            <div>
              <SvgIcon
                name={sdk.deviceData.heat_type === '1' && 'icon-electric-oven-cold-' + themeType || 'icon-electric-oven-cold-ash-' + themeType}
                color="#0F0F0F" width={100} height={100}/>
            </div>
            <div className={sdk.deviceData.heat_type === '1' ? 'heating_font1' : 'heating_font'}>冷风</div>
          </div>

          <div className="heating_span" onClick={() => onHeatType('0')}>
            <div>
              <SvgIcon
                name={sdk.deviceData.heat_type === '0' && 'icon-electric-oven-hot-' + themeType || 'icon-electric-oven-hot-ash-' + themeType}
                color="#0F0F0F" width={100} height={100}/>
            </div>
            <div className={sdk.deviceData.heat_type === '0' ? 'heating_font1' : 'heating_font'}>热风</div>
          </div>

        </div>
      </div>


      <div className="progress">
        <div className="bar_1">
          <div className="bar_top">
            <div className="bar_size">上管温度</div>
            <div>
              <SvgIcon name={'icon-electric-oven-arrowhead-normal'} width={15} height={30}/>
            </div>
          </div>

          <ProgressBar
            defaultValue={
              sdk.deviceData.temperature_set_up
                ? sdk.deviceData.temperature_set_up
                : 200
            }
            minValue={35}
            maxValue={225}
            unit="℃"
            onChange={(value: any, touchEnd: boolean) => {
              if(touchEnd){
                onControlDevice('temperature_set_up', value);
              }
            }}
          />
        </div>
        <div className="bar_2">
          <div className="bar_top">
            <div className="bar_size">下管温度</div>
            <div>
              <SvgIcon name={'icon-electric-oven-arrowhead-normal'} width={15} height={30}/>
            </div>
          </div>

          <ProgressBar
            defaultValue={
              sdk.deviceData.temperature_set_down
                ? sdk.deviceData.temperature_set_down
                : 200
            }
            minValue={35}
            maxValue={225}
            unit="℃"
            onChange={(value: any, touchEnd:boolean) => {
              if(touchEnd){
                onControlDevice('temperature_set_down', value);
              }
            }}
          />
        </div>
        <div className="bar_3">

          <div className="bar_top">
            <div className="bar_size">烹饪时长</div>
            <div>
              <SvgIcon name={'icon-electric-oven-arrowhead-normal'} width={15} height={30}/>
            </div>
          </div>

          <ProgressBar
            defaultValue={
              sdk.deviceData.remaining_time ? sdk.deviceData.remaining_time : 30
            }
            minValue={1}
            maxValue={240}
            unit=""
            onChange={(value: any, touchEnd: boolean) => {
              if(touchEnd){
                onControlDevice('remaining_time', value);
                onControlDevice('TimeOfAppointment', value);
              }
            }}
          />
        </div>
      </div>

      <div className="bar_botton">
        <div className="bar_end" onClick={onClose}>关闭</div>
        <div className="bar_go" onClick={toggleDoCooking}>烹饪</div>
      </div>
    </article>
  );
};

export default Detail;
