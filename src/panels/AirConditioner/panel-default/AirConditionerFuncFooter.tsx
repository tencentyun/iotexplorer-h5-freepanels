import React, { useState } from 'react';
import * as freePanelIcons from '@icons/device/freePanel';
import './AirConditionerFuncFooter.less';
import { AirConditionerSetting } from './AirConditionerSetting';
import { FooterBtnConfig, PageFooter } from "@components/PageFooter";
import { useHistory } from "react-router-dom";

export const getStatusStr = (powerOff: boolean): string => (!powerOff ? '开启' : '关闭');

export interface FuncFooterProps {
    offline?: boolean;
    powerOff?: boolean;
    controlDeviceData: (id, value) => any;
    darkMode?: boolean;
    onSwitchChange?: () => any;
    isShareDevice?: boolean;
    templateMap?: any;
    deviceData?: any;
}

/**
 * 按钮本身只有两种状态，actived不透明，默认带半透明
 *
 * 定时
 *
 * @param btnConfig
 * @constructor
 */
export function AirConditionerFuncFooter({
    offline,
    powerOff,
    controlDeviceData,
    darkMode,
    onSwitchChange,
    isShareDevice,
    templateMap,
    deviceData,
}: FuncFooterProps) {
    const history = useHistory();
    const [airConditionerSettingVisible, setAirConditionerSettingVisible] = useState(false);
    const [identifier, setIdentifier] = useState('');
    const [identifierValue, setIdentifierValue] = useState(null);

    const modeIcon = (mode) => {
        switch (mode) {
            case 0:
                return freePanelIcons.iconModeAuto;
            case 1:
                return freePanelIcons.iconModeRefrigeration;
            case 2:
                return freePanelIcons.iconModeHeat;
            case 3:
                return freePanelIcons.iconModeDehumidification;
            case 4:
                return freePanelIcons.iconModeAir;
            case 5:
                return freePanelIcons.iconModeEco;
            default:
                return freePanelIcons.iconModeRefrigeration;
        }
    };

    const speedIcon = (mode) => {
        switch (mode) {
            case 0:
                return freePanelIcons.iconModeAuto;
            case 1:
                return freePanelIcons.iconSpeedStrong;
            case 2:
                return freePanelIcons.iconSpeedMidRange;
            case 3:
                return freePanelIcons.iconSpeedLow;
            case 4:
                return freePanelIcons.iconSpeedSleep;
            case 5:
                return freePanelIcons.iconSpeedHealthWind;
            case 6:
                return freePanelIcons.iconSpeedMute;
            default:
                return freePanelIcons.iconSpeedHealthWind;
        }
    };


    const getBtnConfig = (): FooterBtnConfig[] => {
        const itemClassName = darkMode ? 'dark-mode' : '';

        const configMap: {
            switch: FooterBtnConfig;
            mode: FooterBtnConfig;
            speed: FooterBtnConfig;
            more: FooterBtnConfig;
        } = {
            switch: {
                text: '开启',
                disabled: offline,
                className: itemClassName,
                onClick: onSwitchChange ? onSwitchChange : () => controlDeviceData('power_switch', powerOff ? 1 : 0),
            },
            mode: {
                text: '模式',
                disabled: offline || powerOff,
                className: itemClassName,
                onClick: () => {
                    setIdentifier('work_mode');
                    setIdentifierValue(deviceData.work_mode);
                    setAirConditionerSettingVisible(true);
                }
            },
            speed: {
                text: '风速',
                disabled: offline || powerOff,
                btnClassName: isShareDevice ? 'disabled' : '',
                className: itemClassName,
                onClick: () => {
                    setIdentifier('fan_mode');
                    setIdentifierValue(deviceData.fan_mode);
                    setAirConditionerSettingVisible(true);
                },
            },
            more: {
                text: '更多',
                disabled: offline || powerOff,
                className: itemClassName,
                onClick: () => {
                    // history.push('/air-conditioner-subpage');
                },
            },
        };

        if (darkMode) {
            if (!offline && !powerOff) {
                configMap.switch.actived = true;
            }
        } else {
            configMap.switch.actived = !offline;
        }

        if (!powerOff) {
            configMap.switch.icon = darkMode ? freePanelIcons.iconSwitch : freePanelIcons.iconSwitchOpen;
            configMap.mode.icon = modeIcon(deviceData.work_mode);
            configMap.speed.icon = speedIcon(deviceData.fan_mode);
            configMap.more.icon = freePanelIcons.iconMore;
        } else {

            if (darkMode) {
                configMap.switch.icon = freePanelIcons.iconSwitch;
            } else {
                configMap.switch.icon = !offline ? freePanelIcons.iconSwitchClose : freePanelIcons.iconSwitch;
            }

            configMap.switch.text = '关闭';
            configMap.mode.icon = freePanelIcons.iconModeRefrigeration;
            configMap.speed.icon = freePanelIcons.iconSpeedHealthWind;
            configMap.more.icon = freePanelIcons.iconMore;
        }

        return [configMap.switch, configMap.mode, configMap.speed, configMap.more];
        // return [configMap.switch, configMap.mode, configMap.speed];
    };

    return (
        <>
            <div className="air-purifier-func-footer">
                <PageFooter
                    footerConfig={getBtnConfig()}
                />
            </div>

            {airConditionerSettingVisible && (
                <AirConditionerSetting
                    visible={true}
                    onClose={() => setAirConditionerSettingVisible(false)}
                    controlDeviceData={controlDeviceData}
                    identifier={identifier}
                    identifierValue={identifierValue}
                    templateMap={templateMap}
                />
            )}
        </>
    );
}
