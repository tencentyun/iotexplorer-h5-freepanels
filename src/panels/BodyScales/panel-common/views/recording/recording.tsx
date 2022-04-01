import React, { useState } from 'react';
import classNames from 'classnames';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { LineChart } from '../components/line-chart';
import './recording.less';
import numImage from '../icons/normal/no-num.svg';
export function Recording() {
  const [timeType, setTimeType] = useState('day');
  const [bodyType, setBodyType] = useState('1');

  return (
    <article
      className={classNames(
        'recording',
        sdk.deviceData.power_switch === 0 && 'power-off',
      )}
    >
      <div id={'sacles_center'} className={classNames('sacles_center')}>
        <div className="card">
          <div className="card_span">
            <div className={classNames('span_btn', timeType == 'day' ? 'check' : '')} onClick={() => setTimeType('day')}>日</div>
            <div className={classNames('span_btn', timeType == 'week' ? 'check' : '')} onClick={() => setTimeType('week')}>周</div>
            <div className={classNames('span_btn', timeType == 'month' ? 'check' : '')} onClick={() => setTimeType('month')}>月</div>
          </div>
          {/* <div className="card_font">本时间段无测量记录</div>*/}
          <LineChart size="medium" width={1200} height={400} />
        </div>
      </div>
      <div id={'sacles_foot'} className={classNames('sacles_foot')}>
        <div className="foot_title">
          人体指标测量平均值
        </div>
        <div className="foot_card">
          <div className="foot_span">
            <div className={classNames('body_index', bodyType == '1' ? 'body_check' : '', 'bg_yellow')} onClick={() => setBodyType('1')}>
              <div>体重</div>
              <img src={numImage} width={30} height={8} alt="" />
            </div>
            <div className={classNames('body_index', bodyType == '2' ? 'body_check' : '', 'bg_green')} onClick={() => setBodyType('2')}>
              <div>BMI</div>
              <img src={numImage} width={30} height={8} alt="" />
            </div>
            <div className={classNames('body_index', bodyType == '3' ? 'body_check' : '', 'bg_blue')} onClick={() => setBodyType('3')}>
              <div>体脂率</div>
              <img src={numImage} width={30} height={8} alt="" />
            </div>
          </div>

          <div className="foot_span">
            <div className={classNames('body_index', bodyType == '4' ? 'body_check' : '', 'bg_cadetblue')} onClick={() => setBodyType('4')}>
              <div>及肉量</div>
              <img src={numImage} width={30} height={8} alt="" />
            </div>
            <div className={classNames('body_index', bodyType == '5' ? 'body_check' : '', 'bg_purple')} onClick={() => setBodyType('5')}>
              <div>内脏脂肪指数</div>
              <img src={numImage} width={30} height={8} alt="" />
            </div>
            <div className={classNames('body_index', bodyType == '6' ? 'body_check' : '', 'bg_yellow')} onClick={() => setBodyType('6')}>
              <div>水分</div>
              <img src={numImage} width={30} height={8} alt="" />
            </div>
          </div>

          <div className="foot_span">
            <div className={classNames('body_index', bodyType == '7' ? 'body_check' : '', 'bg_green')} onClick={() => setBodyType('7')}>
              <div>骨量</div>
              <img src={numImage} width={30} height={8} alt="" />
            </div>
            <div className={classNames('body_index', bodyType == '8' ? 'body_check' : '', 'bg_blue')} onClick={() => setBodyType('8')}>
              <div>蛋白率</div>
              <img src={numImage} width={30} height={8} alt="" />
            </div>
            <div className={classNames('body_index', bodyType == '9' ? 'body_check' : '', 'bg_purple')} onClick={() => setBodyType('9')}>
              <div>基础代谢</div>
              <img src={numImage} width={30} height={8} alt="" />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
export default Recording;
