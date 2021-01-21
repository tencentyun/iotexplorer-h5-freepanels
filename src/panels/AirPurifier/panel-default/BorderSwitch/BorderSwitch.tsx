import React from 'react';
import ReactSwitch from "react-switch";
import './BorderSwitch.less';

export interface SwitchProps extends StyledProps {
    checked: boolean;
    disabled: boolean;
    onChange: (checked: boolean) => any;
}

export function BorderSwitch({
    checked,
    disabled,
    onChange,
    className,
}: SwitchProps) {
    return (
        <div className={className}>
            <ReactSwitch
                checked={checked}
                onChange={onChange}
                onColor="#fff"
                offColor='#fff'
                boxShadow="0px 0px 2px rgba(0, 0, 0, 0.6)"
                onHandleColor="#fff"
                offHandleColor='#fff'
                handleDiameter={24}
                uncheckedIcon={
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                            fontSize: 12,
                            paddingRight: 3,
                            color: '#ddd'
                        }}
                    >
                        off
                  </div>
                }
                checkedIcon={
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                            fontSize: 12,
                            paddingLeft: 3
                        }}
                    >
                        on
                    </div>
                }
                activeBoxShadow='none'
                height={26}
                width={48}
                className='border-switch'
                disabled={disabled}
            />
        </div>
    );
}
