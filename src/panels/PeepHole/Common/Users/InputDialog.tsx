
import React, { useState, useMemo } from 'react';
import { Mask, Input } from 'antd-mobile';

export interface InputDialogProps {
  title?: string;
  visible?: boolean;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  max?: number;
  confirmText?: string;
  cancelText?: string;
  onCancel?: () => void;
  onConfirm?: (value: string) => void;
}

export function InputDialog(props: InputDialogProps) {
  const { value, defaultValue, placeholder, max } = props;
  const [inputValue, setInputValue] = useState('');

  useMemo(() => {
    if (props.visible) {
      // 显示的时候才渲染
      const val = value !== undefined ? value : defaultValue || '';
      setInputValue(val);
    }
  }, [props.visible]);

  const handleConfirm = () => {
    props.onConfirm && props.onConfirm(inputValue);
    handleCancel();
  };

  const handleCancel = () => {
    props.onCancel && props.onCancel();
  };

  const handleClear = () => {
    setInputValue('');
  };

  return (
    <Mask visible={props.visible} onMaskClick={handleCancel}>
      <div className="input-dialog-wrap">
        <header className="dialog-header">{props.title}</header>
        <main className="dialog-content">
          <div>
            <Input
              className="username"
              value={inputValue}
              placeholder={placeholder ? placeholder : '请输入用户名'}
              maxLength={max}
              clearable
              onChange={(value) => {
                setInputValue(value);
              }}
            ></Input>
          </div>
        </main>
        <footer>
          <div className="dialog-btn cancel" onClick={handleCancel}>
            取消
          </div>
          <div className="dialog-btn confirm" onClick={handleConfirm}>
            确认
          </div>
        </footer>
      </div>
    </Mask>
  );
}
