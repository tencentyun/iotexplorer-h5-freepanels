import React from 'react';
import classNames from 'classnames';
import './style.less';

type LoadingSize = 'small' | 'middle' | 'large';
interface LoadingProps {
    size: LoadingSize;
    text?: string;
    marginTop: number;
}
export function Loading(props: LoadingProps) {
  const {
    size = 'middle',
    text = '',
    marginTop = 0,
  } = props;
  return (<>
    <div
        className={classNames('loadEffect', size)}
        style={{ marginTop: `${marginTop}px` }}>
      <div><span></span></div>
      <div><span></span></div>
      <div><span></span></div>
      <div><span></span></div>
    </div>
    {text && <div className='loading-text'>{text}</div>}
  </>);
}
