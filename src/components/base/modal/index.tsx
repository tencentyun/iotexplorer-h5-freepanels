/*
 * @Author: wrq
 * @Date: 2021-09-19 22:41:27
 * @Description: 对话框组件
 */
import React from 'react';
import { withMask, MaskWrapperProps } from '../../common/mask';
import styled from 'styled-components';
import './style.less';
import { noop } from '@libs/utillib';

const Main = styled.div`
  z-index: ${(props: MaskWrapperProps) => props.zIndex || 999};
`;

export interface ModalProps extends StyledProps {
  visible?: boolean;
  title?: string;
  // 弹窗内容
  content?: string | React.ReactNode;
  // 点击蒙层是否允许关闭
  maskClose?: boolean;
  confirmText?: string;
  cancelText?: string;
  onClose?: () => void;
  onConfirm?: () => void;
  onToggleMask?: Function;
  zIndex?: number;
  children?: React.ReactNode;
}

export const Modal = withMask(({
  visible,
  title,
  content,
  cancelText,
  confirmText,
  className,
  zIndex,
  children,
  onClose = noop,
  onConfirm = noop,
  onToggleMask = noop,
}: ModalProps) => {
  const onOk = function () {
    onConfirm();
    onCancel();
  };

  // 关闭弹窗
  const onCancel = function () {
    onClose();
    onToggleMask(false);
  };

  if (!visible) {
    return null;
  }
  return (
      <Main
        className={['_component_base_modal_', className].join(' ')}
        zIndex={zIndex}
      >
        <div className="modal-inner">
          <div className="modal-header">
            {title ? <p className="modal-title">{title}</p> : null}
          </div>
          <div className="modal-body">{content || children}</div>
          {/* 底部按钮 */}
          <div className="modal-footer">
            <div className="footer-buttons">
              <button className="button-cancel" onClick={onCancel}>
                {cancelText || '取消'}
              </button>
              <button className="button-confirm" onClick={onOk}>
                {confirmText || '确定'}
              </button>
            </div>
          </div>
        </div>
      </Main>
  );
});
