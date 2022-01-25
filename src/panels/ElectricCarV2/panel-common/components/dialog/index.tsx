
import React, { useState, useMemo } from 'react';
import classNames from 'classnames';
import { Mask } from 'antd-mobile';
import { StyledProps } from '@libs/global';
import './index.less';

export interface AuthorizationDialogProps extends StyledProps {
  title?: string;
  visible?: boolean;
  value?: string;
  defaultValue?: string;
  confirmText?: string;
  cancelText?: string;
  onCancel?: () => void;
  onConfirm?: (value: string) => void;
}

export function AuthorizationDialog(props: AuthorizationDialogProps) {
  const {
    value,
    defaultValue,
  } = props;
  const [authorizationInfo, setAuthorizationInfo] = useState('');

  useMemo(() => {
    const val =
      value !== undefined ? value : defaultValue;

    // setCheckList(val);
  }, [props.visible]);

  const handleConfirm = () => {
    props.onConfirm && props.onConfirm(authorizationInfo);
    handleCancel();
  };

  const handleCancel = () => {
    props.onCancel && props.onCancel();
  };

  return (
    <Mask
      visible={props.visible}
      onMaskClick={handleCancel}
    >
      <div className="dialog-wrap">
        <header>{props.title}</header>
        <div className="content">
          <input
            placeholder="获取授权"
            onChange={(val) => {
              setAuthorizationInfo(val.target.value);
            }}
          ></input>
        </div>
        <footer>
          <div className="btn cancel" onClick={handleCancel}>取消</div>
          <div className="btn confirm" onClick={handleConfirm}>允许</div>
        </footer>
      </div>
    </Mask>
  );
}