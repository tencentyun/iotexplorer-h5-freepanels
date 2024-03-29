import React, { useMemo } from 'react';
import classNames from 'classnames';
import { Btn, BtnOptions } from './Btn';
import { isFullScreen } from '@utillib';

export interface BtnGroupProps extends StyledProps {
  children?: React.ReactNode;
  layout?: 'flex' | 'vertical';
  buttons?: BtnOptions[];
  marginTop?: number;
  standalone?: boolean;
  fixedBottom?: boolean;
  background?: string;
}

// 1. 表单底下，单个，48px 32px 0
// 2. 底下布局，68ipx，单个32px 16px
// 3. 底下布局，68ipx，双按钮水平布局，水平margin 60，竖16
// 3. 底下布局，68ipx，双按钮垂直布局，两边margin 32，中间margin28，底下16px

export function BtnGroup({
  className,
  style = {},
  marginTop = 0,
  children,
  layout = 'flex',
  buttons = [],
  standalone,
  fixedBottom,
  background,
}: BtnGroupProps) {
  const ipx = useMemo(() => isFullScreen(), []);

  return (
    <div
      className={classNames('btn-group', `btn-layout-${layout}`, className, {
        ipx,
        standalone,
        'fixed-bottom': fixedBottom,
      })}
      style={{
        marginTop: `${marginTop}rpx`,
        background,
        ...style,
      }}
    >
      {children
        ? children
        : buttons.map((btnConfig, index) => <Btn {...btnConfig} key={index} />)}
    </div>
  );
}

export interface ConfirmBtnGroupProps {
  onCancel?: (e: React.MouseEvent) => React.MouseEvent | void;
  onConfirm?: (
    res: React.MouseEvent | { error: React.MouseEvent } | void
  ) => React.MouseEvent | void;
  confirmText?: string | React.ReactNode;
  confirmBtnType?: BtnOptions['type'];
  confirmBtnDisabled?: boolean;
  cancelText?: string | React.ReactNode;
  cancelBtnType?: BtnOptions['type'];
  cancelBtnDisabled?: boolean;
}

export function ConfirmBtnGroup({
  onCancel,
  onConfirm,
  confirmText,
  confirmBtnType = 'primary',
  confirmBtnDisabled,
  cancelText,
  cancelBtnType = 'cancel',
  cancelBtnDisabled,
}: ConfirmBtnGroupProps) {
  const handleOnConfirm = (callbackType, resp: React.MouseEvent) => {
    if (callbackType === 'click') {
      onConfirm && onConfirm(resp);
    } else {
      if (callbackType === 'error') {
        onConfirm && onConfirm({ error: resp });
      }
    }
  };

  return (
    <BtnGroup className="confirm-btn-group">
      {Boolean(cancelText) && (
        <Btn
          onClick={onCancel}
          type={cancelBtnType}
          disabled={cancelBtnDisabled}
        >
          {cancelText}
        </Btn>
      )}
      <Btn
        onClick={resp => handleOnConfirm('click', resp)}
        type={confirmBtnType}
        disabled={confirmBtnDisabled}
      >
        {confirmText}
      </Btn>
    </BtnGroup>
  );
}
