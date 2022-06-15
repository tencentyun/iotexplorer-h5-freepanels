import React from 'react';
import { List, Radio } from 'antd-mobile';
import { Icon } from '@custom/Icon';

export const MainSwitch = ({ context: { switch_led = 0 }, setContext }) => {
  const getSwitchNumData = (powerSwitch) => {
    const changeData = { switch_led: powerSwitch };
    return changeData;
  };

  const onAllSwitchChange = (powerSwitch) => {
    const data = getSwitchNumData(powerSwitch);
    setContext(data);
  };

  return (
    <div className="timer-action switch-modal">
      <Radio.Group onChange={onAllSwitchChange} value={switch_led}>
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
