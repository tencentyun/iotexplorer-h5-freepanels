import React, { useRef, useState, useContext, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { rpx2px } from '@utillib';
import * as models from '../../models';
import * as icons from '../../icons';
import { TMapApiKey } from '../../constants';
import { TMapV2, Marker, Polyline } from './TMapV2';
import { MapControl } from './MapControl';
import { LocatorPanelContext } from '../../LocatorPanelContext';
import { LatLng, LatLngWithTime, MapViewType } from '../../types';
import { DeviceDetailBtn } from './DeviceDetailBtn';
import { DeviceInfoWindow } from './DeviceInfoWindow';
import { FenceInfoModal } from './FenceInfoModal';

import './MapTab.less';

interface MapTabProps {
  view: MapViewType;
  active: boolean;
}

const DeviceMarkerIcon = {
  url: icons.iconMapMarker,
  scaleSize: { width: rpx2px(40), height: rpx2px(48) },
};

export function MapTab({
  view,
  active,
}: MapTabProps) {
  const mapRef = useRef(null);
  const qqMapsRef = useRef(null);

  const [mapReady, setMapReady] = useState(false);

  const infoWindowContainerRef = useRef<HTMLDivElement>(null);
  const [infoWindow, setInfoWindow] = useState<{
    visible: false,
    location: null
  } | {
    visible: true,
    location: LatLng,
  }>({
    visible: false,
    location: null,
  });

  const { deviceLocation, getDeviceLocation } = useContext(LocatorPanelContext);

  const history = useHistory();
  const location = useLocation();

  const viewData = (location.state || {}).data;
  const viewType = view !== MapViewType.DeviceCurrent && viewData ? view : MapViewType.DeviceCurrent;

  const fitLocationHistory = (locationHistory: LatLngWithTime[]) => {
    const map: any = mapRef.current;
    const qqMaps: any = qqMapsRef.current;

    const bounds = new qqMaps.LatLngBounds();
    locationHistory.forEach(({ lat, lng }) => {
      bounds.extend(new qqMaps.LatLng(lat, lng));
    });

    // 延迟，避免地图 resize 时宽高取值不正确导致 fitBounds 将地图缩放至最小
    setTimeout(() => {
      map.fitBounds(bounds);
    }, 100);
  };

  const onDeviceMarkerClick = (location: LatLng) => {
    if (infoWindow.visible
      && infoWindow.location.lat === location.lat
      && infoWindow.location.lng === location.lng) {
      setInfoWindow({ visible: false, location: null });
    } else {
      const map: any = mapRef.current;
      const qqMaps: any = qqMapsRef.current;

      if (map && qqMaps) {
        map.panTo(new qqMaps.LatLng(location.lat, location.lng));
        setInfoWindow({ visible: true, location });
      }
    }
  };

  const onOpenInfoWindow = (location: LatLng) => {
    setInfoWindow({ visible: true, location });
  };

  const onOpenLocation = ({ lat, lng, address, name }) => {
    const handle = async () => {
      await sdk.wxSdkReady();
      await new Promise((resolve, reject) => {
        wx.openLocation({
          longitude: lng,
          latitude: lat,
          address,
          name,
          scale: 17,
          success: resolve,
          fail: reject,
        });
      });
    };

    handle().catch((err) => {
      sdk.tips.showError(err);
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

    if (viewType === MapViewType.DeviceCurrent) {
      getMapInitialProps()
        .then(({ center, zoom }) => {
          map.setCenter(new qqMaps.LatLng(center.lat, center.lng));
          map.setZoom(zoom);
        })
        .catch((err) => {
          console.error(err);
        });
    }

    setMapReady(true);
  };

  useEffect(() => {
    if (active && view !== MapViewType.DeviceCurrent && !viewData) {
      history.replace('/map');
    }
  }, [view, active]);

  useEffect(() => {
    if (!mapReady) return;

    if (viewType === MapViewType.DeviceHistory && viewData.history) {
      fitLocationHistory(viewData.history);
    }

    setInfoWindow({ visible: false, location: null });
  }, [viewType, mapReady]);

  useEffect(() => {
    const map: any = mapRef.current;
    const qqMaps: any = qqMapsRef.current;
    if (infoWindow.visible && map && qqMaps) {
      const latLng = new qqMaps.LatLng(infoWindow.location.lat, infoWindow.location.lng);
      const overlay = new qqMaps.Overlay({
        map,
        position: latLng,
      });

      const moveElement = document.querySelector('div[n="moveElement"]') as HTMLDivElement | null;

      const updateInfoWindowStyle = ({ x, y }) => {
        if (infoWindowContainerRef.current) {
          infoWindowContainerRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        }
      };

      const updateInfoWindowPosition = (onDrag = false) => {
        if (infoWindowContainerRef.current) {
          const projection = overlay.getProjection();
          const point = projection.fromLatLngToContainerPixel(latLng);
          let x = point.getX();
          let y = point.getY();

          if (moveElement) {
            const scaleParams = /scale\(([\d.]+)\)/.exec(moveElement.style.transform)
            if (scaleParams) {
              const scale = parseFloat(scaleParams[1]);
              x *= scale;
              y *= scale;
            }
          }

          if (onDrag && moveElement) {
            const offsetParams = /^(-?[\d.]+)px (-?[\d.]+)px$/.exec(moveElement.style.transformOrigin)
            if (offsetParams) {
              x += parseFloat(offsetParams[1]);
              y += parseFloat(offsetParams[2]);
            }
          }

          updateInfoWindowStyle({ x, y });
        }
      };

      const listeners = [
        qqMaps.event.addListener(map, 'drag', () => { updateInfoWindowPosition(true); }),
        qqMaps.event.addListener(map, 'center_changed', () => { updateInfoWindowPosition(); }),
        qqMaps.event.addListener(map, 'click', () => {
          setInfoWindow({ visible: false, location: null });
        }),
      ];

      overlay.draw = () => {
        updateInfoWindowPosition();
      };

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
    switch (viewType) {
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
        return viewData.history ? (
          <>
            {viewData.history.map((item, index) => (
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
              path={viewData.history}
              strokeColor="#00E433"
              strokeWeight={rpx2px(16)}
            />
          </>
        ) : null;
    }
  };

  return (
    <div className={classNames('locator-tab locator-map-tab', `locator-map-view-${viewType}`)}>
      <div className="locator-map-layer-container">
        <TMapV2
          apiKey={TMapApiKey}
          onInited={onMapInited}
          getInitOptions={() => ({
            mapTypeControl: false,
            zoomControl: false,
            panControl: false,
            scaleControl: true,
          })}
        />
        {mapReady && (
          <>
            <MapControl
              {...mapComponentParams}
              showBattery={viewType === MapViewType.DeviceCurrent}
              showLocationControl={viewType === MapViewType.DeviceCurrent}
              showScaleControl={viewType === MapViewType.DeviceCurrent || viewType === MapViewType.DeviceHistory}
              onOpenInfoWindow={onOpenInfoWindow}
            />
            {renderMapView()}
            {infoWindow.visible && (
              <div
                className="locator-device-info-window-container"
                ref={infoWindowContainerRef}
              >
                <DeviceInfoWindow
                  location={infoWindow.location}
                  onOpenLocation={onOpenLocation}
                  className="locator-device-info-window-attached"
                />
              </div>
            )}
            <DeviceDetailBtn />
          </>
        )}
      </div>
      {Boolean(viewType === MapViewType.Fence && viewData.fence) && (
        <FenceInfoModal {...mapComponentParams} editingFenceInfo={viewData.fence} />
      )}
    </div>
  );
}
