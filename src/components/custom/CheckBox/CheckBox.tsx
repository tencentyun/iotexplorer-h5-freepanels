import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Icon } from '@custom/Icon';
export interface CheckBoxProps extends StyledProps {
  children?: React.ReactNode;
  value: boolean;
  onChange?: (value: boolean) => any;
  type?: 'checkbox' | 'radio';
  tips?: string | React.ReactNode;
}

export function CheckBox({
  children,
  value = true,
  onChange,
  type = 'checkbox', // radio
  tips,
  className,
  style
}: CheckBoxProps) {
  const [checked, setChecked] = useState(value);

  useEffect(() => {
    setChecked(value);
  }, [value]);

  return (
    <div
      className={classNames('checkbox-container need-hover', `type-${type}`, className)}
      onClick={() => (onChange || setChecked)(!checked)}
      style={style}
    >
      {type === 'radio' ? (
        <Icon name={checked ? 'radio-checked' : 'radio'} />
      ) : (
        // TODO 后续验证checkbox
        <Icon name={checked ? 'radio-checked' : 'radio'} />
      )}
      {Boolean(tips) ? <span className="checkbox-tips">{tips}</span> : Boolean(children) ? children : null}
    </div>
  );
}
