/*
 * @Author: wrq
 * @Date: 2021-10-03 21:58:48
 * @Description: dialog 组件，基于 antd 封装
 */
import React from 'react';
import { Dialog as AntdDialog } from 'antd-mobile';
import { DialogProps } from 'antd-mobile/es/components/dialog';
import { attachAntdProperties } from '../attach-antd-properties';

function Dialog(props: DialogProps) {
  return (
    <div className="_component_base_dialog_">
      <AntdDialog {...props} />
    </div>
  );
}

export default attachAntdProperties(Dialog, AntdDialog, [
  'show',
  'alert',
  'confirm'
]);
