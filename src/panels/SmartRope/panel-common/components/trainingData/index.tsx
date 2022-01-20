/*
 * @Author: wrq
 * @Date: 2021-09-20 16:31:19
 * @Description: 首页数据统计部分
 */
import React from 'react';
import classNames from 'classnames';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { Block, Row, Col } from '../../../../components/layout';
import { useDeviceData } from '@/hooks/useDeviceData';
import { zeroize } from '@/utils';
import { getThemeType } from '@/business';
import { ThemeType } from '@/global';
import './style.less';

export interface TrainingDataProps {
  title: string;
  titleIcon?: React.ReactNode;
  totalCount: number;
  titalTime: number;
  totalCalories: number;
}

export function formatTime(time: number): string {
  if (!time) {
    return '00:00';
  }
  let s: number = time;
  const h: number = Math.floor(s / 3600);
  s %= 3600;
  const m: number = Math.floor(s / 60);
  s %= 60;

  const res = zeroize(m) + ':' + zeroize(s);
  if (h > 0) {
    return zeroize(h) + ':' + res;
  }
  return res;
}

export function TrainingData({
  title,
  titleIcon,
  totalCount,
  titalTime,
  totalCalories
}: TrainingDataProps) {
  const theme: ThemeType = getThemeType();
  const isEmpty = false;
  const [state] = useDeviceData(sdk);
  const deviceData: any = state.deviceData;

  return (
    <Block
      className={
        classNames(
          'training-data-area-' + theme,
          { is_empty: isEmpty }
        )
      }
    >
      {!isEmpty ? (
        <>
          <p className="data-title">
            {/* 左侧图标 */}
            {titleIcon ? (
              <span className="title-icon">{titleIcon}</span>
            ) : null}
            {title}
          </p>
          <Row>
            <Col className="data-fields" span={4}>
              <span className="data-value">{totalCount || 0}</span>
              <p className="data-desc">总次数</p>
            </Col>
            <Col className="data-fields" span={4}>
              <span className="data-value">
                {formatTime(titalTime || 0)}
              </span>
              <p className="data-desc">总时长</p>
            </Col>
            <Col className="data-fields" span={4}>
              <span className="data-value">
                {totalCalories || 0}
              </span>
              <p className="data-desc">总卡路里</p>
            </Col>
          </Row>
        </>
      ) : null}
    </Block>
  );
}
