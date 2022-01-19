/**
 * @Description:
 * @Author: RuiXue
 * @Date: 2021-10-30 16:18:21
 * @LastEditors:
 * @LastEditTime:
 */
import React, { useState } from 'react';
import { List } from 'antd-mobile';
import { DeviceSateContext } from '@/products/air-conditioner/deviceStateContext';
import { Modal } from '@/components/base';
import UINumberSlider from '@/components/common/number-slider/ui-number-slider';
import { apiControlDeviceData } from '@/utils/api';

const SetTemp = () => {
  const [isShow, setIsShow] = useState(false);
  const [val, setVal] = useState(0);

  const handleCommit = (key: string) => {
    apiControlDeviceData({
      [key]: val
    });
  };

  const handleClose = () => {
    setIsShow(false);
  };

  return (
    <DeviceSateContext.Consumer>
      {({ deviceData }) => (
        <>
          <List.Item
            prefix={'湿度设置'}
            extra={(deviceData.humidity_set || 0) + '%'}
            onClick={() => {
              setIsShow(true);
            }}
          />

          <Modal
            title={'湿度设置'}
            visible={isShow}
            onConfirm={() => {
              handleCommit('humidity_set');
            }}
            onClose={handleClose}
          >
            <div style={{ paddingTop: '10px' }}>
              <UINumberSlider
                max={100}
                min={0}
                defaultValue={deviceData.humidity_set}
                onChange={(value: number) => {
                  setVal(value);
                }}
              />
            </div>
          </Modal>
        </>
      )}
    </DeviceSateContext.Consumer>
  );
};

export default SetTemp;
