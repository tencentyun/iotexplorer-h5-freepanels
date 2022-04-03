import React, { useState } from 'react';
import { noop } from '@utillib';
import { Modal } from '../Modal';
import { BtnOptions } from '../Btn/Btn';
import { CheckBoxGroup } from '../CheckBox';

export function CheckBoxModal({
  visible,
  value,
  onChange = noop,
  onClose,
  options = [],
  title,
  showBackBtn,
  confirmText = '保存',
  cancelText = '取消',
  cancelBtnType,
}: {
  visible: boolean;
  value: string | string[];
  onChange: (value: string | string[] | void) => void;
  options: SelectorOption[];
  title: string | React.ReactNode;
  onClose?: (e: React.MouseEvent) => React.MouseEvent;
  showBackBtn?: boolean;
  confirmText?: string;
  cancelText?: string;
  cancelBtnType?: BtnOptions['type'];
}) {
  const [localValue, setLocalValue] = useState(value);

  return (
    <Modal
      visible={visible}
      fixedBottom={true}
      onClose={onClose}
      title={title}
      containerClassName="device-shortcut-modal"
      showBackBtn={showBackBtn}
    >
      <Modal.Body>
        <div className="checkbox-scroll-container">
          <CheckBoxGroup
            options={options}
            value={localValue}
            onChange={setLocalValue}
            type="radio"
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Modal.FooterConfirmBtnGroup
          confirmText={confirmText}
          cancelText={cancelText}
          cancelBtnType={cancelBtnType}
          isInFixedBottomModal={true}
          onConfirm={() => onChange(localValue)}
          onCancel={onClose}
        />
      </Modal.Footer>
    </Modal>
  );
}
