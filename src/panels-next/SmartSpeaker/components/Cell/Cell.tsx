import React from 'react';
import './Cell.less';
import { iconArrowRight } from '@src/panels-next/SmartSpeaker/assets';
import { noop } from '@utillib';
import classnames from 'classnames';

export function Cell({
  className,
  icon,
  title,
  onClick = noop,
  children,
}: Partial<{
  className: string;
  icon: string;
  title: string;
  onClick: () => void;
  children: React.ReactNode;
}>) {
  return (
    <div
      className={classnames(
        className,
        'll-cell',
        {
          'll-cell-custom': !!children,
        },
      )}
      onClick={onClick}
    >
      {children ? children : (
        <>
          <div className='ll-cell-left'>
            <img className='icon' src={icon} alt='' />
            <div className='title'>{title}</div>
          </div>
          <div className='ll-cell-right'>
            <img className='icon' src={iconArrowRight} alt='' />
          </div>
        </>
      )}
    </div>
  );
}
