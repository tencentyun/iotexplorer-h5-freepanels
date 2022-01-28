import React from 'react';
import './bormal_head.less';
import classNames from 'classnames';

export function Bormal_head () {
  // const [lampSrc] = useState(lampIcon);
  return (
        <article id={'morandi_bormal_head'} className={classNames('morandi_bormal_head')}>
          <div className="center_card">
            <div className="card_span">
                <div>净水中</div>
                <div>工作状态</div>
            </div>

            <div className="vertical"></div>

            <div className="card_span">
                <div>0℃</div>
                <div>当前温度</div>
            </div>

            <div className="vertical"></div>

            <div className="card_span">
                <div>0％</div>
                <div>脱盐率</div>
            </div>
          </div>

        </article>
  );
};

export default Bormal_head;

