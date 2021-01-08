import React, { useContext } from 'react';
import classNames from 'classnames';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { RawBtn } from '@components/Btn/Btn';
import * as icons from '../../icons';
import { LatLng } from '../../types';
import { LocatorPanelContext } from '../../LocatorPanelContext';

import './MapControl.less';

interface MapControlBtnProps {
  children: React.ReactNode | React.ReactNode[];
  onClick?: () => void;
  bigStyle?: boolean;
}

export function MapControlBtn({
  children,
  onClick,
  bigStyle = false,
}: MapControlBtnProps) {
  return (
    <RawBtn
      className={classNames('locator-map-control-btn', {
        'locator-map-control-btn-big': bigStyle,
      })}
      onClick={() => { onClick && onClick(); }}
    >
      {children}
    </RawBtn>
  );
}

interface MapControlProps {
  map: any;
  qqMaps: any;
  showBattery?: boolean;
  showLocationControl?: boolean;
  showScaleControl?: boolean;
  onOpenInfoWindow: (location: LatLng) => void,
}

export function MapControl({
  map,
  qqMaps,
  showBattery = true,
  showLocationControl = true,
  showScaleControl = true,
  onOpenInfoWindow,
}: MapControlProps) {
  const { deviceData, getDeviceLocation, getUserLocation } = useContext(LocatorPanelContext);
  const batteryValue = typeof deviceData.battery_state === 'number' ? deviceData.battery_state : null

  const buttons = [
    {
      icon: icons.iconLocateControl,
      onClick: () => {
        getDeviceLocation().then((deviceLocation) => {
          map.setCenter(new qqMaps.LatLng(deviceLocation.lat, deviceLocation.lng));
          map.setZoom(17);
        }).catch((err) => {
          console.error('getDeviceLocation fail', err);
          sdk.tips.showError(err);
        });
      },
      visible: showLocationControl,
    },
    {
      icon: icons.iconPhoneControl,
      onClick: () => {
        getUserLocation().then((latLng) => {
          onOpenInfoWindow(latLng);
          map.setCenter(new qqMaps.LatLng(latLng.lat, latLng.lng));
          map.setZoom(17);
        }).catch((err) => {
          console.error('getUserLocation fail', err);
          if (err && err.errMsg === 'getLocation:fail') {
            sdk.tips.showError('无法获取位置信息。请打开手机的定位功能，并允许微信获取你的位置信息。');
          } else {
            sdk.tips.showError(err);
          }
        });
      },
      visible: showLocationControl,
    },
    {
      icon: icons.iconPlusControl,
      onClick: () => { map.zoomBy(1); },
      visible: showScaleControl,
    },
    {
      icon: icons.iconMinusControl,
      onClick: () => { map.zoomBy(-1); },
      visible: showScaleControl,
    },
  ].filter(Boolean);

  return (
    <div className="locator-map-control">
      <div className="locator-map-top-left-control">
        {showBattery && (
          <MapControlBtn bigStyle>
            <div>
              <div className="locator-battery-icon">
                <img className="locator-battery-border" src={icons.iconBatteryEmpty} />
                <div className="locator-battery-value">
                  <div className="locator-battery-fill" style={{ width: `${batteryValue || 0}%` }}></div>
                </div>
              </div>
              <div className="locator-battery-text">{typeof batteryValue === 'number' ? batteryValue : '--'}%</div>
            </div>
          </MapControlBtn>
        )}
      </div>
      <div className="locator-map-bottom-right-control">
        {buttons.map((button, index) => button.visible ? (
          <MapControlBtn onClick={button.onClick} key={index}>
            <img className="locator-map-control-icon" src={button.icon} />
          </MapControlBtn>
        ) : null)}
      </div>
    </div>
  );
}
