import React, { useEffect, useMemo } from 'react';
import classNames from 'classnames';
import { DoControlDeviceData } from '@hooks/useDeviceInfo';
import { WaterHeaterFuncFooter } from './WaterHeaterFuncFooter';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import './WaterHeaterPanelLayout.less';
import { isFullScreen, px2rpx, rpx2rem } from "@utillib";
import * as wxlib from "@wxlib";

export interface FreePanelLayoutProps extends StyledProps {
    children: React.ReactNode;
    doControlDeviceData: DoControlDeviceData;
    offline: boolean;
    powerOff: boolean;
    title: string;
    deviceData: any;
    darkMode?: boolean;
    onGoTimingProject?: () => any;
    onGoCountDown?: () => any;
    onSwitchChange?: () => any;
    isShareDevice?: boolean;
    templateMap: any;
}

export const getFooterHeight = (): number => isFullScreen() ? 256 : 188;

export function WaterHeaterPanelLayout({
    children,
    className,
    style,
    doControlDeviceData,
    offline,
    powerOff,
    // title,
    deviceData,
    darkMode,
    onGoCountDown,
    onSwitchChange,
    isShareDevice,
    onGoTimingProject = () => {
        wxlib.router.go('/pages/Device/TimingProject/TimingProjectList/TimingProjectList', {
            deviceId: sdk.deviceId,
        })
    },
    templateMap,
}: FreePanelLayoutProps) {
    useEffect(() => {
        if (offline) {
            sdk.offlineTip.show();
        } else {
            sdk.offlineTip.hide();
        }
    }, [offline]);

    const bodyHeight = useMemo(() => {
        return rpx2rem(px2rpx(document.documentElement.clientHeight) - getFooterHeight());
    }, []);

    return (
        <div
            className={classNames('air-purifier-panel-layout clearfix', className)}
            style={style}
        >
            <div
                className='air-purifier-panel-body clearfix'
                style={{
                    height: bodyHeight,
                }}
            >
                {children}
            </div>

            <WaterHeaterFuncFooter
                darkMode={darkMode}
                onSwitchChange={onSwitchChange}
                offline={offline}
                powerOff={powerOff}
                controlDeviceData={doControlDeviceData}
                deviceData={deviceData}
                isShareDevice={isShareDevice}
                templateMap={templateMap}
            />
        </div>
    );
}


