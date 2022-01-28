import React from 'react';
import './bormal_center.less';
import classNames from 'classnames';

export function Bormal_center() {
  // const [lampSrc] = useState(lampIcon);
  return (
    <article id={'bluewhite_bormal_center'} className={classNames('bluewhite_bormal_center')}>

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

export default Bormal_center;

