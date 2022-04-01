import React from 'react';
import classNames from 'classnames';
import { noop } from '@utillib';
import { themeColorMap } from '@constants';
import { ConfirmBtnGroup, ConfirmBtnGroupProps } from '@custom/Btn';
import { iconArrowBack } from '@icons/common';
// import './Modal.less';
import { useIpx } from '@hooks/useIpx';

export interface ModalProps extends StyledProps {
  visible: boolean;
  title?: string | React.ReactNode;
  onClose?: () => any;
  maskClosable?: boolean;
  fixedBottom?: boolean;
  children?: React.ReactNode;
  containerClassName?: string;
  showBackBtn?: boolean;
}

export function Modal({
  visible,
  title,
  onClose = noop,
  maskClosable = true,
  fixedBottom = false,
  children,
  className,
  containerClassName,
  style,
  showBackBtn = false,
}: ModalProps) {
  const ipx = useIpx();

  return (
    <div
      className={classNames('modal-container', containerClassName, {
        'modal-active': visible,
        'modal-fixed-bottom': fixedBottom,
      })}
      onTouchMove={e => e.stopPropagation()}
    >
      <div
        className="modal-mask"
        onClick={() => {
          if (maskClosable) {
            onClose && onClose();
          }
        }}
      />
      <div className={classNames('modal', className, { ipx })} style={style}>
        {title && (
          <div className="modal-header">
            {showBackBtn && (
              <div className="back-btn need-hover" onClick={onClose}>
                <img className="back-btn-icon" src={iconArrowBack} />
              </div>
            )}
            <div className="modal-title">{title}</div>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

Modal.Body = ({ children }) => <div className="modal-body">{children}</div>;

Modal.Footer = ({ children, showDivider }: { showDivider?: boolean; children?: React.ReactNode }) => (
  <div className={classNames('modal-footer')}>
    {showDivider && <Modal.Divider />}
    {children}
  </div>
);

export interface FooterConfirmBtnGroup extends ConfirmBtnGroupProps {
  confirmColor?: string;
  cancelColor?: string;
  isInFixedBottomModal?: boolean;
  noBorder?: boolean;
  btnSize?: number;
  btnFootClass?: string;
}

Modal.Divider = () => <div className="modal-divider" />;

Modal.FooterConfirmBtnGroup = ({
  onCancel,
  onConfirm,
  confirmText,
  confirmColor = themeColorMap.primary,
  confirmBtnType,
  confirmBtnDisabled,
  cancelText,
  cancelBtnDisabled,
  cancelColor = themeColorMap.weak,
  cancelBtnType,
  isInFixedBottomModal,
  noBorder,
  btnSize = 32,
  btnFootClass,
}: FooterConfirmBtnGroup) => {
  const renderContent = () => {
    if (isInFixedBottomModal) {
      return (
        <ConfirmBtnGroup
          {...{
            onCancel,
            onConfirm,
            confirmText,
            confirmBtnType,
            confirmBtnDisabled,
            cancelText,
            cancelBtnType,
            cancelBtnDisabled,
          }}
        />
      );
    }

    return (
      <div className="footer-confirm-btn-group">
        {!!cancelText && (
          <Modal.FooterBtn
            noBorder={noBorder}
            onClick={onCancel}
            className={btnFootClass}
            style={{
              color: cancelColor,
              fontSize: `${btnSize}rpx`,
            }}
          >
            {cancelText}
          </Modal.FooterBtn>
        )}
        {!!confirmText && (
          <Modal.FooterBtn
            noBorder={noBorder}
            onClick={onConfirm}
            className={btnFootClass}
            style={{
              color: confirmColor,
              fontSize: `${btnSize}rpx`,
              outline: 'none',
            }}
          >
            {confirmText}
          </Modal.FooterBtn>
        )}
      </div>
    );
  };

  return renderContent();
};

export interface FooterBtnProps extends StyledProps {
  children: React.ReactNode;
  onClick?: any;
  noBorder?: boolean;
}

Modal.FooterBtn = ({ children, onClick, style, className, noBorder }: FooterBtnProps) => (
  <button
    className={classNames('modal-footer-btn need-hover', className, {
      'no-border': noBorder,
    })}
    onClick={onClick}
    style={style}
  >
    {children}
  </button>
);

Modal.Message = ({ message }) => <div className="modal-message">{message}</div>;
