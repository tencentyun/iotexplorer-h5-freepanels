import React, { useState } from 'react';
import classNames from 'classnames';
import './addDevExplanatory.less';

import stepImage1 from '../icons/normal/step1.svg';
import stepImage2 from '../icons/normal/step2.svg';
import stepImage3 from '../icons/normal/step3.svg';

export function AddDevExplanatory() {
  return (
    <article className={classNames('explanatory-list')}>
      <ul>
        <li className="list-item">
          <div className="title">步骤1</div>
          <div className="label">插上插头</div>
          <img src={stepImage1} alt="" />
        </li>
        <li className="list-item">
          <div className="title">步骤2</div>
          <div className="label">长按复位键5秒</div>
          <img src={stepImage2} alt="" />
        </li>
        <li className="list-item">
          <div className="title">步骤3</div>
          <div className="label">确认指示灯快闪</div>
          <img src={stepImage3} alt="" />
        </li>
        <li className="list-item">
          <div className="title">确认指示灯快闪</div>
        </li>
      </ul>
    </article>
  );
}
