/*
 * @Author: wrq
 * @Date: 2021-09-20 21:11:29
 * @Description: 训练页数据展示部分
 */
import React from 'react';
import classNames from 'classnames';
import { Row } from '@components/layout';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { useDeviceData } from '@hooks/useDeviceData';
import { formatTime } from '../trainingData';
import { StyledProps, ThemeType } from '@libs/global';
import { getThemeType } from '@libs/theme';
import './style.less';

export interface TraningCardProps extends StyledProps {
  // 训练模式
  mode?: string;
}

export function TrainingCard(props: TraningCardProps) {
  const theme: ThemeType = getThemeType();
  // 训练模式
  const mode: string = props.mode || 'free_jump';
  const [state] = useDeviceData(sdk);
  const deviceData: any = state.deviceData;

  // 实时个数
  const currentTotal = (): number => {
    const { current_count: current, target_count: target } = deviceData;

    switch (mode) {
      // 计数训练
      case 'countdown_number':
        return target - current;
      case 'countdown_time':
      case 'free_jump':
      default:
        return current;
    }
  };
  // 计时
  const currentTime = (): number => {
    const { current_time: current, target_time: target } = deviceData;

    switch (mode) {
      case 'countdown_time':
        return target - current;
      case 'countdown_number':
      case 'free_jump':
      default:
        return current;
    }
  };

  const imageSrc = () => {
    switch (theme) {
      case 'normal':
        return 'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/smart-rope/training-rope-map-normal.svg';
      case 'blueWhite':
        return 'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/smart-rope/training-rope-map-blueWhite.svg';
      case 'dark':
        return 'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/smart-rope/training-rope-map-dark.svg';
      case 'colorful':
        return 'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/smart-rope/training-rope-map-colorful.svg';
      case 'morandi':
        return 'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/smart-rope/training-rope-map-morandi.svg';
      default:
        return 'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/smart-rope/training-rope-map-normal.svg';
    }
  };

  return (
    <div className={classNames('training-card-' + theme)}>
      <div className="card-action">
        <div className="owner-data">
          <Row className="owner-item">
            <p className="key">个数</p>
            <p className="value">{currentTotal() || 0}</p>
          </Row>
          <Row className="owner-item">
            <p className="key">用时</p>
            <p className="value">
              {formatTime(currentTime() || 0)}
            </p>
          </Row>
          <Row className="owner-item">
            <p className="key">消耗（千卡）</p>
            <p className="value">
              {deviceData.current_calories ? (deviceData.current_calories / 1000).toFixed(1) : 0}
            </p>
          </Row>
        </div>

        <img className="card-image-map" src={imageSrc()} />
      </div>

      <ul className="card-data">
        <li>
          <p className="value">
            {deviceData.total_trip_on_time || '-'}
          </p>
          <p className="key">绊绳次数</p>
        </li>
        <li>
          <p className="value">
            {deviceData.current_speed || '-'}
          </p>
          <p className="key">平均速度</p>
        </li>
        <li>
          <p className="value">{deviceData.speed_max || '-'}</p>
          <p className="key">最快速度</p>
        </li>
        <li>
          <p className="value">
            {deviceData.keep_jump_max || '-'}
          </p>
          <p className="key">最大连跳</p>
        </li>
      </ul>
    </div>
  );
}
