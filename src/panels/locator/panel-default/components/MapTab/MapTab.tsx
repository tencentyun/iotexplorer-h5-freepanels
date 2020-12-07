import React, { useRef, useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { rpx2px } from '@utillib';
import * as models from '../../models';
import * as icons from '../../icons';
import { TMap2D, Marker, Polyline } from './TMap';
import { MapControl } from './MapControl';
import { LocatorPanelContext } from '../../LocatorPanelContext';
import { LatLng, MapViewType } from '../../types';
import { DeviceDetailBtn } from './DeviceDetailBtn';
import { DeviceInfoWindow } from './DeviceInfoWindow';
import { FenceInfoModal } from './FenceInfoModal';

import './MapTab.less';

interface MapTabProps {
  view?: MapViewType;
}

const DeviceMarkerIcon = {
  url: icons.iconMapMarker,
  scaleSize: { width: rpx2px(40), height: rpx2px(48) },
};

export function MapTab({
  view,
}: MapTabProps) {
  const mapRef = useRef(null);
  const qqMapsRef = useRef(null);
  
  const [mapReady, setMapReady] = useState(false);
  const [infoWindowScreenPos, setInfoWindowScreenPos] = useState({ x: 0, y: 0 });
  const [infoWindow, setInfoWindow] = useState<{
    visible: false,
    position: null
  } | {
    visible: true,
    position: LatLng,
  }>({
    visible: false,
    position: null,
  });
  
  const { deviceLocation, getDeviceLocation, locationHistory, fenceInfo } = useContext(LocatorPanelContext);
  const history = useHistory();
  
  view = view || MapViewType.DeviceCurrent;
  if ((view === MapViewType.DeviceHistory && !locationHistory)
    || (view === MapViewType.Fence && !fenceInfo)) {
    view = MapViewType.DeviceCurrent;
    history.replace('/map');
  }

  const fitLocationHistory = () => {
    const map: any = mapRef.current;
    const qqMaps: any = qqMapsRef.current;

    if (locationHistory) {
      const bounds = new qqMaps.LatLngBounds();
      locationHistory.forEach(({ lat, lng }) => {
        bounds.extend(new qqMaps.LatLng(lat, lng));
      });

      // 延迟，避免地图 resize 时宽高取值不正确导致 fitBounds 将地图缩放至最小
      setTimeout(() => {
        map.fitBounds(bounds);
      }, 500);
    }
  };

  const onDeviceMarkerClick = (position: LatLng) => {
    if (infoWindow.visible
      && infoWindow.position.lat === position.lat
      && infoWindow.position.lng === position.lng) {
      setInfoWindow({ visible: false, position: null });
    } else {
      const map: any = mapRef.current;
      const qqMaps: any = qqMapsRef.current;
  
      if (map && qqMaps) {
        map.panTo(new qqMaps.LatLng(position.lat, position.lng));
        setInfoWindow({ visible: true, position });
      }
    }
  };

  const onOpenLocation = ({ lat, lng, address, name }) => {
    sdk.wxSdkReady().then(() => {
      wx.openLocation({
        longitude: lng,
        latitude: lat,
        address,
        name,
      });
    });
  };

  const onMapInited = ({ map, qqMaps }) => {
    mapRef.current = map;
    qqMapsRef.current = qqMaps;

    const getDeviceLocationWithZoom = async () => {
      return {
        center: await getDeviceLocation(),
        zoom: 17,
      };
    };

    const getCityLocationWithZoom = async () => {
      const ipLocation = await models.getIpLocation();
      return {
        center: {
          lat: ipLocation.location.lat,
          lng: ipLocation.location.lng,
          time: Date.now(),
        },
        zoom: 10,
      }
    };

    const getMapInitialProps = () => getDeviceLocationWithZoom()
      .catch(getCityLocationWithZoom);

    if (view === MapViewType.DeviceCurrent) {
      getMapInitialProps()
        .then(({ center, zoom }) => {
          map.setCenter(new qqMaps.LatLng(center.lat, center.lng));
          map.setZoom(zoom);
        }).catch((err) => {
          console.error(err);
        });
    }

    setMapReady(true);
  };

  useEffect(() => {
    if (!mapReady) return;

    if (view === MapViewType.DeviceHistory && locationHistory) {
      fitLocationHistory();
    }

    setInfoWindow({ visible: false, position: null });
  }, [view, mapReady]);

  useEffect(() => {
    const map: any = mapRef.current;
    const qqMaps: any = qqMapsRef.current;
    if (infoWindow.visible && map && qqMaps) {
      const latLng = new qqMaps.LatLng(infoWindow.position.lat, infoWindow.position.lng);
      const overlay = new qqMaps.Overlay({
        map,
        position: latLng,
      });

      const updateInfoWindowPosition = () => {
        const projection = overlay.getProjection();
        const point = projection.fromLatLngToContainerPixel(latLng);
        setInfoWindowScreenPos({ x: point.getX(), y: point.getY() });
      };

      const listeners = [
        qqMaps.event.addListener(map, 'center_changed', updateInfoWindowPosition),
        qqMaps.event.addListener(map, 'click', () => {
          setInfoWindow({ visible: false, position: null });
        }),
      ];

      updateInfoWindowPosition();

      return () => {
        overlay.setMap(null);
        listeners.forEach(qqMaps.event.removeListener);
      };
    }
  }, [infoWindow]);

  const mapComponentParams = {
    map: mapRef.current,
    qqMaps: qqMapsRef.current,
  };

  const renderMapView = () => {
    switch (view) {
      case MapViewType.DeviceCurrent:
        return deviceLocation ? (
          <Marker
            {...mapComponentParams}
            position={deviceLocation}
            icon={DeviceMarkerIcon}
            onClick={() => { onDeviceMarkerClick(deviceLocation); }}
          />
        ) : null;
      case MapViewType.DeviceHistory:
        return locationHistory ? (
          <>
            {locationHistory.map((item, index) => (
              <Marker
                {...mapComponentParams}
                key={index}
                position={item}
                icon={DeviceMarkerIcon}
                onClick={() => { onDeviceMarkerClick(item); }}
              />
            ))}
            <Polyline
              {...mapComponentParams}
              path={locationHistory}
              strokeColor="#00E433"
              strokeWeight={rpx2px(16)}
            />
          </>
        ) : null;
    }
  };

  return (
    <div className={classNames('locator-tab locator-map-tab', `locator-map-view-${view}`)}>
      <div className="locator-map-layer-container">
        <TMap2D
          onInited={onMapInited}
          getInitOptions={() => ({
            mapTypeControl: false,
            zoomControl: false,
            panControl: false,
          })}
        />
        {mapReady && (
          <>
            <MapControl
              {...mapComponentParams}
              showBattery={view === MapViewType.DeviceCurrent}
              showLocationControl={view === MapViewType.DeviceCurrent}
              showScaleControl={view === MapViewType.DeviceCurrent || view === MapViewType.DeviceHistory}
            />
            {renderMapView()}
            {infoWindow.visible && (
              <div
                className="locator-device-info-window-container" 
                style={{
                  left: infoWindowScreenPos.x,
                  top: infoWindowScreenPos.y,
                }}
              >
                <DeviceInfoWindow
                  location={infoWindow.position}
                  onOpenLocation={onOpenLocation}
                  className="locator-device-info-window-attached"
                />
              </div>
            )}
            <DeviceDetailBtn />
          </>
        )}
      </div>
      {view === MapViewType.Fence && (
        <FenceInfoModal {...mapComponentParams} />
      )}
    </div>
  );
}
