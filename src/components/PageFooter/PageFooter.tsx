import React from 'react';
import { RawBtn } from '@components/Btn';
import classNames from 'classnames';
import { noop } from '@utillib';
import './PageFooter.less';
import { useIpx } from '@hooks/useIpx';

export interface PageFooterProps {
    footerConfig: FooterBtnConfig[];
}

export interface FooterBtnConfig {
    text: string;
    icon?: string;
    actived?: boolean;
    className?: string;
    btnClassName?: string;
    disabled?: boolean;
    onClick?: any;
}

export function PageFooter({
  footerConfig,
}: PageFooterProps) {
  const ipx = useIpx();

  return (
        <div className={classNames('free-panel-footer', { ipx })}>
            <div className='func-footer-mask'/>

            <div className='func-btn-list'>
                {footerConfig.map((item, index) => (
                    <div
                        className={classNames('func-btn-item', item.className, {
                          actived: item.actived,
                        })}
                        key={index}
                    >
                        <RawBtn
                            className={classNames('func-btn', item.btnClassName, {
                              disabled: item.disabled,
                            })}
                            onClick={item.disabled ? noop : item.onClick}
                            hoverClass={item.disabled ? 'none' : 'hover'}
                        >
                            <img
                                className='func-btn-icon'
                                src={item.icon as string}
                            />
                        </RawBtn>
                        <div className='func-btn-text'>
                            {item.text}
                        </div>
                    </div>
                ))}
            </div>
        </div>
  );
}
