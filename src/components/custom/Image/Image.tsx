import React from 'react';
import { Image as AntImage } from 'antd-mobile';
import { CheckBox } from '@custom/CheckBox';
export interface ImageOptions extends StyledProps {
  src: string;
  checkable?: boolean;
  checked?: boolean;
  onChange?: (value: boolean) => boolean | void;
  children?: React.ReactNode;
  className?: string;
}

export function Image({
  className,
  checkable,
  onChange,
  checked,
  src,
  ...props
}: ImageOptions) {
  return (
    <div className={`cus-image ${className}`}>
      <AntImage src={src} {...props}></AntImage>
      {checkable ? (
        <div className="checked">
          <CheckBox value={!!checked} type="radio" onChange={onChange} />
        </div>
      ) : null}
    </div>
  );
}
