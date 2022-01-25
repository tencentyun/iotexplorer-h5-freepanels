/**
 * @Description:
 * @Author: RuiXue
 * @Date: 2021-09-24 22:46:18
 * @LastEditors:
 * @LastEditTime:
 */

import React from 'react';
import { Modal, ModalProps } from '@components/base';

export interface IModalEvaporation extends ModalProps {
  isVisible: boolean; // 是否显示弹窗
  setIsVisible: Function;
}

const ModalEvaporation: React.FC<IModalEvaporation> = function (props) {
  const { isVisible, setIsVisible } = props;
  const handleClose = () => {
    console.log('close');
    setIsVisible(false);
  };
  return <Modal visible={isVisible} onClose={handleClose} />;
};

export default ModalEvaporation;
