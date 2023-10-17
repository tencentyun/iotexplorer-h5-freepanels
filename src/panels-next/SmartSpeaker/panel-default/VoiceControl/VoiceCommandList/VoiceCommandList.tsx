import React, { useEffect } from 'react';
import './VoiceCommandList.less';
import { useLocation } from 'react-router-dom';
import querystring from 'query-string';
import classnames from 'classnames';

const categoryCommandMap = {
  603: [
    {
      commandName: '开关',
      commandTip: [
        { text: '打开/关闭' },
        { text: '客厅', desc: '房间', isTag: true },
        { text: '筒灯', desc: '设备名称', isTag: true },
      ],
    },
    {
      commandName: '亮度',
      commandTip: [
        { text: '提高/降低' },
        { text: '客厅', desc: '房间', isTag: true },
        { text: '音响', desc: '设备名称', isTag: true },
        { text: '音量', desc: '到80%', isTag: true },
      ],
    },
    {
      commandName: '模式',
      commandTip: [
        { text: '卧室', desc: '房间', isTag: true },
        { text: '筒灯', desc: '设备名称', isTag: true },
        { text: '设为' },
        { text: '明亮模式', desc: '参数值', isTag: true },
      ],
    },
  ],
};

export function VoiceCommandList() {
  const location = useLocation();
  const { productCategory } = querystring.parse(location.search);

  useEffect(() => {
    console.log(productCategory);
  }, []);

  return (
    <div className='page-voiceCommandList'>
      {categoryCommandMap['603'].map(({ commandName, commandTip }) => (
        <div key={commandName} className='cmd-list-item'>
          <div className='cmd-title'>{commandName}</div>
          <div className='cmd-panel'>
            <div className='cmd-tip'>
              <div>“</div>
              {commandTip.map(({ text, desc, isTag }, index) => (
                <div className={classnames('cmd-tip-word')} key={index}>
                  <div className={classnames('cmd-tip-text', { isTag })}>{text}</div>
                  {desc && (
                    <div className='cmd-tip-desc'>{desc}</div>
                  )}
                </div>
              ))}
              <div>”</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
