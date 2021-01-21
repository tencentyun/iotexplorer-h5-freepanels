import React, { useState } from 'react';
import * as freePanelIcons from '@icons/device/freePanel';
import './AirPurifierFuncFooter.less';
import { AirPurifierSetting } from './AirPurifierSetting';
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
export function AirPurifierFuncFooter({
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
    const [airPuiifierSettingVisible, setAirPuiifierSettingVisible] = useState(false);
    const [identifier, setIdentifier] = useState('');
    const [identifierValue, setIdentifierValue] = useState(null);


    const getBtnConfig = (): FooterBtnConfig[] => {
        const itemClassName = darkMode ? 'dark-mode' : '';

        const configMap: {
            switch: FooterBtnConfig;
            windspeed: FooterBtnConfig;
            mode: FooterBtnConfig;
            more: FooterBtnConfig;
        } = {
            switch: {
                text: '开启',
                disabled: offline,
                className: itemClassName,
                onClick: onSwitchChange ? onSwitchChange : () => controlDeviceData('power_switch', powerOff ? 1 : 0),
            },
            windspeed: {
                text: '风速',
                disabled: offline || powerOff,
                btnClassName: isShareDevice ? 'disabled' : '',
                className: itemClassName,
                onClick: () => {
                    setIdentifier('windspeed');
                    setIdentifierValue(deviceData.windspeed);
                    setAirPuiifierSettingVisible(true);
                },
            },
            mode: {
                text: '模式',
                disabled: offline || powerOff,
                className: itemClassName,
                onClick: () => {
                    setIdentifier('mode');
                    setIdentifierValue(deviceData.mode);
                    setAirPuiifierSettingVisible(true);
                }
            },
            more: {
                text: '更多',
                disabled: offline || powerOff,
                className: itemClassName,
                onClick: () => {
                    history.push('/filter-reset');
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
            configMap.windspeed.icon = freePanelIcons.iconWindSpeed;
            configMap.mode.icon = freePanelIcons.iconMode;
            configMap.more.icon = freePanelIcons.iconMore;
        } else {
            configMap.windspeed.icon = freePanelIcons.iconWindSpeed;

            if (darkMode) {
                configMap.switch.icon = freePanelIcons.iconSwitch;
            } else {
                configMap.switch.icon = !offline ? freePanelIcons.iconSwitchClose : freePanelIcons.iconSwitch;
            }

            configMap.switch.text = '关闭';
            configMap.mode.icon = freePanelIcons.iconMode;
            configMap.more.icon = freePanelIcons.iconMore;
        }

        return [configMap.switch, configMap.windspeed, configMap.mode, configMap.more];
    };

    return (
        <>
            <div className="air-purifier-func-footer">
                <PageFooter
                    footerConfig={getBtnConfig()}
                />
            </div>

            {airPuiifierSettingVisible && (
                <AirPurifierSetting
                    visible={true}
                    onClose={() => setAirPuiifierSettingVisible(false)}
                    controlDeviceData={controlDeviceData}
                    identifier={identifier}
                    identifierValue={identifierValue}
                    templateMap={templateMap}
                />
            )}
        </>
    );
}
