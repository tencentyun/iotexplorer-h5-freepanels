import React from 'react';
import {
  iconStatusEmpty,
  iconStatusEmptyDevice,
  iconStatusEmptyMsg,
  iconStatusWarning,
  iconStatusSuccess,
  iconStatusEmptyIntel,
} from '@icons/common';
import { BtnGroup, BtnOptions } from '@custom/Btn';
import classNames from 'classnames';
import { noop } from '@utillib';
import { Loading } from '@custom/Loading';

import './StatusInfo.less';

const iconMap = {
  empty: iconStatusEmpty,
  warning: iconStatusWarning,
  success: iconStatusSuccess,
  'empty-msg': iconStatusEmptyMsg,
  'empty-device': iconStatusEmptyDevice,
  'empty-intel': iconStatusEmptyIntel,
};

export type StatusInfoType =
  | 'empty'
  | 'empty-msg'
  | 'empty-device'
  | 'warning'
  | 'loading'
  | 'success'
  | 'empty-intel';

interface Props extends StyledProps {
  type: StatusInfoType;
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  message: string | React.ReactNode;
  buttons: BtnOptions[];
  onClick: (e: React.MouseEvent) => void;
  fillContainer?: boolean;
}

export type StatusInfoProps = Partial<Props>;

export function StatusInfo({
  type = 'empty',
  title,
  subtitle,
  message,
  buttons,
  onClick = noop,
  style,
  className,
  fillContainer,
}: StatusInfoProps) {
  const icon = iconMap[type];

  const renderContent = () => {
    if (type === 'loading') {
      return <Loading />;
    }
    return (
      <>
        <img className="status-icon" src={icon} />
        {Boolean(title) && <div className="status-title">{title}</div>}
        {Boolean(subtitle) && <div className="status-subtitle">{subtitle}</div>}
        {Boolean(message) && <div className="status-message">{message}</div>}
        {buttons && buttons.length > 0 && (
          <BtnGroup
            layout="vertical"
            className="status-info-btn-group"
            buttons={buttons}
          />
        )}
      </>
    );
  };

  return (
    <div
      className={classNames('status-info', className, `type-${type}`, {
        'fill-container': fillContainer,
      })}
      onClick={onClick}
      style={style}
    >
      {renderContent()}
    </div>
  );
}
