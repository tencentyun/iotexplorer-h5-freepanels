import React from 'react';
import ReactSwitch from 'react-switch';
import './Switch.less';

export interface SwitchProps extends StyledProps {
  checked: boolean;
  onChange: (checked: boolean) => any;
  disabled: boolean;
  offHandleColor?: string;
  onHandleColor?: string;
  onColor?: string;
  offColor?: string;
}

export function Switch({
  checked,
  onChange,
  className,
  disabled,
  onColor,
  offColor,
  onHandleColor,
  offHandleColor,
}: SwitchProps) {
  return (
    <div className={className}>
      <ReactSwitch
        className="freepanel-switch"
        disabled={disabled}
        checked={checked}
        onChange={onChange}
        onColor={onColor || '#0066ff'}
        offColor={offColor || '#fff'}
        boxShadow="0px 0px 2px rgba(0, 0, 0, 0.6)"
        onHandleColor={onHandleColor || '#fff'}
        offHandleColor={offHandleColor || '#fff'}
        handleDiameter={30}
        uncheckedIcon={false}
        checkedIcon={false}
        activeBoxShadow="none"
        height={32}
        width={54}
      />
    </div>
  );
}
