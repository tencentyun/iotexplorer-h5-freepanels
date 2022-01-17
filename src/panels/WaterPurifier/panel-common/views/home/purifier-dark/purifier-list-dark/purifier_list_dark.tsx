import React from 'react';
import classNames from 'classnames';
import {Cell} from '@components/base';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import './purifier_list_dark.less';
import {onControlDevice} from '@hooks/useDeviceData';

export function PurifierListDark() {
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
    <article id={'buttom'} className={classNames('buttom')}>
      <div className="lists">

        <Cell
          className="_color_white_"
          title=""
          isLink={false}
          value=""
          valueStyle="gray"
          size="medium"
          // prefixIcon={<SvgIcon name={'icon-audible-bw-history'} width={58} height={63}/>}
          // onClick={onDeployed}
        >

          {dataHistory.map((t: any) => (
            <div key={t.id} className="div_card">
              <div className="card_left">
                <div className='left_span1'>{t.life}</div>
                <div className="life_span">{t.day}</div>
              </div>
              <div className="card_right">
                <div className="sty_num">
                  <div>{t.life_num}%</div>
                  <div className="sty_span">{t.day_num}天</div>
                </div>
                <div
                  className={classNames(
                    'sty_bottom',
                    t.class_name,
                    sdk.deviceData.switch != 1 && 'power-off'
                  )}
                  onClick={() => {
                    if (sdk.deviceData.switch == 1) {
                      onControlDevice(t.name, 1);
                    }
                  }}
                >
                  复位
                </div>
              </div>
            </div>
          ))}

        </Cell>
      </div>
    </article>
  );
};

export default PurifierListDark;
