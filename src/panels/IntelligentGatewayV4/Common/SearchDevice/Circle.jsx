import React from 'react';
import { Icon } from '@custom/Icon';


export function Circle({ status, message = [], msg }) {
  return (
    <div className='circle'>
      <div className='round'>
        <div className='label'>
          <div className={`dot ${status ? 'enable' : 'disabled'}`}></div>
          <div className='msg'>{msg}</div>
        </div>
        <div className='flag'>
          <div className={`my-flag ${status ? 'start' : 'stop'}`}>
            <Icon name='flag-i'></Icon>
          </div>
        </div>
      </div>
      <div className='message'>{
        message.map(val => <div>{val}</div>)
      }</div>
    </div>
  );
}
