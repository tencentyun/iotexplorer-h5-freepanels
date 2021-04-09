import React from 'react';
import { noop } from '@utillib';
import { Modal } from '@components/Modal';
import { RawBtn } from '@components/Btn';
import './ActionSheet.less';

export interface ActionSheetProps {
  visible: boolean;
  onClose?: () => any;
  onChoose?: (value: string) => any;
  maskClosable?: boolean;
  cancelText?: string | React.ReactNode;
  cancelColor?: string;
  options: SelectorOption[];
}

export function ActionSheet({
  visible,
  onClose = noop,
  onChoose = noop,
  cancelText = '取消',
  cancelColor = '#15161A',
  maskClosable = true,
  options = [],
}: ActionSheetProps) {
  return (
    <Modal
      visible={visible}
      fixedBottom={true}
      onClose={onClose}
      maskClosable={maskClosable}
    >
      <Modal.Body>
        <div className='action-sheet-list'>
          {options.map(item => (
            <RawBtn
              key={item.value}
              className='action-sheet-item'
              onClick={() => onChoose(item.value)}
            >
              {item.text}
            </RawBtn>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Modal.FooterConfirmBtnGroup
          cancelColor={cancelColor}
          onCancel={onClose}
          cancelText={cancelText}
          noBorder={true}
        />
      </Modal.Footer>
    </Modal>
  );
}
