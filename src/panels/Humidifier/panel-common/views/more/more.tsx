/**
 * @Description:
 * @Author: RuiXue
 * @Date: 2021-09-22 19:37:30
 * @LastEditors:
 * @LastEditTime:
 */

import React, { useState } from 'react';
import classNames from 'classnames';
import Features from './features/features';
import { Block } from '@components/layout';
import { Cell, Switch, Modal } from '@components/base';
import { SvgIcon } from '@components/common';
import { ListPicker } from '@components/business';

// 模版数据
import { DeviceSateContext } from '../../deviceStateContext';
import { toggleBooleanByNumber } from '@libs/utillib';
// 接口，处理属性更改
import { getThemeType } from '@libs/theme';
import { onControlDevice, apiControlDeviceData } from '@hooks/useDeviceData';
import { stringKey } from '@libs/global';

import './more.less';

/**
 * 喷雾量
 */
export const enumSprayVolume: stringKey = {
  large: '多',
  middle: '中',
  small: '少',
};
/**
 * 喷雾模式
 */
export const enumSprayMode: stringKey = {
  humidity: '潮湿',
  manual: '手动',
  auto: '自动',
  work: '工作',
  health: '健康',
  baby: '亲亲',
  sleep: '睡眠',
};

export function More() {
  const themeType = getThemeType();
  const [isShowModalSprayVolume, setIsShowModalSprayVolume] = useState(false);
  const [isShowModalSprayMode, setIsShowModalSprayMode] = useState(false);
  const [isShow, setIsShow] = useState(false);

  const handleCommit = () => {
    apiControlDeviceData({
      filter_reset: 1,
    });
  };

  const handleOpen = () => {
    setIsShow(true);
  };

  const handleClose = () => {
    setIsShow(false);
  };

  const iconColor = () => {
    if (themeType === 'colorful') {
      return {
        gradientId: 'unit',
        startColor: '#527DF4',
        endColor: '#044DFF',
        x1: '11.8644068%',
        y1: '18.182147%',
        x2: '104.602754%',
        y2: '88.2505064%',
      };
    } if (themeType === 'blueWhite') {
      return {
        gradientId: 'unit',
        startColor: '#3374FA',
        endColor: '#549CFC',
        x1: '50%',
        y1: '0%',
        x2: '50%',
        y2: '100%',
      };
    } if (themeType === 'dark') {
      return {
        gradientId: 'unit',
        startColor: '#00F0FF',
        endColor: '#704DF0',
        x1: '11.8644068%',
        y1: '18.182147%',
        x2: '104.602754%',
        y2: '88.2505064%',
      };
    } if (themeType === 'morandi') {
      return {
        color: '#576273',
      };
    }
    return {
      color: '#000000',
    };
  };

  return (
    <DeviceSateContext.Consumer>
      {({ deviceData }) => (
        <div className="more-wrap">
          {/* 功能组*/}
          <Features />
          {/* 温标切换*/}
          <Block className="unit-convert-block">
            <div className="label">
              <SvgIcon
                className="unit-convert"
                name="icon-temp-unit"
                {...iconColor()}
              />
              <span className="unit-convert-label">温标切换</span>
            </div>
            <div className="temp-btn-wrap">
              <div
                className={classNames(
                  'temp-btn',
                  deviceData.temp_unit_convert === 0 ? 'selected' : '',
                )}
                onClick={() => {
                  onControlDevice('temp_unit_convert', 0);
                }}
              >
                &#176;C
              </div>
              <div
                className={classNames(
                  'temp-btn',
                  deviceData.temp_unit_convert === 1 ? 'selected' : '',
                )}
                onClick={() => {
                  onControlDevice('temp_unit_convert', 1);
                }}
              >
                &#176;F
              </div>
            </div>
          </Block>
          {/* 滤芯复位*/}
          <article className={classNames('filter-reset-wrap')}>
            <Block className="setting-block">
              <Cell
                title="滤芯复位"
                size="medium"
                isLink={true}
                onClick={handleOpen}
              ></Cell>
            </Block>
            <Modal
              visible={isShow}
              onClose={handleClose}
              onConfirm={handleCommit}
              confirmText={'完成'}
            >
              <div className={classNames('text-align-center', 'text-margin')}>
                确定要复位滤网吗?
              </div>
            </Modal>
          </article>
          {/* 功能组*/}
          <article className={classNames('Features2-wrap')}>
            <Block className="setting-block">
              <Cell
                title="喷雾量"
                size="medium"
                value={enumSprayVolume[deviceData.spray_volume] || ''}
                valueStyle="gray"
                isLink={true}
                onClick={() => {
                  setIsShowModalSprayVolume(true);
                }}
              >
                {/* 喷雾量弹窗*/}
                <ListPicker
                  visible={isShowModalSprayVolume}
                  title="喷雾量"
                  styleType="spaceBetween"
                  theme={themeType}
                  defaultValue={[enumSprayVolume[deviceData.spray_volume]]}
                  options={[
                    { label: '多', value: 'large' },
                    { label: '中', value: 'middle' },
                    { label: '少', value: 'small' },
                  ]}
                  layoutType="middle"
                  onCancel={() => setIsShowModalSprayVolume(false)}
                  onConfirm={(value) => {
                    onControlDevice('spray_volume', value[0]);
                  }}
                />
              </Cell>
              <Cell
                title="喷雾模式"
                size="medium"
                value={enumSprayMode[deviceData.spray_mode] || ''}
                valueStyle="gray"
                isLink={true}
                onClick={() => {
                  setIsShowModalSprayMode(true);
                }}
              >
                {/* 喷雾类型弹窗*/}
                <ListPicker
                  visible={isShowModalSprayMode}
                  title="喷雾模式"
                  styleType="spaceBetween"
                  theme={themeType}
                  defaultValue={[deviceData.spray_volume]}
                  options={[
                    { label: '潮湿', value: 'humidity' },
                    { label: '手动', value: 'manual' },
                    { label: '自动', value: 'auto' },
                    { label: '工作', value: 'work' },
                    { label: '健康', value: 'health' },
                    { label: '宝宝', value: 'baby' },
                    { label: '睡眠', value: 'sleep' },
                  ]}
                  layoutType="spaceBetween"
                  onCancel={() => setIsShowModalSprayMode(false)}
                  onConfirm={(value) => {
                    onControlDevice('spray_mode', value[0]);
                  }}
                />
              </Cell>
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
                    name="child_lock"
                    theme={themeType}
                    checked={toggleBooleanByNumber(deviceData.child_lock)}
                    onChange={(val: boolean) => {
                      onControlDevice('child_lock', Number(val));
                    }}
                  />
                }
              ></Cell>
              <Cell
                title="滤网寿命"
                size="medium"
                value={deviceData.filter_life}
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
          </article>
        </div>
      )}
    </DeviceSateContext.Consumer>
  );
}
