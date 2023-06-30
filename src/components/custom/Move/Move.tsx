
// 滑动组件
import React, { useEffect, useRef, useState } from 'react';
// import './Move.less';

const getRecord = (globalVal = window, name = '___record') => globalVal?.[name];
const setRecord = (data, globalVal = window, name = '___record') => (globalVal[name] = data);

let tansValue = (value, beginValue, endValue) => {
    let step = (endValue - beginValue)/100;
    return step * value;
}


export function Move(props) {
    // beginValue endValue end结束值  返回值正负表示方向
    let { children, className, onMove, onEnd, beginValue = 0, endValue = 100 } = props;
    const ref = useRef(null);

    // 组合位置
    const combinePosition = (currentPosition) => {
        let beginPosition = getRecord();
        let elementPosition = ref?.current?.getBoundingClientRect();
        // 屏幕的宽和高
        let clientWidth = document.body.clientWidth;
        let clientHeight = document.body.clientHeight;
        // 相对起点的偏移量
        const offsetY = beginPosition.clientY - currentPosition.clientY;// 向上还是向下 > 0 向上 < 小于0向下
        const offsetX = beginPosition.clientX - currentPosition.clientX;// 向左还是向下 > 0 向右 < 小于0向下,
        // 相对元素的移动百分比
        const OffsetYPercent = offsetY / elementPosition?.height * 100;
        const OffsetXPercent = offsetX / elementPosition?.width * 100;
        // 相对屏幕
        const screenOffsetYPercent = offsetY / clientHeight * 100;
        const screenOffsetXPercent = offsetX / clientWidth * 100;
        return {
            OffsetYPercent: tansValue(OffsetYPercent > 100 ? 100 : (OffsetYPercent < -100 ? -100 : OffsetYPercent),beginValue,endValue), // 在元素高度内 向上下移动的百分比 [-100 到100 之间]
            OffsetXPercent: tansValue(OffsetXPercent > 100 ? 100 : (OffsetXPercent < -100 ? -100 : OffsetXPercent),beginValue,endValue), // 在元素宽度内 向左右移动的百分比[-100 到100 之间]
            screenOffsetYPercent:tansValue(screenOffsetYPercent,beginValue,endValue), // 在屏幕高度内 向上下移动的起始位置百分比
            screenOffsetXPercent:tansValue(screenOffsetXPercent,beginValue,endValue), // 在屏幕宽度内 向左右移动的起始位置百分比
            beginPosition,// 开始位置
            currentPosition, // 当前位置 
            elementPosition,//元素位置 
            clientWidth,
            clientHeight,
            // 相对起点数据
            offsetY, // y轴偏移量
            offsetX, // x轴偏移量

        }
    }

    const onTouchMove = (e) => {
        const position = e.changedTouches[0];
        let newPosition = combinePosition(position);
        onMove && onMove(newPosition);
        // 移动的相对位置
        // console.log("newPosition", newPosition)
    }

    const onTouchStart = (e) => {
        // 记录鼠标开始的位置
        setRecord(e.changedTouches[0]);
        const { clientX, clientY } = e.changedTouches[0];
        console.log("onTouchStart", clientX, clientY);
    }

    const onTouchEnd = (e) => {
        const position = e.changedTouches[0];
        let newPosition = combinePosition(position);
        onEnd && onEnd(newPosition);
    }

    return <div className={`move-com ${className || ''}`}>
        <div className="move-container">{children}</div>
        <div className="move-panel"
            onTouchMove={onTouchMove}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            ref={ref}>
        </div>
    </div>

}