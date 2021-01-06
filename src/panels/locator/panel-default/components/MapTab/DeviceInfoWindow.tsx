import React from 'react';
import classNames from 'classnames';
import { BtnGroup } from '@components/Btn';
import { useAsyncFetch } from '@hooks/useAsyncFetch';
import { LatLng } from '../../types';
import { getAddressByLatLng } from '../../models';

import './DeviceInfoWindow.less';

interface DeviceInfoWindowProps extends StyledProps {
  location: LatLng;
  onOpenLocation: (data: LatLng & { address?: string; name?: string; }) => void;
}

export function DeviceInfoWindow({
  className,
  style,
  location,
  onOpenLocation,
}: DeviceInfoWindowProps) {
  const [addressState, { statusTip }] = useAsyncFetch({
    initData: {
      address: '',
      name: '',
    },
    fetch: async () => {
      const data: any = await getAddressByLatLng({ lat: location.lat, lng: location.lng });
      return {
        address: data.address,
        name: (data.formatted_addresses && (data.formatted_addresses.recommend || data.formatted_addresses.rough))
          || data.address,
      };
    },
    ignoreEmpty: true,
  }, [location]);

  const getLocationText = () => {
    if (addressState.loading) {
      return '获取地址中';
    } else if (addressState.hasError) {
      return '获取地址失败';
    } else {
      return addressState.data.address;
    }
  };

  return (
    <div className={classNames('locator-device-info-window', className)} style={style}>
      <div className={classNames('locator-device-info-window-text', { centered: !!statusTip })}>
        {getLocationText()}
      </div>
      <div className="locator-device-info-window-btn-container">
        <BtnGroup
          layout='flex'
          className='locator-device-info-window-btn-group'
          buttons={[
            {
              type: 'primary',
              btnText: '导航',
              onClick: () => onOpenLocation({
                lat: location.lat,
                lng: location.lng,
                address: statusTip ? undefined : addressState.data.address,
                name: statusTip ? undefined : addressState.data.name,
              }),
            },
          ]}
        />
      </div>
    </div>
  );
}
