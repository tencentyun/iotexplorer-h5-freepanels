import React, { useEffect, useState, useRef, ReactNode } from 'react';
import classNames from 'classnames';
import { Popup } from '@custom/Popup';
import { Switch } from '@custom/Switch';
import { TimePickerView } from '@custom/Picker';
import { Modal } from '@custom/Modal';

export interface TimePickerProps extends StyledProps {
  visible?: boolean;
  value?: string[];
  title?: string;
  modalTitle?: string;
  unit?: string;
  showUnit?: boolean;
  showTime?: boolean;
  isTimeRange?: boolean;
  isShowUnit?: boolean;
  cancelText?: string;
  showSemicolon?: boolean;
  selectFlag?: string;
  confirmText?: string;
  onCancel?: () => void;
  showTwoDigit?: boolean;
  mask?: boolean;
  onConfirm?: (value: string[], isChecked: boolean) => void;
  onChange?: (value: string[]) => void;
  isPopUp?: boolean;
  isModal?: boolean;
  isShowSwitch?: boolean;
  switchIsOpen?: boolean;
  onSwitchChange?: (value: boolean) => void;
  itemHeight?: number;
  height?: number;
  isSecond?: boolean;
  customNode?: ReactNode;
}

const Container = ({ children, className, isModal, modalTitle, ...props }) => {
  console.log("-0----------visible", props.visible);

  return isModal ? <Modal
    visible={props.visible}
    fixedBottom={false}
    className="timer-modal"
    // onClose={onClose}
    title={modalTitle}
    containerClassName="device-shortcut-modal"
    showBackBtn={false}
  >
    <Modal.Body>
      <div className={`${className} timer-modal-content`} {...props}>
        {children}
      </div>
    </Modal.Body>
    <Modal.Footer>
      <Modal.FooterConfirmBtnGroup
        confirmText={'保存'}
        cancelText={'取消'}
        // cancelBtnType={cancelBtnType}

        isInFixedBottomModal={true}
        onConfirm={props.handleConfirm || (() => { })}
        onCancel={props.onCancel || (() => { })}
      />
    </Modal.Footer>
  </Modal>
    : <div className={`${className} un-pop`} {...props}>
      {children}
    </div>
};

const defaultValue = ['00', '00'];
export function TimePicker(props: TimePickerProps) {
  const {
    cancelText = '取消',
    confirmText = '保存',
    showTime = true,
    className,
    visible,
    title,
    modalTitle = '', // 模态框的标题
    showUnit, // 是否显示时、分的单位
    showSemicolon, // 是否显示分号
    value,
    mask = true,
    showTwoDigit = true,
    itemHeight = 58,
    height = 175,
    onChange,
    onCancel = () => ({}),
    onConfirm = () => ({}),
    isPopUp = true,
    isModal = false,
    isShowSwitch = false,
    switchIsOpen,
    isTimeRange,
    onSwitchChange,
    isSecond,
    customNode = null, // 自定义元素
  } = props;
  const getDefaultValue = value => (value.length ? value : defaultValue);
  const [pickerValue, setPickerValue] = useState(getDefaultValue(value));
  const [isChecked, setChecked] = useState(switchIsOpen);
  const handleConfirm = () => {
    onConfirm(pickerValue as string[], isChecked as boolean);
  };
  useEffect(() => {
    setChecked(switchIsOpen);
  }, [switchIsOpen, visible]);

  useEffect(() => {
    setPickerValue(getDefaultValue(value));
    return () => {
      setPickerValue(defaultValue);
    };
  }, [value]);

  const time = pickerValue.length ? pickerValue : defaultValue;
  const ref = useRef(null);

  const Com = isPopUp ? Popup : Container;

  let formatValue = time;
  if (showTwoDigit) {
    formatValue = time.map((v: string) => (parseInt(v, 10) < 10 ? `0${parseInt(v, 10)}` : v));
  }
  // 跟流畅的动画
  const onChangeValue = (val) => {
    setPickerValue(val);
    onChange && onChange(val);
  };

  if (!visible) return null;
  return (
    <div ref={ref} id="current-time">
      <Com
        className={classNames('cus-time-picker', className, isTimeRange ? 'cus-time-picker-range' : '')}
        visible={visible}
        position="bottom"
        isModal={isModal}
        title={title}
        modalTitle={modalTitle}
        mask={mask}
        onCancel={onCancel}
        handleConfirm={handleConfirm}
        destroyOnClose={true}
        maskClassName="time-picker-popup-mask"
      >

        {title ? <div className="picker-header center">{title}</div> : null}
        {showTime ? <div className="picker-show-time">{formatValue.join(':')}</div> : null}
        {customNode ? customNode : null}
        <div className="picker-body">
          <TimePickerView
            value={formatValue}
            itemHeight={`${itemHeight}`}
            height={`${height}`}
            isTimeRange={isTimeRange}
            showTwoDigit={showTwoDigit}
            showUnit={showUnit}
            showSemicolon={showSemicolon}
            onScrollChange={onChangeValue}
            onChange={onChangeValue}
            isSecond={isSecond}
          />
        </div>
        {isShowSwitch ? (
          <div className="picker-action">
            <span>倒计时开关</span>
            <Switch checked={isChecked} onChange={onSwitchChange || setChecked} />
          </div>
        ) : null}

        <div className="picker-footer">
          <button onClick={onCancel}>{cancelText}</button>
          <button onClick={handleConfirm}>{confirmText}</button>
        </div>
      </Com>
    </div>
  );
}
