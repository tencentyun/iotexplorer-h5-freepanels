import React from 'react';
import './bormal_head.less';
import classNames from 'classnames';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';

export function Bormal_head() {
  return (
        <article id={'bormal_head'} className={classNames('bormal_head')}>

              <div className="foot_card">
                <div className="card_left">
                  <img className="card_img" src="https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/purifier-water/purifier-water-purifier-normal.png" alt="" />
                </div>

                <div className="card_right">
                  <div className="font_top">
                    <div>原水TDS</div>
                    <div className="font_num">{sdk.deviceData.tds_in ? sdk.deviceData.tds_in : 0}</div>
                  </div>

                  <div className="across"></div>

                  <div className="font_foot">
                    <div>净水TDS</div>
                    <div className="font_num">{sdk.deviceData.tds_out ? sdk.deviceData.tds_out : 0}</div>
                  </div>
                </div>
              </div>

        </article>
  );
}

export default Bormal_head;

