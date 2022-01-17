import React from 'react';
import classNames from 'classnames';
import './purifier_list_colorful.less';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import {onControlDevice} from '@hooks/useDeviceData';

export function PurifierListColorful() {
  // const [isListVisible, toggleVisible] = useState(false);
  // const cellIcon = (url: string) => (
  //   <img className="details-icon" src={url}></img>
  // );
  const dataHistory = [
    {
      id: 0,
      life: 'PP寿命',
      life_num: sdk.deviceData.pp_filtertime ? sdk.deviceData.pp_filtertime : 0,
      day: 'PP剩余天数',
      day_num: sdk.deviceData.pp_day ? sdk.deviceData.pp_day : 0,
      class_name: 'botton_sty1',
      name: 'pp_switch'
    },
    {
      id: 1,
      life: 'CTO寿命',
      life_num: sdk.deviceData.cot_filtertime ? sdk.deviceData.cot_filtertime : 0,
      day: 'CTO剩余天数',
      day_num: sdk.deviceData.cot_day ? sdk.deviceData.cot_day : 0,
      class_name: 'botton_sty2',
      name: 'cot_switch'
    },
    {
      id: 2,
      life: 'RO寿命',
      life_num: sdk.deviceData.ro_filtertime ? sdk.deviceData.ro_filtertime : 0,
      day: 'RO剩余天数',
      day_num: sdk.deviceData.ro_day ? sdk.deviceData.ro_day : 0,
      class_name: 'botton_sty3',
      name: 'ro_switch'
    },
    {
      id: 3,
      life: 'CBPA寿命',
      life_num: sdk.deviceData.CBPA_filtertime ? sdk.deviceData.CBPA_filtertime : 0,
      day: 'CBPA剩余天数',
      day_num: sdk.deviceData.CBPA_day ? sdk.deviceData.CBPA_day : 0,
      class_name: 'botton_sty4',
      name: 'CBPA_switch'
    },
  ];

  return (
    <article id={'color_ful_buttom'} className={classNames('color_ful_buttom')}>
      <div className="lists">
        <div className="card">
          {dataHistory.map((t: any) => (
            <div key={t.id} className="list_ul">
              <div className="list_line">
                <div className="line_font1">{t.life}</div>
                <div className="line_font1">{t.life_num}%</div>
              </div>

              <div className="list_line">
                <div className="line_font2">{t.day}</div>
                <div className="line_font2">{t.day_num}天</div>
              </div>
              <div
                className={classNames(
                  'botton_sty',
                  t.class_name,
                  sdk.deviceData.switch != 1 && 'power-off'
                )}
                onClick={() => {
                  if (sdk.deviceData.switch == 1){
                    onControlDevice(t.name, 1);
                  }
                }}
              >
                复位
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};

export default PurifierListColorful;
