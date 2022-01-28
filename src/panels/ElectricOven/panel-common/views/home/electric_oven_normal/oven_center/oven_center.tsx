import React, {useState} from 'react';
import './oven_center.less';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import classNames from 'classnames';
import {SvgIcon} from '@components/common/icon';
import Detail from '../../pop-up/detail/detail';
import {getThemeType} from '@libs/theme';
import { apiControlDeviceData } from '@hooks/useDeviceData';

export function Oven_center() {
  const themeType = getThemeType();

  const [selectTheDetail, theDetail] = useState(false);
  const [food_name, setFoodName] = useState('');

  const onDetail = ( name: string, heat: string, type: string, up: number, down: number, time: number) => {
    up = 200;
    down = 200;
    time = 30;
    if (sdk.deviceData.power_switch === 1) {
      setFoodName(name);
      apiControlDeviceData({
        work_type: name,
        heat_mode: heat,
        heat_type: type,
        temperature_set_up: up,
        temperature_set_down: down,
        remaining_time: time,
        TimeOfAppointment: time
      });
      theDetail(true);
    }
  }
  return (
    <article id={'oven_center'} className={classNames('oven_center')}>
      <div className="center_card">
        <div className=''>
          <div className="card_title">工作模式</div>
        </div>
        <div className="card_center">
          <div className="card_span"
               onClick={() => onDetail("纸杯蛋糕",'2','0',160,160,30)}
          >
            <div className={classNames('work_card_icon',
              sdk.deviceData.work_type === '纸杯蛋糕' && 'check')}>
              <SvgIcon name={sdk.deviceData.work_type === '纸杯蛋糕' ? 'icon-electric-oven-cupcakes-check-' + themeType : 'icon-electric-oven-cupcakes-' + themeType} color="#0F0F0F" width={70} height={70}/>
            </div>
            <div className="card_size">纸杯蛋糕</div>
          </div>
          <div
            className="card_span"
            onClick={() => onDetail("黄油饼干",'2','0',180,180,16)}
          >
            <div className={classNames('work_card_icon',
              sdk.deviceData.work_type === '黄油饼干' && 'check')}>
              <SvgIcon name={sdk.deviceData.work_type === '黄油饼干' ? 'icon-electric-oven-butter-cookies-check-' + themeType : 'icon-electric-oven-butter-cookies-' + themeType} color="#0F0F0F" width={70} height={70}/>
            </div>
            <div className="card_size">黄油饼干</div>
          </div>

          <div className="card_span"
               onClick={() => onDetail("烤鱼虾",'2','0',200,200,25)}
          >
            <div className={classNames('work_card_icon',
              sdk.deviceData.work_type === '烤鱼虾' && 'check')}>
              <SvgIcon name={sdk.deviceData.work_type === '烤鱼虾' ? 'icon-electric-oven-roast-shrimp-check-' + themeType : 'icon-electric-oven-roast-shrimp-' + themeType} color="#0F0F0F" width={70} height={70}/>
            </div>
            <div className="card_size">烤鱼虾</div>
          </div>

          <div className="card_span"
               onClick={() => onDetail("烤鸡翅",'2','0',220,220,18)}
          >
            <div className={classNames('work_card_icon',
              sdk.deviceData.work_type === '烤鸡翅' && 'check')}>
              <SvgIcon name={sdk.deviceData.work_type === '烤鸡翅' ? 'icon-electric-oven-roast-sharkfin-check-' + themeType : 'icon-electric-oven-roast-sharkfin-' + themeType} color="#0F0F0F" width={70} height={70}/>
            </div>
            <div className="card_size">烤鸡翅</div>
          </div>

        </div>

        <div className="card_foot">
          <div className="card_span"
               onClick={() => onDetail("焗饭",'2','0',200,200,20)}
          >
            <div className={classNames('work_card_icon',
              sdk.deviceData.work_type === '焗饭' && 'check')}>
              <SvgIcon name={sdk.deviceData.work_type === '焗饭' ? 'icon-electric-oven-rice-check-' + themeType : 'icon-electric-oven-rice-' + themeType} color="#0F0F0F" width={70} height={70}/>
            </div>
            <div className="card_size">焗饭</div>
          </div>

          <div className="card_span"
               onClick={() => onDetail("披萨",'2','0',200,200,15)}
          >
            <div className={classNames('work_card_icon',
              sdk.deviceData.work_type === '披萨' && 'check')}>
              <SvgIcon name={sdk.deviceData.work_type === '披萨' ? 'icon-electric-oven-pizza-check-' + themeType : 'icon-electric-oven-pizza-' + themeType} color="#0F0F0F" width={70} height={70}/>
            </div>
            <div className="card_size">披萨</div>
          </div>

          <div className="card_span"
               onClick={() => onDetail("烤薯类",'2','0',230,230,50)}
          >
            <div className={classNames('work_card_icon',
              sdk.deviceData.work_type === '烤薯类' && 'check')}>
              <SvgIcon name={sdk.deviceData.work_type === '烤薯类' ? 'icon-electric-oven-roast-potato-check-' + themeType : 'icon-electric-oven-roast-potato-' + themeType} color="#0F0F0F" width={70} height={70}/>
            </div>
            <div className="card_size">烤薯类</div>
          </div>

          <div className="card_span"
               onClick={() => onDetail("发酵面团",'2','0',50,50,30)}
          >
            <div className={classNames('work_card_icon',
              sdk.deviceData.work_type === '发酵面团' && 'check')}>
              <SvgIcon name={sdk.deviceData.work_type === '发酵面团' ? 'icon-electric-oven-dough-ferment-check-' + themeType : 'icon-electric-oven-dough-ferment-' + themeType} color="#0F0F0F" width={70} height={70}/>
            </div>
            <div className="card_size">发酵面团</div>
          </div>
        </div>
      </div>
      <div
        className={classNames("detail_wrap", selectTheDetail && "detail_vshow" || "detail_vhide")}>
        <Detail
          onClose={() => {
            theDetail(false);
          }}
          food_name={food_name}
        />
      </div>
    </article>
  );
};

export default Oven_center;
