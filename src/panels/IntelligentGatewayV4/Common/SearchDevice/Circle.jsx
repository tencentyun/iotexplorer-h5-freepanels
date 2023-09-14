import React from 'react';
import { Icon } from '@custom/Icon';


export function Circle({ isActive, message = [], msg }) {
  return (
    <div className='circle'>
      <div className='round'>
        <div className='label'>
          <div className={`dot ${isActive ? 'enable' : 'disabled'}`}></div>
          <div className='msg'>{msg}</div>
        </div>
        <div className='flag'>
          <div className={`my-flag ${isActive ? 'start' : 'stop'}`}>
            <Icon name='flag-i'></Icon>
          </div>
        </div>
      </div>
      <div className='message'>{
        message.map((val, index) => <div key={index}>{val}</div>)
      }</div>
    </div>
  );
}
