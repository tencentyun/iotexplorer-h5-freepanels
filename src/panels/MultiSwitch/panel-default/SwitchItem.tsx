import React from 'react';
import classnames from 'classnames';
import { getCountdownStrWithoutDevice } from "@components/FuncFooter";

export function SwitchItem({
  switchOn,
  countdown,
  onClick,
  name,
}: {
  switchOn: boolean;
  onClick: any;
  countdown: number;
  name: string;
}) {
  return (
    <div
      className="switch-item"
    >
      <Switch
        value={switchOn}
        onClick={onClick}
      />

      <div className='item-status text-overflow'>{name}</div>
      {countdown > 0 ? (
        <div className='item-countdown'>
          {getCountdownStrWithoutDevice(countdown, !switchOn)}
        </div>
      ) : (
        // 为了撑开高度
        <div
          className='item-countdown'
          dangerouslySetInnerHTML={{ __html: '&nbsp;' }}
        />
      )}
    </div>
  )
}

export function Switch({
  value,
  onClick,
}: {
  value: boolean;
  onClick: () => any;
}) {
  return (
    <div
      className={classnames('explorer-switch', {
        off: !value,
      })}
      onClick={onClick}
    >
      <div className="switch-controller"/>
      <div className="controller-indicator"/>
    </div>
  )
}
