import React from 'react';

export function IconBattery({
  percent = 50.1,
}: {
  percent: number;
}) {
  const batteryWidth = 13 * (Math.round(percent) / 100);

  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='18' height='10' fill='none'>
      <rect width='15.2' height='9.2' x='0.4' y='0.4' stroke='#132847' strokeWidth='0.8' opacity='0.3' rx='0.6'
            style={{ strokeOpacity: 1 }}></rect>
      <rect width={batteryWidth} height='7' x='1.5' y='1.5' fill='#132847' opacity='0.75' rx='1'
            style={{ fillOpacity: 1 }}></rect>
      <path fill='#132847' fillRule='evenodd' d='M16.5 6.937V3.063a2 2 0 0 1 0 3.874Z' clipRule='evenodd'
            opacity='0.3' style={{ fillOpacity: 1 }}></path>
    </svg>
  );
}
