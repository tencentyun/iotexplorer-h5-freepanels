/**
 * 训练
 */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useUserInfo } from '@hooks/useUserInfo';
import { PickerValue, PickerColumn } from 'antd-mobile/es/components/picker';
import { useHistory } from 'react-router-dom';
import { Block, Row, Col } from '@components/layout';
import { Hoverable, SvgIcon } from '@components/common';
import { Battery } from '@components/business';
import { TrainingData } from '../components/trainingData';
import { TrainingCard } from '../components/trainingCard';
import { ValuePicker } from '@components/business/valuePicker';
import { useDeviceData, onControlDevice, formatDeviceData } from '@hooks/useDeviceData';

import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { StyledProps, ThemeType } from '@libs/global';
import { mapsToOptions, noop } from '@libs/utillib';
import { get } from 'lodash';
import './training.less';
import { getThemeType } from '@libs/theme';
import { SkinProps } from '../skinProps';

const TRAINING_MODE = {
  FREE: 'free_jump',
  NUMBER: 'countdown_number',
  TIME: 'countdown_time',
};
const COUNTDOWN_START = 5;
let countdownTimer: any = null;
let timer: any = null;

interface ControlItemProps extends StyledProps {
  children: React.ReactNode;
  onClick?: () => void;
}
function ControlItem({
  children,
  className,
  onClick = noop,
}: ControlItemProps) {
  return (
    <Col className={classNames('training-control-item', className)}>
      <Block padding={0} onClick={onClick}>
        <Hoverable>{children}</Hoverable>
      </Block>
    </Col>
  );
}

function modeDesc(type: string) {
  switch (type) {
    case TRAINING_MODE.NUMBER:
      return '计数跳';
    case TRAINING_MODE.TIME:
      return '计时跳';
    case TRAINING_MODE.FREE:
    default:
      return '自由跳';
  }
}

export function Training() {
  const theme: ThemeType = getThemeType();
  const CurrentSkinProps: any = SkinProps[theme];

  // 接收跳转的训练类型
  const history = useHistory();
  const [userInfo, { onUpdateUserInfo }] = useUserInfo();
  const mode = get(history, 'location.state.mode', '');
  const [state] = useDeviceData(sdk);
  const deviceMaps: any = formatDeviceData(state.templateMap);

  const [modeChangeVisible, onToggleModeChange] = useState(false);
  const [currentMode, switchMode] = useState(mode);
  // 开始训练倒计时
  const [countdown, setCountdown] = useState(COUNTDOWN_START);
  const [countdownVisible, showCountdown] = useState(false);
  // 当次计时
  const [currentTime, setCurrentTime] = useState(0);
  // 总计时
  const [totalTime, setTotalTime] = useState(0);
  // 是否正在训练
  // const isStarting = state.deviceData.start === 1;
  const [isStarting, setIsStarting] = useState(false);
  // 模式选择器
  const modeColumns = (value: PickerValue[]): PickerColumn[] => {
    // 左侧列表
    const left = deviceMaps.mode ? deviceMaps.mode.map((item: any) => ({
      label: modeDesc(item.name),
      value: item.name,
    })) : [];
    // 右侧列表
    let right = [];
    if (value[0] === TRAINING_MODE.TIME) {
      right = mapsToOptions('target_time', deviceMaps);
    } else if (value[0] === TRAINING_MODE.NUMBER) {
      right = mapsToOptions('target_count', deviceMaps);
    } else {
      right = ['-'];
    }

    return [left, right];
  };

  useEffect(() => {
    onToggleModeChange(true);
  }, [mode]);

  // useEffect(() => {
  //   switchMode(state.deviceData.mode);
  // }, [state.deviceData.mode]);

  useEffect(() => {
    if (countdown <= 0) {
      clearInterval(countdownTimer);
      // 关闭倒计时显示
      showCountdown(false);
      // 正计时开始
      setIsStarting(true);
      // 计时处理
      timeStartHandle();
    }
  }, [countdown]);

  useEffect(() => {
    if (deviceMaps.target_time) {
      if (currentTime === deviceMaps.target_time * 60) {
        console.log(currentTime, '=====currentTime');
        clearInterval(timer);
        // 关闭倒计时显示
        setIsStarting(false);
        onControlDevice('pause', 0);
      }
    }
  }, [currentTime]);

  // 准备～倒计时
  const handleCountdown = () => {
    // 开始、暂停、继续
    if (!isStarting) {
      if (!timer) {
        setCountdown(COUNTDOWN_START);
        showCountdown(true);
        countdownTimer = setInterval(() => {
          setCountdown((val: number) => val - 1);
        }, 1000);
        onControlDevice('start', 1);
      } else {
        setIsStarting(true);
        timeStartHandle();
      }
    } else {
      // 停止
      clearInterval(timer);
      setIsStarting(false);
      onControlDevice('pause', 0);
    }
  };
  // 正计时开始处理
  const timeStartHandle = () => {
    // 开始计时
    timer = setInterval(() => {
      setCurrentTime((val: number) => val + 1);
      setTotalTime((val: number) => val + 1);
    }, 1000);
  };
  // 停止，清零，重置
  const timeStoptHandle = () => {
    if (currentTime > 0) {
      setIsStarting(false);
      clearInterval(timer);
      timer = null;
      setCountdown(COUNTDOWN_START);
      setCurrentTime(0);
    }
  };

  return (
    <div className={classNames(`training-container-${theme}`)}>
      {/* 头部状态栏 */}
      {theme !== 'dark'
        && <Block className="training-head">
          <div className="device-connect-status">
            <SvgIcon
              name="icon-avatar"
              {...CurrentSkinProps.avatar}
            />
            <p className="avatar-name">{userInfo.nickName || '昵称'}</p>
          </div>

          <Battery
            value={sdk.deviceData.battery_state}
            isShowTip={false}
            isShowPercent={true}
            {...CurrentSkinProps.battery}
          />
        </Block>
      }

      <Block className="training-card">
        <TrainingCard mode={currentMode} time={currentTime}/>
      </Block>

      {/* 控制区域 */}
      <Row className="training-control">
        <ControlItem
          className={classNames('control-item control-stop', {
            is_disabled: !isStarting,
          })}
          onClick={timeStoptHandle}
        >
          <div className="item-inner">
            <SvgIcon
              className="control-icon"
              name="icon-training-stop"
              {...CurrentSkinProps[currentTime > 0 ? 'stopActive' : 'stop']}
            />
          </div>
        </ControlItem>
        <ControlItem className="control-item control-start" onClick={handleCountdown}>
          <div className="item-inner">
            <SvgIcon
              className="control-icon"
              name={`icon-training-${isStarting ? 'pause' : 'start'}`}
              color="#0F0F0F"
              {...CurrentSkinProps[isStarting ? 'pause' : 'start']}
            />
          </div>
        </ControlItem>
        <ControlItem
          className="control-item control-change"
          onClick={() => {
            onToggleModeChange(true);
          }}
        >
          <div className="item-inner">
            <div className="item-title">
              {modeDesc(currentMode)}
            </div>
            <div className="font_line_1">类型选择</div>
          </div>
        </ControlItem>
      </Row>

      <TrainingData
        title="今日数据"
        totalCount={0}
        titalTime={totalTime}
        totalCalories={0}/>

      {theme === 'dark'
        && <Block className="training-head" padding="70px 57px 68px 89px">
          <div className="device-connect-status">
            <SvgIcon
              name="icon-avatar"
              width={56}
              height={62}
              {...CurrentSkinProps.avatar}
            />
            <p className="avatar-name">姓名</p>
          </div>

          <Battery
            value={sdk.deviceData.battery_state}
            isShowTip={false}
            isShowPercent={true}
            {...CurrentSkinProps.battery}
          />
        </Block>
      }

      {/* 类型训练类型选择 */}
      <ValuePicker
        visible={modeChangeVisible}
        title="类型选择"
        value={[currentMode]}
        columns={modeColumns}
        onCancel={() => onToggleModeChange(false)}
        onConfirm={(value) => {
          const [mode, val] = value;

          onControlDevice('mode', mode);
          if (mode === TRAINING_MODE.NUMBER) {
            onControlDevice('target_count', +(val || '0'));
          } else if (mode === TRAINING_MODE.TIME) {
            onControlDevice('target_time', +(val || '0'));
          }
          onToggleModeChange(false);
        }}
      />

      {/* 倒计时 */}
      <div
        className={classNames('countdown-view', {
          is_hidden: !countdownVisible,
        })}
      >
        <span>{countdown}</span>
      </div>
    </div>
  );
}
