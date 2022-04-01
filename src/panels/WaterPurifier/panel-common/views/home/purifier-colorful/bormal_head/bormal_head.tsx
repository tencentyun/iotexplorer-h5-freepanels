import React from 'react';
import './bormal_head.less';
import classNames from 'classnames';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';

export function Bormal_head() {
  // const [lampSrc] = useState(lampIcon);
  return (
    <article id={'colorful_bormal_head'} className={classNames('colorful_bormal_head')}>
      <div className="head_card">
        <div className="card_top">
          <div className="purifier">

            <img className="purifier_img"
                 src="https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/purifier-water/purifier-water-purifier-normal.png"
                 alt=""/>

            <div className="purifier_span">
              <div className="purifier_card1">
                <div className="triangle"></div>
                <div className="span_num1">{sdk.deviceData.tds_in ? sdk.deviceData.tds_in : 0}</div>
                <div className="span_font1">原水TDS</div>
              </div>

              <div className="vertical"></div>

              <div className="purifier_card2">
                <div></div>
                <div className="span_num2">{sdk.deviceData.tds_out ? sdk.deviceData.tds_out : 0}</div>
                <div className="span_font2">净水TDS</div>
              </div>
            </div>

          </div>
        </div>
        <div className="center_card">
          <div className="card_span">
            <div>净水中</div>
            <div className="state">工作状态</div>
          </div>

          <div className="vertical"></div>

          <div className="card_span">
            <div>0℃</div>
            <div className="state">当前温度</div>
          </div>

          <div className="vertical"></div>

          <div className="card_span">
            <div>0％</div>
            <div className="state">脱盐率</div>
          </div>
        </div>
      </div>

    </article>
  );
}

export default Bormal_head;

