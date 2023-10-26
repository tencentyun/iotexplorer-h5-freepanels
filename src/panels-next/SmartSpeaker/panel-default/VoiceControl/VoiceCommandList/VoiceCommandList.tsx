import React from 'react';
import './VoiceCommandList.less';
import { useLocation } from 'react-router-dom';
import querystring from 'query-string';
import classnames from 'classnames';
import { useControlCommandList } from '@src/panels-next/SmartSpeaker/panel-default/VoiceControl/hooks';

export function VoiceCommandList() {
  const location = useLocation();
  const { productCategory } = querystring.parse(location.search);

  const { categoryCommandPreset } = useControlCommandList({ categoryId: Number(productCategory) });

  const subCommand = categoryCommandPreset.CommandConfig.SubCommand;

  return (
    <div className='page-voiceCommandList'>
      {subCommand.map((item, index) => (
        <div key={index} className='cmd-list-item'>
          <div className='cmd-title'>{item.Property}</div>
          <div className='cmd-panel'>
            <div className='cmd-tip'>
              <div className='cmd-tip-word'>
                <div className='cmd-tip-text'>“</div>
              </div>
              {item.Commands.map(({ Text, Desc }, index) => (
                <div className='cmd-tip-word' key={index}>
                  <div className={classnames('cmd-tip-text', { isTag: !!Desc })}>{Text}</div>
                  {Desc && (
                    <div className='cmd-tip-desc'>{Desc}</div>
                  )}
                </div>
              ))}
              <div className='cmd-tip-word'>
                <div className='cmd-tip-text'>”</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
