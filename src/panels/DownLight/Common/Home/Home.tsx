import React from 'react';
import { Position } from './Position';
import LightBright from './LightBright';
import { ScenePage } from './Scene';
import { SceneTab } from './SceneTab';
import Ticker from './Ticker';
import Action from './Action';

export function Home(props) {
  return (
    <div className="home">
      <Ticker {...props} />
      <div>
        <SceneTab {...props}></SceneTab>
        {/* <div className="change-panel">
          <Position {...props}></Position>
          <LightBright {...props}></LightBright>
        </div>
        <div className="change-panel">
          <Position {...props}></Position>
          <LightBright {...props}></LightBright>
          <LightBright {...props}></LightBright>
        </div> */}
        { props.deviceData.color_mode != 2
          ? <div className="change-panel">
            <Position {...props}></Position>
            <LightBright {...props}></LightBright>
            <LightBright {...props}></LightBright>
          </div>
          : <ScenePage {...props}></ScenePage>
        }
        <Action {...props}></Action>
      </div>
    </div>
  );
}
