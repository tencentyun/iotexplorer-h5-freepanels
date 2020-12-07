import React from 'react';
import { noop } from '@utillib';
import { StatusInfo } from '../StatusInfo';

export interface ErrorTipProps extends StyledProps {
  errorTitle?: string | React.ReactNode;
  errorMessage?: string | React.ReactNode;
  errorIcon?: string;
  onRetry?: any;
  retryText?: string | React.ReactNode;
  fillContainer?: boolean;
}

export function ErrorTip({
  errorTitle,
  errorMessage,
  onRetry = noop,
  retryText,
  style,
  className,
  fillContainer,
}: ErrorTipProps) {
  return (
    <StatusInfo
      style={style}
      className={className}
      type='warning'
      title={errorTitle}
      message={errorMessage}
      fillContainer={fillContainer}
      buttons={[
        {
          btnText: retryText,
          onClick: onRetry,
          type: 'primary',
          transparent: true,
        },
      ]}
    />
  );
}
