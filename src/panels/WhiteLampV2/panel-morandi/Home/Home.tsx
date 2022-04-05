import React from 'react';
import { Position } from '../../Common/Home/Position';
import LightBright from '../../Common/Home/LightBright';
import Ticker from '../../Common/Home/Ticker';
import Action from '../../Common/Home/Action';

export function Home(props) {
  return (
    <div className="home">
      <div>
        <div className="change-panel">
          <Position {...props}></Position>
          <LightBright {...props}></LightBright>
        </div>
        <div className="action-pop">
          <Action {...props}></Action>
          <Ticker {...props} />
        </div>
      </div>
    </div>
  );
}
