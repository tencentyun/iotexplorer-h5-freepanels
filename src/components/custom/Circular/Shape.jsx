import React, { useState, useRef } from 'react';

// 当前只支持90度以内的角
const getShapePath = (value = 0, length) => {
  const getX = (deg, length) => length * Math.tan((deg - 180) * Math.PI / 180);
  const getP = r => Math.round(r / (length * 2) * 100);
  const deg = value % 90;
  const path = ['50% 50%'];
  if (deg <= 90) {
    const xP = getP(getX(deg / 2, length));
    const xStart = `${50 - xP}%`;
    const xEnd = `${50 + xP}%`;
    path.push(`${xStart} 100%`);
    path.push(`${xEnd} 100%`);
  }

  return {
    path: `polygon(${path.join(',')})`,
    x: getP(length - getX(deg / 2, length)),
  };
};
const Process = ({ value }) => {
  const path = getShapePath(value, 12);
  return <div className="fan-shape">
    <div className='clip-path' style={{ clipPath: path.path }}>
    </div>
  </div>;
};

export default Process;
