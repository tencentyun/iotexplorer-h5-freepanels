import React from 'react';
import { StatusInfo, StatusInfoType } from '../StatusInfo';

export interface EmptyTipProps extends StyledProps {
  emptyIconType?: StatusInfoType;
  emptyMessage?: string;
  fillContainer?: boolean;
}

export function EmptyTip({
  emptyIconType,
  emptyMessage,
  style,
  className,
  fillContainer,
}: EmptyTipProps) {
  return (
    <StatusInfo
      style={style}
      className={className}
      type={emptyIconType}
      message={emptyMessage}
      fillContainer={fillContainer}
    />
  );
}
