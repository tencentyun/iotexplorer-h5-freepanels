/*
 * @Author: wrq
 * @Date: 2021-10-03 21:56:27
 * @Description: 输入框组件，基于 antd-mobile 封装
 */
import React from 'react';
import { Input as AntdInput } from 'antd-mobile';

export function Input() {
  return (
    <div className="_component_base_input_">
      <AntdInput />
    </div>
  );
}
