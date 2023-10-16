import React from 'react';
import './Cell.less';
import { iconArrowRight } from '@src/panels-next/SmartSpeaker/assets';
import { noop } from '@utillib';

export function Cell({
  icon,
  title,
  onClick = noop,
}: {
  icon: string;
  title: string;
  onClick?: () => void;
}) {
  return (
    <div className='ll-cell' onClick={onClick}>
      <div className='ll-cell-left'>
        <img className='icon' src={icon} alt='' />
        <div className='title'>{title}</div>
      </div>
      <div className='ll-cell-right'>
        <img className='icon' src={iconArrowRight} alt='' />
      </div>
    </div>
  );
}
