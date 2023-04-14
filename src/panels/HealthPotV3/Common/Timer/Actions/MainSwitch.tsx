import React from 'react';
import { List, Radio } from 'antd-mobile';
import { Icon } from '@custom/Icon';

export const MainSwitch = ({ context: { power_switch = 0, switchNum = 4 }, setContext }) => {
  const getSwitchNumData = (powerSwitch, num) => {
    const value = 5 * powerSwitch;
    const changeData = { power_switch: powerSwitch };
    for (let i = 0; i < num; i++) {
      changeData[`switch_${i + 1}`] = value;
    }
    return changeData;
  };

  const onAllSwitchChange = (powerSwitch) => {
    const data = getSwitchNumData(powerSwitch, switchNum);
    setContext(data);
  };
  return (
    <div className="timer-action switch-modal">
      <Radio.Group onChange={onAllSwitchChange} value={power_switch}>
        <List>
          <List.Item
            prefix={'打开'}
            extra={<Radio value={1} icon={checked => <Icon size="small" checked={checked} />} />}
          />
          <List.Item
            prefix={'关闭'}
            extra={<Radio value={0} icon={checked => <Icon size="small" checked={checked} />} />}
          />
        </List>
      </Radio.Group>
    </div>
  );
};
