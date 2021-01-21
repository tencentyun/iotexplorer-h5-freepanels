import React, { useState, useMemo } from 'react';
import { noop, rpx2px } from '@utillib';
import { Modal } from '@components/Modal';
import { BtnOptions } from '@components/Btn/Btn';
import { CheckBoxGroup } from '@components/CheckBox';
import './CheckBoxModal.less';

export function CheckBoxModal({
  visible,
  value,
  onChange = noop,
  onClose = noop,
  options = [],
  title,
  showBackBtn,
  confirmText = '保存',
  cancelText = '取消',
  cancelBtnType,
}: {
  visible: boolean;
  value: string;
  onChange: (value: string) => any;
  options: SelectorOption[];
  title: string | React.ReactNode;
  onClose: () => any;
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
      containerClassName='device-shortcut-modal'
      showBackBtn={showBackBtn}
    >
      <Modal.Body>
        <div className='checkbox-scrolly-container'>
          <CheckBoxGroup
            options={options}
            value={localValue}
            onChange={setLocalValue}
            type='radio'
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
