import React, { useRef } from 'react';
import { Form } from 'antd-mobile';
import { Input } from '@custom/Input';
import { Icon } from '@custom/Icon';
import { useTitle } from '@hooks/useTitle';
const defaultValue = {
  local: [['开关1', 'switch_1_name'], ['开关2', 'switch_2_name'], ['开关3', 'switch_3_name']],
  infinite: [
    // ['无限开关1', 'infinite_switch_1'],
    // ['无限开关2', 'infinite_switch_2'],
    // ['无限开关3', 'infinite_switch_3'],
    // ['无限开关4', 'infinite_switch_4'],
    // ['无限开关5', 'infinite_switch_5'],
    // ['无限开关6', 'infinite_switch_6']
  ]
};

function Switch(props) {
  useTitle('开关名称');
  const { doControlDeviceData, deviceData } = { ...props };
  const items = ['item0', 'item1', 'item2'];
  const itemRefs = items.reduce((acc, value) => {
    acc[value] = React.createRef();
    return acc;
  }, {});

  return (
    <div className="switch-list-panel">
      <div className="switch-group">
        <span className="title">本地开关</span>
        <Form layout='horizontal' className="switch-form">
          {defaultValue.local.map(([value, key], index) =>
            <Form.Item
              label={`开关${index + 1}`}
              key={index}
              extra={
                <Icon name="editor-other" onClick={e => itemRefs[`item${index}`].current.focus()} />
              }
            >
              <Input
                ref={itemRefs[`item${index}`]}
                placeholder='请输入开关名称'
                defaultValue={deviceData[key] || value}
                onBlur={(e) => {
                  const v = e.currentTarget.value;
                  doControlDeviceData(key, v);
                }}
              />
            </Form.Item>
          )}
        </Form>
      </div>
      {/* <div className="switch-group">
        <span className="title" style={{ marginBottom: 18, display: 'block' }}>无限开关</span>
        {defaultValue.infinite.map(([value, key], index) => <div className="custom-group" key={`infinite_'${index}`}>
          <div className="custom-label" >{value}</div>
          <Input
            className="custom-input wireless"
            placeholder='请输入'
            defaultValue={value}
            clearable
            onBlur={(e) => {
              const v = e.currentTarget.value;
              doControlDeviceData(key, v);
            }} /></div>)}
      </div> */}
    </div >
  );
}

export default Switch;
