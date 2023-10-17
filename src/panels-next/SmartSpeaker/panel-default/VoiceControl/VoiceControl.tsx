import React, { useState } from 'react';
import './VoiceControl.less';
import { Cell } from '@src/panels-next/SmartSpeaker/components/Cell';
import { List, Switch } from 'antd-mobile';
import { iconArrowRight } from '@src/panels-next/SmartSpeaker/assets';
import { Tabs } from '@src/panels-next/SmartSpeaker/components/Tabs/Tabs';
import { useHistory } from 'react-router-dom';

const tabOptions = [
  { text: '控制设备', value: 0 },
  { text: '控制场景', value: 1 },
];

export function VoiceControl() {
  const [currentTab, setCurrentTab] = useState(tabOptions[0].value);
  const history = useHistory();

  return (
    <div className='page-voice-control'>
      <div className='setting-view'>
        <List>
          <List.Item extra={<Switch defaultChecked />}>语音麦克风</List.Item>
        </List>
      </div>

      <Tabs
        value={currentTab}
        options={tabOptions}
        onChange={setCurrentTab}
      />

      <div className={'control-list-warp'}>
        {currentTab === tabOptions[0].value && (
          <>
            <Cell
              className={'ll-cell-voice-list'}
              onClick={() => history.push('/voice-control/command-list?productCategory=ScanRobot')}
            >
              <img className='voice-img'
                   src='https://qcloudimg.tencent-cloud.cn/raw/a5c40f219a2460427093d2a3a9fb3110.png' />
              <div className='voice-text-view'>
                <div className='voice-name'>摄像头</div>
                <div className='voice-content'>“打开扫地机器人”</div>
              </div>
              <img className='icon-arrowRight' src={iconArrowRight} alt='' />
            </Cell>
            <Cell
              className={'ll-cell-voice-list'}
              onClick={() => history.push('/voice-control/command-list?productCategory=ScanRobot')}
            >
              <img className='voice-img'
                   src='https://qcloudimg.tencent-cloud.cn/raw/a5c40f219a2460427093d2a3a9fb3110.png' />
              <div className='voice-text-view'>
                <div className='voice-name'>摄像头</div>
                <div className='voice-content'>“打开客厅空气净化器”</div>
              </div>
              <img className='icon-arrowRight' src={iconArrowRight} alt='' />
            </Cell>
          </>
        )}
        {currentTab === tabOptions[1].value && (
          <Cell className={'ll-cell-voice-list'}>
            <img
              className='voice-img'
              src='https://qcloudimg.tencent-cloud.cn/raw/937809c6d2e1b61bfed863db3a0986d8.png'
            />
            <div className='voice-text-view'>
              <div className='voice-name'>阅读场景</div>
              <div className='voice-content'>“开启阅读场景”</div>
            </div>
          </Cell>
        )}
      </div>
    </div>
  );
}
