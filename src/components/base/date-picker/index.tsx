/*
 * @Author: wrq
 * @Date: 2021-10-04 09:22:47
 * @Description: 日期选择器
 */
import React from 'react';
import { DatePicker as AntdDatePicker } from 'antd-mobile';
import { DatePickerProps as AntdDatePickerProps } from 'antd-mobile/es/components/date-picker/date-picker';

export interface DatePickerProps extends AntdDatePickerProps {
  clasName?: string;
  title?: string;
  cancelText?: string;
  confirmText?: string;
}

export function DatePicker(props: DatePickerProps) {
  console.log(props, 1111);

  return (
    <div className="_component_base_date_picker_">
      <div className="picker-title"></div>
      <div className="picker-body">
        <AntdDatePicker {...props} />
      </div>
      <div className="picker-footer">
        <button className="button-cancel">{props.cancelText || '取消'}</button>
        <button className="button-confirm">
          {props.confirmText || '保存'}
        </button>
      </div>
    </div>
  );
}
