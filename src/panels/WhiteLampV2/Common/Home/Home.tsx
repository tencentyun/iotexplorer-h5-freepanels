import React from 'react';
import { Position } from './Position';
import LightBright from './LightBright';
import Ticker from './Ticker';
import Action from './Action';

export function Home(props) {
  return (
    <div className="home">
      <Ticker {...props} />
      <div>
        <div className="change-panel">
          <Position {...props}></Position>
          <LightBright {...props}></LightBright>
        </div>
        <Action {...props}></Action>
      </div>
    </div>
  );
}
