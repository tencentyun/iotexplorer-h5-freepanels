import React from 'react';
import { StatusInfoType } from '@custom/StatusInfo';
import { EmptyTip } from './EmptyTip';
import { LoadingTip } from './LoadingTip';
import { ErrorTip } from './ErrorTip';
import { EmptyAddTip } from './EmptyAddTip';

export interface StatusTipProps extends StyledProps {
  emptyType?: 'empty-add';
  status: 'loading' | 'empty' | 'error';
  onAdd?: any;
  emptyIconType?: StatusInfoType;
  emptyMessage?: string;
  emptyAddBtnText?: string;
  emptyFullScreen?: boolean;
  errorIcon?: string;
  errorTitle?: string | React.ReactNode;
  errorMessage?: string | React.ReactNode;
  onRetry?: any;
  retryText?: string;
  fillContainer?: boolean;
}

export function StatusTip({
  status,
  onAdd,

  // empty
  emptyIconType,
  emptyMessage,
  emptyType, // empty-add
  emptyAddBtnText,

  // error
  errorTitle,
  errorMessage,
  onRetry,
  retryText = '点击重试',

  // common
  fillContainer = false,
  style,
  className,
}: StatusTipProps) {
  switch (status) {
    case 'loading': {
      return <LoadingTip {...{ style, className, fillContainer }}/>;
    }
    case 'empty': {
      if (emptyType === 'empty-add') {
        return (
          <EmptyAddTip
            {...{ style, className }}
            emptyIconType={emptyIconType}
            emptyMessage={emptyMessage}
            onAdd={onAdd}
            fillContainer={fillContainer}
            emptyAddBtnText={emptyAddBtnText}
          />
        );
      }

      return (
        <EmptyTip
          style={style}
          className={className}
          emptyMessage={emptyMessage}
          emptyIconType={emptyIconType}
          fillContainer={fillContainer}
        />
      );
    }
    case 'error': {
      return (
        <ErrorTip
          className={className}
          style={style}
          errorTitle={errorTitle}
          errorMessage={errorMessage}
          onRetry={onRetry}
          retryText={retryText}
          fillContainer={fillContainer}
        />
      );
    }
  }
  return null;
}
