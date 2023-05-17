import React, { useState, useEffect, useRef } from 'react';
import DndKitGrid from '../DndKitGrid';
import { Btn } from '@custom/Btn';

const test = [
    [{
      name: '123',
      deviceid: 12,
      type: 1,
      position: [
        [0, 3],
        [0, 2],
      ],
    },
    {
      name: '333',
      deviceid: 122,
      type: 0,
      position: [
        [0, 1],
        [2, 3],
      ],
    },
    {
      name: 'fasdf',
      deviceid: 2,
      type: 0,
      position: [
        [1, 2],
        [2, 3],
      ],
    },
    {
      name: '3adsf',
      deviceid: 33,
      type: 0,
      position: [
        [2, 3],
        [2, 3],
      ],
    },],
    [{
      name: 'adsf',
      deviceid: 80,
      type: 1,
      position: [
        [0, 3],
        [0, 3],
      ],
    },]
  ];

export default function LayoutSort(props) {
    const dndkitRef = useRef<any>(null);
    const { history: { goBack }, deviceData = {}, doControlDeviceData } = { ...props };
    const { card_config = test || [] } = { ...deviceData };
    return (<div className="screen-sort">
        {card_config.length ? <>
            <div className="sort-list">
                <DndKitGrid ref={dndkitRef} dataSource={card_config} />
            </div>
            <div className="footer">
                <Btn type="default" className="custom-btn cancel" onClick={goBack}>取消</Btn>
                <Btn className="custom-btn save" onClick={() => {
                    const value = dndkitRef.current.getValue();
                    doControlDeviceData('card_config', value);
                }}>保存</Btn>
            </div>
        </> : <></>}
    </div>)
}