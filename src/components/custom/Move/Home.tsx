
// 滑动组件
import React, { useEffect, useRef, useState } from 'react';
import { Move } from "./Move";



export function Home(props) {

    const [position, setPosition] = useState({});
    const [endPosition, setEndPosition] = useState({});

    const onMove = (position) => {
        console.log("onMove", position)
        setPosition(position);
    }
    const onEnd = (posiiton) => {
        console.log("onEnd", posiiton);
        setEndPosition(posiiton)
    }

    return <div className="_home">
        <Move className="diy-move" onMove={onMove} onEnd={onEnd} beginValue ={0} endValue = {200} >
            <div>beginClientX:{position.beginPosition?.clientX || 0}</div>
            <div>beginClientY:{position.beginPosition?.clientY || 0}</div>
            <div>OffsetXPercent:{position.OffsetXPercent || 0}</div>
            <div>OffsetYPercent:{position.OffsetYPercent || 0}</div>
            <div>screenOffsetXPercent:{position.screenOffsetXPercent || 0}</div>
            <div>screenOffsetYPercent:{position.screenOffsetYPercent || 0}</div>
            <div>currentClientX:{position.currentPosition?.clientX || 0}</div>
            <div>currentClientY:{position.currentPosition?.clientY || 0}</div>
            <div>endClientX:{endPosition.currentPosition?.clientX || 0}</div>
            <div>endClientY:{endPosition.currentPosition?.clientY || 0}</div>
        </Move>

    </div>

}

