import React, { useRef, useState } from 'react';  
import { Form } from 'antd-mobile';  
import { Input } from '@custom/Input';  
import { Icon } from '@custom/Icon';  
import { useTitle } from '@hooks/useTitle';  

const defaultValue = {  
  local: [['开关1', 'switch_1_name'], ['开关2', 'switch_2_name'], ['开关3', 'switch_3_name']],  
  infinite: []  
};  

function Switch(props) {  
  useTitle('开关名称');  
  const { doControlDeviceData, deviceData } = { ...props };  
  const [values, setValues] = useState(defaultValue.local.map(([v, k]) => deviceData[k] || v)); // 初始化为 deviceData 或默认值  

  const items = ['item0', 'item1', 'item2'];  
  const itemRefs = items.reduce((acc, value) => {  
    acc[value] = React.createRef();  
    return acc;  
  }, {});  

  // 保存所有输入框的当前值  
  const handleSave = () => {  
    defaultValue.local.forEach(([, key], index) => {  
      const valueToSave = values[index]; // 获取对应的值  
      console.log('Saving value:', valueToSave);  
      doControlDeviceData(key, valueToSave); // 调用 doControlDeviceData  
    });  
    window.history.back();
  };  

  const handleBlur = (index) => (e) => {  
    const currentValue = e.currentTarget.value;  
    const newValues = [...values]; // 创建值的副本  
    newValues[index] = currentValue; // 更新该索引的值  
    setValues(newValues); // 更新状态  
  };  

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
                onBlur={handleBlur(index)}  
              />  
            </Form.Item>  
          )}  
        </Form>  
      </div>  
      <div onClick={handleSave} className='save'>  
        保存  
      </div>  
    </div>  
  );  
}  

export default Switch;