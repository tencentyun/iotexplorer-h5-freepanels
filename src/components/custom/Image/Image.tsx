import React, { useState } from 'react';
import { Image as AntImage } from 'antd-mobile';
import { CheckBox } from '@custom/CheckBox';
export interface ImageOptions extends StyledProps {
  checkable?: boolean;
  checked?: boolean;
  onChange?: any;
  children?: React.ReactNode;
  className?: string;
}

// TODO 扩展放大缩小
export function Image({ className, checkable, onChange, checked, ...props }: ImageOptions) {
  return (
    <div className={`cus-image ${className}`}>
      <AntImage {...props}></AntImage>
      {checkable ? (
        <div className="checked">
          <CheckBox value={!!checked} type="radio" onChange={onChange} />
        </div>
      ) : null}
    </div>
  );
}
