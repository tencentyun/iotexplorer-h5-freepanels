import React from 'react';
import { StatusInfo } from '@custom/StatusInfo';

interface LoadingTipProps extends StyledProps {
  fillContainer?: boolean;
}

export function LoadingTip({
  style,
  className,
  fillContainer,
}: LoadingTipProps) {
  return (
    <StatusInfo
      type='loading'
      style={style}
      className={className}
      fillContainer={fillContainer}
    />
  );
}
