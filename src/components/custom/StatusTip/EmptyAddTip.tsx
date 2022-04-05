import React from 'react';
import { StatusInfo, StatusInfoType } from '@custom/StatusInfo';

export interface EmptyAddTipProps extends StyledProps {
  emptyMessage?: string | React.ReactNode;
  emptyAddBtnText?: string;
  onAdd?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
  className?: string;
  fillContainer?: boolean;
  emptyIconType?: StatusInfoType;
}

export function EmptyAddTip({
  emptyMessage,
  emptyAddBtnText = '立即添加',
  onAdd,
  style,
  className,
  fillContainer,
  emptyIconType,
}: EmptyAddTipProps) {
  return (
    <StatusInfo
      message={emptyMessage}
      style={style}
      className={className}
      fillContainer={fillContainer}
      type={emptyIconType}
      buttons={[
        {
          type: 'default',
          btnText: emptyAddBtnText,
          onClick: onAdd,
          transparent: true,
        },
      ]}
    />
  );
}
