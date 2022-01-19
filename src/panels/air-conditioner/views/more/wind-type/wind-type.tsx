/**
 * @Description:
 * @Author: RuiXue
 * @Date: 2021-10-16 11:33:05
 * @LastEditors:
 * @LastEditTime:
 */

import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import { DeviceSateContext } from '@/products/air-conditioner/deviceStateContext';
import { Cell } from '@/components/base';
import UINumberSlider from '@/components/common/number-slider/ui-number-slider';
import UpDown, { enumUpDown } from './components/up-down/up-down';
import { Modal } from '@/components/base';
import LeftRight, {
  enumLeftRight
} from '@/products/air-conditioner/views/more/wind-type/components/left-right/left-rigth';
import { apiControlDeviceData } from '@/utils/api';
import './wind-type.less';

const WindType = () => {
  const [modalType, setModalType] = useState('');
  const cRefUpDown = useRef();
  const cRefLeftRight = useRef();
  const handleCommit = () => {
    if (modalType === 'upDown') {
      (cRefUpDown.current as any).commit();
    } else {
      (cRefLeftRight.current as any).commit();
    }
  };

  const handleClose = () => {
    setModalType('');
  };

  const toggleTitleModal = () => {
    if (modalType === 'upDown') {
      return '上下摆风档位';
    }
    return '左右摆风档位';
  };
  const toggleChildren = () => {
    if (modalType === 'upDown') {
      return <UpDown cRef={cRefUpDown} />;
    }
    return <LeftRight cRef={cRefLeftRight} />;
  };

  const handleClick = (name: string) => {
    setModalType(name);
  };
  const saveWindGear = (key: string, val: string) => {
    apiControlDeviceData({
      [key]: val
    });
  };

  return (
    <DeviceSateContext.Consumer>
      {({ deviceData }) => (
        <section className={classNames('WindType-wrap')}>
          <Cell
            title="上下摆风档位"
            size="medium"
            isLink={true}
            valueStyle="gray"
            value={enumUpDown[deviceData.gear_vertical]}
            onClick={() => {
              handleClick('upDown');
            }}
          ></Cell>
          <div className={classNames('ui-number-slider-wrap')}>
            <UINumberSlider
              max={180}
              step={1}
              onChange={(value: any) => {
                saveWindGear('angle_vertical', value);
              }}
              defaultValue={deviceData.angle_vertical}
              onAfterChange={(value: any) => {
                saveWindGear('angle_vertical', value);
              }}
            />
          </div>
          <Cell
            className="cell-block"
            title="左右摆风档位"
            size="medium"
            isLink={true}
            valueStyle="gray"
            value={enumLeftRight[deviceData.gear_horizontal]}
            onClick={() => {
              handleClick('leftRight');
            }}
          ></Cell>
          <div className={classNames('ui-number-slider-wrap')}>
            <UINumberSlider
              max={180}
              step={1}
              defaultValue={deviceData.angle_horizontal}
              onChange={(value: any) => {
                saveWindGear('angle_horizontal', value);
              }}
              onAfterChange={(value: any) => {
                saveWindGear('angle_horizontal', value);
              }}
            />
          </div>
          <Modal
            title={toggleTitleModal()}
            visible={!!modalType}
            onConfirm={handleCommit}
            onClose={handleClose}
          >
            {toggleChildren()}
          </Modal>
        </section>
      )}
    </DeviceSateContext.Consumer>
  );
};

export default WindType;
