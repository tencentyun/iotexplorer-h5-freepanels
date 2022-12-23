import React, { useRef } from 'react';
import { Btn } from '@custom/Btn';
import { Circle } from '@custom/Circle';
import { CountDown } from './CountDown';

export const CountDownPage = (props) => {
    const { history: { PATH, push, query }, doControlDeviceData } = props;
    let { value, } = query;
    const getCountdownTime = (value) => {
        if (value) {
            const hour = `${Math.floor(value / 3600)}`;
            const minute = `${Math.floor((value % 3600) / 60)}`;
            const second = `${Math.floor((value % 3600) % 60)}`;
            return [hour, minute, second];
        }
        return ['00', '00', '00'];
    };
    const countRef = useRef(null);

    const countdownTime = getCountdownTime(value).map((v: string) => (parseInt(v, 10) < 10 ? `0${parseInt(v, 10)}` : v));
    return (
        <div className="cus-time-picker-list">
            {value && (
                <div className="count-page">
                    <div className="count-panel">
                        <Circle className="count-circle v-center">
                            <div className="count-down-tips" onClick={() => { countRef.current.onOpen() }}>
                                <div>
                                    <span className="num">{countdownTime[0]}</span>
                                    <span>时</span>
                                    <span className="num">{countdownTime[1]}</span>
                                    <span>分</span>
                                    <span className="num">{countdownTime[2]}</span>
                                    <span>秒</span>
                                </div>
                                <div>
                                    <span>点击重新设定</span>
                                </div>
                            </div>
                        </Circle>
                    </div>
                </div>
            )}
            <div>
                {value && (
                    <div className="fix-bottom-btn">
                        <Btn btnText="删除" onClick={() => {
                            push(PATH.HOME, {})
                            doControlDeviceData({ count_down: 0 })
                        }} />
                    </div>
                )}
            </div>
            <CountDown
                {...props}
                ref={countRef}
            />
        </div>
    );
}
