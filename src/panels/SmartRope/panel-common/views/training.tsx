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
import { useDeviceData } from '@hooks/useDeviceData';
import { onControlDevice, formatDeviceData } from '@hooks/useDeviceData';
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
  TIME: 'countdown_time'
};
const COUNTDOWN_START = 5;

interface ControlItemProps extends StyledProps {
  children: React.ReactNode;
  onClick?: () => void;
}
function ControlItem({
  children,
  className,
  onClick = noop
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
  let startTimer: any = null;
  // 接收跳转的训练类型
  const history = useHistory();
  const [userInfo, { onUpdateUserInfo }] = useUserInfo();
  const mode = get(history, 'location.state.mode', '');
  const [state] = useDeviceData(sdk);
  const deviceMaps: any = formatDeviceData(state.templateMap);

  const [modeChangeVisible, onToggleModeChange] = useState(false);
  const [currentMode, switchMode] = useState(mode);
  // 开始训练倒计时
  const [countdown, setCountdown] = useState(-1);
  const [countdownVisible, showCountdown] = useState(false);
  // 是否正在训练
  const isStarting = state.deviceData.start === 1;
  // 模式选择器
  const modeColumns = (value: PickerValue[]): PickerColumn[] => {
    // 左侧列表
    const left = deviceMaps['mode'].map((item: any) => ({
      label: modeDesc(item.name),
      value: item.name
    }));
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
    onToggleModeChange(false);
  }, [mode]);

  useEffect(() => {
    switchMode(state.deviceData.mode);
  }, [state.deviceData.mode]);

  useEffect(() => {
    if (countdown < 0) {
      clearTimeout(startTimer);
      showCountdown(false);

      // 向sdk提交数据
      onControlDevice('pause', 0);
      onControlDevice('start', 1);
      return;
    }

    clearTimeout(startTimer);
    startTimer = setTimeout(() => {
      setCountdown((val: number) => val - 1);
    }, 1000);

    return () => {
      clearTimeout(startTimer);
    };
  }, [countdown]);

  // 停止训练
  const onStop = () => {
    if (!isStarting) return;

    onControlDevice('pause', 1);
    onControlDevice('start', 0);
  };
  // 开始训练
  const onStart = () => {
    if (isStarting) {
      // 暂停
      onControlDevice('pause', 1);
      onControlDevice('start', 0);
      return;
    }

    handleStart();
  };

  const handleStart = () => {
    showCountdown(true);
    // 开始计时
    handleCountdown(true);
  };

  const handleCountdown = (val = true) => {
    if (!val) {
      clearTimeout(startTimer);
      return;
    }

    setCountdown(COUNTDOWN_START);
  };

  return (
    <div className={classNames('training-container-' + theme)}>
      {/* 头部状态栏 */}
      {theme !== 'dark' &&
        <Block className="training-head" padding="70px 57px 68px 89px">
          <div className="device-connect-status">
            <SvgIcon
              name="icon-avatar"
              width={56}
              height={62}
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

      <Block className="training-card" padding="54px 49px 52px 87px">
        <TrainingCard mode={currentMode} />
      </Block>

      {/* 控制区域 */}
      <Row className="training-control">
        <ControlItem
          className={classNames('control-item control-stop', {
            is_disabled: !isStarting
          })}
          onClick={onStop}
        >
          <div className="item-inner">
            <SvgIcon className="control-icon" name="icon-training-stop" color="#B8C6D3"/>
          </div>
        </ControlItem>
        <ControlItem className="control-item control-start" onClick={onStart}>
          <div className="item-inner">
            <SvgIcon
              className="control-icon"
              name={`icon-training-${isStarting ? 'pause' : 'start'}`}
              color="#0F0F0F"
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
            <div className="item-title font_line_3 color_1">
              {modeDesc(currentMode)}
            </div>
            <div className="font_line_1">类型选择</div>
          </div>
        </ControlItem>
      </Row>

      <TrainingData
        title="今日数据"
        totalCount={0}
        titalTime={0}
        totalCalories={0}/>

      {theme === 'dark' &&
        <Block className="training-head" padding="70px 57px 68px 89px">
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
        onConfirm={value => {
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
          is_hidden: !countdownVisible
        })}
      >
        <span>{countdown}</span>
      </div>
    </div>
  );
}
