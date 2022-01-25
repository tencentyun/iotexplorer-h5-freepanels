/**
 * @Description:
 * @Author: RuiXue
 * @Date: 2021-09-29 09:55:40
 * @LastEditors:
 * @LastEditTime:
 */

import React, { useState } from 'react';
import classNames from 'classnames';
import { Block } from '@components/layout';
import { Cell, Switch } from '@components/base';
import { DeviceSateContext } from '../../../deviceStateContext';
import { toggleBooleanByNumber } from '@libs/utillib';
import ModalSprayVolume, {
  enumSprayVolume
} from './modalSprayVolume/modalSprayVolume';
import ModalSprayMode, { enumSprayMode } from './modalSprayMode/modalSprayMode';
import { apiControlDeviceData } from '@hooks/useDeviceData';
import { getThemeType } from '@libs/theme';
import { onControlDevice } from '@hooks/useDeviceData';

const themeType = getThemeType();

export const enumSpray = {};

const Features2 = () => {
  const [isShowModalSprayVolume, setIsShowModalSprayVolume] = useState(false);
  const [isShowModalSprayMode, setIsShowModalSprayMode] = useState(false);

  const handleControlByAction = (key: string, value: any) => {
    apiControlDeviceData({
      [key]: value
    });
  };

  return (
    <DeviceSateContext.Consumer>
      {({ deviceData }) => (
        <article className={classNames('Features2-wrap')}>
          <Block className="setting-block">
            <Cell
              title="喷雾量"
              size="medium"
              value={enumSprayVolume[deviceData.spray_volume] || ''}
              isLink={true}
              onClick={() => {
                setIsShowModalSprayVolume(true);
              }}
            ></Cell>
            <Cell
              title="喷雾模式"
              size="medium"
              value={enumSprayMode[deviceData.spray_mode] || ''}
              isLink={true}
              onClick={() => {
                setIsShowModalSprayMode(true);
              }}
            ></Cell>
            <Cell
              title="睡眠"
              size="medium"
              isLink={false}
              value={
                <Switch
                  name="sleep"
                  theme={themeType}
                  checked={toggleBooleanByNumber(deviceData.sleep)}
                  onChange={(val: boolean) => {
                    onControlDevice('sleep', Number(val));
                  }}
                />
              }
            ></Cell>
            <Cell
              title="童锁开关"
              size="medium"
              isLink={false}
              value={
                <Switch
                  name="childjock"
                  theme={themeType}
                  checked={toggleBooleanByNumber(deviceData.childjock)}
                  onChange={(val: boolean) => {
                    onControlDevice('childjock', Number(val));
                  }}
                />
              }
            ></Cell>
            <Cell
              title="滤网寿命"
              size="medium"
              value={deviceData.filterlife}
              isLink={false}
            ></Cell>
            <Cell
              title="等离子"
              size="medium"
              isLink={false}
              value={
                <Switch
                  name="plasma"
                  theme={themeType}
                  checked={toggleBooleanByNumber(deviceData.plasma)}
                  onChange={(val: boolean) => {
                    onControlDevice('plasma', Number(val));
                  }}
                />
              }
            ></Cell>
          </Block>
          {/*喷雾量弹窗*/}
          <ModalSprayVolume
            isShow={isShowModalSprayVolume}
            onClose={() => {
              setIsShowModalSprayVolume(false);
            }}
          />
          {/*喷雾类型弹窗*/}
          <ModalSprayMode
            isShow={isShowModalSprayMode}
            onClose={() => {
              setIsShowModalSprayMode(false);
            }}
          />
        </article>
      )}
    </DeviceSateContext.Consumer>
  );
};

export default Features2;
