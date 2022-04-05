import React, { useEffect, useState } from 'react';
import './oven_foot.less';
import classNames from 'classnames';
import End_Prompt from '../../pop-up/end_prompt/end_prompt';
import FinishPrompt from '../../pop-up/finish_prompt/finish_prompt';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { apiControlDeviceData } from '@hooks/useDeviceData';

export function Oven_foot() {
  const [selectFinishPrompt, theFinishPrompt] = useState(false);
  const [selectEnd_Prompt, theEnd_Prompt] = useState(false);
  const [cookingState, setCookingState] = useState();

  useEffect(() => {
    const getWorkState = async () => {
      if (sdk.deviceData.work_state === '6') {
        theFinishPrompt(true);
      }
    };
    getWorkState();
  }, []);
  const onBeginCook = () => {
    apiControlDeviceData({
      power_switch: 1,
      work_state: '0',
      operation_control: '0',
    });
    setCookingState(0);
  };
  const onPause_Prompt = () => {
    apiControlDeviceData({ work_state: '5', operation_control: '1' });
  };
  const onContinue_Prompt = () => {
    apiControlDeviceData({ work_state: '1', operation_control: '0' });
  };
  const onClose = () => {
    apiControlDeviceData({ power_switch: 0 });
  };
  const onEnd_Prompt = () => {
    theEnd_Prompt(true);
  };

  const get_foot_card = () => {
    if (sdk.deviceData.power_switch != 1) {
      return (
        <div className="foot_card">
          <div className="card_font" onClick={onBeginCook}>
            立即开始
          </div>
        </div>
      );
    }
    if (sdk.deviceData.work_state === '1') {
      return (
          <div className="foot_card">
            <div className="card_font" onClick={onEnd_Prompt}>
              结束
            </div>
            <div className="card_font" onClick={onPause_Prompt}>
              暂停
            </div>
          </div>
      );
    } if (sdk.deviceData.work_state === '5') {
      return (
          <div className="foot_card">
            <div className="card_font" onClick={onEnd_Prompt}>
              结束
            </div>
            <div className="card_font" onClick={onContinue_Prompt}>
              继续
            </div>
          </div>
      );
    }
    return (
          <div className="foot_card">
            <div className="card_font" onClick={onClose}>
              关机
            </div>
          </div>
    );
  };

  return (
    <article id={'oven_foot'} className={classNames('oven_foot')}>
      {get_foot_card()}
      <End_Prompt
        isShow={selectEnd_Prompt}
        onClose={() => {
          theEnd_Prompt(false);
        }}
      />
      <FinishPrompt
        isShow={selectFinishPrompt}
        onClose={() => {
          theFinishPrompt(false);
        }}
      />
    </article>
  );
}

export default Oven_foot;
