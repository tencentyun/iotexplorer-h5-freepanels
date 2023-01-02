import React, { useEffect, useState, useRef, ReactNode } from 'react';
import classNames from 'classnames';
import { Popup } from '@custom/Popup';
import { PickerViewGroup, OptionProps } from '@custom/Picker/PickerViewGroup';
import { Modal } from '@custom/Modal';
import { rpx2rem } from '@utillib';

export interface CustomPickerProps extends StyledProps {
    visible?: boolean;
    value?: string[];
    title?: string;
    modalTitle?: string;
    cancelText?: string;
    confirmText?: string;
    onCancel?: () => void;
    mask?: boolean;
    onConfirm?: (value: string[]) => void;
    onChange?: (value: string[]) => void;
    isPopUp?: boolean;
    isModal?: boolean;
    itemHeight?: number;
    height?: number;
    customNode?: ReactNode;
    optionValues: number[];
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

const defaultValue = [];
export function CustomPickerView(props: CustomPickerProps) {
    const {
        cancelText = '取消',
        confirmText = '保存',
        className,
        visible,
        title,
        modalTitle = '', // 模态框的标题
        value,
        mask = true,
        itemHeight = 58,
        height = 375,
        onChange,
        onCancel = () => ({}),
        onConfirm = () => ({}),
        isPopUp = true,
        isModal = false,
        customNode = null, // 自定义元素
        optionValues = [],
    } = props;
    const getDefaultValue = value => (value.length ? value : defaultValue);
    const [pickerValue, setPickerValue] = useState(getDefaultValue(value));
    const [options, setOptions] = useState([[]] as OptionProps[][]);
    const handleConfirm = () => {
        onConfirm(pickerValue as string[]);
    };

    useEffect(() => {
        setPickerValue(getDefaultValue(value));
        return () => {
            setPickerValue(defaultValue);
        };
    }, [value]);


    useEffect(() => {
        setOptions(getOptionsValue(optionValues))
    }, [optionValues])

    const getOptionsValue = (values: number[]) => {
        if (!values.length) {
            return [[]];
        }

        return [values.map(item => {
            return {
                text: item < 10 ? `0${item}°C` : `${item}°C`,
                value: item
            }
        })]
    }

    const ref = useRef(null);

    const Com = isPopUp ? Popup : Container;

    // 跟流畅的动画
    const onChangeValue = (val) => {
        setPickerValue(val);
        onChange && onChange(val);
    };

    if (!visible) return null;
    return (
        <div ref={ref} id="current-custom-picker">
            <Com
                className={classNames('custom-picker', className)}
                visible={visible}
                position="bottom"
                isModal={isModal}
                title={title}
                modalTitle={modalTitle}
                mask={mask}
                onCancel={onCancel}
                handleConfirm={handleConfirm}
                destroyOnClose={true}
                maskClassName="custom-picker-popup-mask"
            >

                {title ? <div className="picker-header center">{title}</div> : null}
                {customNode ? customNode : null}
                <div className="picker-body">
                    <PickerViewGroup
                        value={pickerValue}
                        options={options}
                        height={rpx2rem(height)}
                        itemHeight={rpx2rem(itemHeight)}
                        onScrollChange={onChangeValue}
                        onChange={onChangeValue}
                    />
                </div>

                <div className="picker-footer">
                    <button onClick={onCancel}>{cancelText}</button>
                    <button onClick={handleConfirm}>{confirmText}</button>
                </div>
            </Com>
        </div>
    );
}
