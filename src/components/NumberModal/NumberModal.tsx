import React, { useState, useMemo } from 'react';
import { noop } from '@utillib';
import { Modal } from '@components/Modal';
import { RawBtn } from '@components/Btn';
import { Slider } from "@components/Slider/Slider";
import iconPlus from './plus.svg';
import iconMinus from './minus.svg';
import { DeviceDataModalProps } from './index';
import './NumberModal.less';

const BtnType = {
  Add: 'Add',
  Minus: 'Minus',
};

export function NumberModal({
  visible,
  templateId,
  templateConfig,
  value: outerValue,
  onChange = noop,
  onClose = noop,
  showBackBtn,
  confirmText = '保存',
  cancelText = '取消',
  cancelBtnType,
}: DeviceDataModalProps) {
  let {
    name,
    define: {
      type = '',
      start = 0,
      step = 0,
      max = 0,
      min = 0,
      unit = '',
    } = {},
  } = templateConfig || {};

  min = +min;
  max = +max;
  start = +start;
  step = +step;

  const [value, setValue] = useState(typeof outerValue === 'undefined' ? start : outerValue);

  const valueLeft = useMemo(() => (value - min) * 100 / (max - min), [value]);

  const onClickBtn = (btnType) => {
    const prevValue = +value;

    switch (btnType) {
      case BtnType.Add:
        if (prevValue + step >= max) {
          setValue(max);
        } else {
          let nextValue = prevValue + step;
          if (type === 'float' && !!nextValue) {
            nextValue = +(nextValue.toFixed(3));
          }
          setValue(nextValue);
        }
        break;
      case BtnType.Minus:
        if (prevValue - step <= min) {
          setValue(min);
        } else {
          let nextValue = prevValue - step;
          if (type === 'float' && !!nextValue) {
            nextValue = +(nextValue.toFixed(3));
          }
          setValue(nextValue);
        }
        break;
    }
  };

  const onSliderChange = (value) => {
    setValue(value);
  };

  return (
    <Modal
      visible={visible}
      fixedBottom={true}
      onClose={onClose}
      title={name}
      containerClassName='device-shortcut-modal'
      showBackBtn={showBackBtn}
    >
      <Modal.Body>
        <div className='number-control-modal'>
          <RawBtn className='slider-btn minus' onClick={() => onClickBtn(BtnType.Minus)}>
            <img
              className='slider-btn-icon'
              src={iconMinus}
            />
          </RawBtn>

          <div className='slider-container clearfix'>
            <div
              className='number-control-value'
              style={{
                left: `${valueLeft}%`,
              }}
            >
              {value}{unit}
            </div>
            <Slider
              className='water-heater-slider'
              step={step}
              max={max}
              min={min}
              value={value}
              onChange={onSliderChange}
            />
          </div>

          <RawBtn className='slider-btn plus' onClick={() => onClickBtn(BtnType.Add)}>
            <img
              className='slider-btn-icon'
              src={iconPlus}
            />
          </RawBtn>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Modal.FooterConfirmBtnGroup
          confirmText={confirmText}
          cancelText={cancelText}
          cancelBtnType={cancelBtnType}
          isInFixedBottomModal={true}
          onConfirm={() => onChange(templateId, value)}
          onCancel={onClose}
        />
      </Modal.Footer>
    </Modal>
  );
}
