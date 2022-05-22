import React from 'react';
import { Position } from './Position';
import LightBright from './LightBright';
import Ticker from './Ticker';
import Action from './Action';

export function Home(props) {
  return (
    <div className="home">
      <div>
        <div className="change-panel">
          <Position {...props}></Position>
          <Action {...props}></Action>
          <LightBright {...props}></LightBright>
        </div>
        <Ticker {...props} />
      </div>
    </div>
  );
}
