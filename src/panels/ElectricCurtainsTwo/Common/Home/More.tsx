// 更多 页面
import React from 'react';
import { Switch } from '@custom/Switch';
import { useTitle } from '@hooks/useTitle';
import { Cell } from '@custom/Cell';

export const More = (props) => {
  const {
    deviceData: { auto_power },
    doControlDeviceData,
    history: { PATH, push },
  } = props;
  useTitle('更多');
  return (
    <div className="settings">
      <Cell className="cell-settings" title="云端定时" isLink={true}  onClick={() => push(PATH.TIMER_LIST, { isModule: true })}/>

      <Cell
        className="cell-settings"
        title="自启动开关"
        isLink={false}
        value={
          <Switch
            checked={!!auto_power}
            onChange={(value: boolean) => {
              doControlDeviceData('auto_power', Number(value));
            }}
          />
        }
      />
    </div>
  );
};
