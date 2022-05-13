import React, { useState, useRef } from 'react';
//  手机端 按照滑动显示对应的原点位置
// 底端为0度 移动360度
const Process = ({ value }) => {
  let leftDeg = 135 + value;
  let rightDeg = -45;
  if (value > 180) {
    rightDeg = rightDeg + value - 180;
    leftDeg = -45;
  }

  return <div className="process-out">
    <div className="p-circular">
      <div className="circle">
        <div className='p-left'>
          <div className="process-left">
            <div className="circular-process " style={{ transform: `rotate(${leftDeg}deg)` }}></div>
          </div>
        </div>
      </div>
      <div className='circle'>
        <div className='p-right'>
          <div className="process-right">
            <div className="circular-process " style={{ transform: `rotate(${rightDeg}deg)` }}></div>
          </div>
        </div>
      </div>
    </div>
  </div>;
};

export default Process;
