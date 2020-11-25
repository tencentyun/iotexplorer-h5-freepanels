import React, { useState } from 'react';
import { CheckBox } from '@components/CheckBox';
import { noop } from '@utillib';

import { Btn, BtnOptions } from './Btn';
import { BtnGroup } from './BtnGroup';
import './BtnWithCheckBox.less';

export interface BtnWithCheckBoxProps extends BtnOptions {
  checkboxText: string | React.ReactNode;
  checkboxType?: 'radio' | 'checkbox';
  checked?: boolean;
  onCheckedChange?: any;
  background?: string;
  associate?: boolean;
  defaultChecked?: boolean;
}

export function BtnWithCheckBox({
  checkboxText,
  checkboxType = 'radio',
  checked = false,
  onCheckedChange = noop,
  background,
  associate,
  defaultChecked = false,
  ...btnProps
}: BtnWithCheckBoxProps) {
  const [localCheck, setLocalCheck] = useState(defaultChecked);

  const value = (associate ? localCheck : checked) as boolean;

  return (
    <div className='btn-with-checkbox' style={{ background }}>
      <CheckBox
        value={value}
        onChange={(checked) => {
          if (associate) {
            setLocalCheck(checked);
          } else {
            onCheckedChange(checked);
          }
        }}
        type={checkboxType}
      >
        <div className='checkbox-text'>{checkboxText}</div>
      </CheckBox>
      <BtnGroup
        layout='vertical'
        fixedBottom={true}
      >
        <Btn
          {...{
            disabled: associate ? !localCheck : btnProps.disabled,
            ...btnProps,
          }}
        />
      </BtnGroup>
    </div>
  );
}
