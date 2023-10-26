import React, { useState } from 'react';
import './VoiceControl.less';
import { Cell } from '@src/panels-next/SmartSpeaker/components/Cell';
import { List, Switch } from 'antd-mobile';
import { iconArrowRight } from '@src/panels-next/SmartSpeaker/assets';
import { Tabs } from '@src/panels-next/SmartSpeaker/components/Tabs/Tabs';
import { useHistory } from 'react-router-dom';
import { useControlCommandList } from '@src/panels-next/SmartSpeaker/panel-default/VoiceControl/hooks';
import { StatusTip } from '@components/StatusTip';
import { useManualScene } from '@hooks/useManualScene';
import { useDeviceStore } from '@src/panels-next/PanelWrap';

const tabOptions = [
  { text: '控制设备', value: 0 },
  { text: '控制场景', value: 1 },
];

export function VoiceControl() {
  const [currentTab, setCurrentTab] = useState(tabOptions[0].value);
  const history = useHistory();

  const { deviceData, controlDeviceData } = useDeviceStore();

  const { data: commandList = [], isLoading: isLoadingCommand } = useControlCommandList();
  const { data: manualSceneList = [], isLoading: isLoadingScene } = useManualScene();

  if (isLoadingCommand || isLoadingScene) {
    return <StatusTip status='loading' fillContainer />;
  }

  return (
    <div className='page-voice-control'>
      <div className='setting-view'>
        <List>
          <List.Item
            extra={(
              <Switch
                checked={!!deviceData.mic_switch}
                onChange={() => controlDeviceData({
                  mic_switch: !!deviceData.mic_switch ? 0 : 1,
                })}
              />
            )}>
            语音麦克风
          </List.Item>
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
            {commandList.length ? (
              <>
                {commandList.map(item => (
                  <Cell
                    className={'ll-cell-voice-list'}
                    onClick={() => history.push(`/voice-control/command-list?productCategory=${item.CategoryId}`)}
                    key={item.CategoryId}
                  >
                    <img className='voice-img' src={item.CategoryIcon} />
                    <div className='voice-text-view'>
                      <div className='voice-name'>{item.CategoryName}</div>
                      <div className='voice-content'>“{item.CommandConfig.MainCommand}”</div>
                    </div>
                    <img className='icon-arrowRight' src={iconArrowRight} alt='' />
                  </Cell>
                ))}
              </>
            ) : (
              <StatusTip status={'empty'} emptyMessage={'家庭下暂无可控设备'} fillContainer />
            )}
          </>
        )}
        {currentTab === tabOptions[1].value && (
          <>
            {manualSceneList.length ? (
              <>
                {manualSceneList.map(item => (
                  <Cell className={'ll-cell-voice-list'}>
                    <div
                      className='voice-img'
                      style={{
                        backgroundImage: `url("${item.SceneIcon}")`,
                      }}
                    />
                    <div className='voice-text-view'>
                      <div className='voice-name'>{item.SceneName}</div>
                      <div className='voice-content'>“开启{item.SceneName}”</div>
                    </div>
                  </Cell>
                ))}
              </>
            ) : (
              <StatusTip status={'empty'} emptyMessage={'家庭下暂无可控场景'} fillContainer />
            )}
          </>
        )}
      </div>
    </div>
  );
}
