import React, { useContext, useMemo } from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { useHistory } from 'react-router-dom';
import { SectionList } from '@components/SectionList';
import * as models from '../../models';
import { CoordinateType } from '../../types';
import { LocatorPanelContext } from '../../LocatorPanelContext';
import { padNumber } from '../../utils';

import './DeviceLocationHistoryList.less';

export function DeviceLocationHistoryList() {
  const { deviceInfo } = useContext(LocatorPanelContext);
  const history = useHistory();

  const showLocationHistory = async ({
    from,
    to,
  }) => {
    sdk.tips.showLoading('历史轨迹加载中');
    try {
      const locationHistory = await models.getDeviceLocationHistory({
        DeviceId: sdk.deviceId,
        CoordType: CoordinateType.GCJ02,
        MinTime: from,
        MaxTime: to,
      });

      if (locationHistory.length === 0) {
        sdk.tips.showInfo('所选日期无历史轨迹');
        return;
      }

      history.push({
        pathname: '/map/history',
        state: {
          data: {
            history: locationHistory.map(item => ({
              lat: item.Location.Latitude,
              lng: item.Location.Longitude,
              time: item.CreateTime,
            }))
          },
        },
      });

      sdk.tips.hideLoading();
    } catch (err) {
      sdk.tips.showError(err);
    }
  };

  const dateList = useMemo(() => {
    const dateList: {
      text: string;
      from: number;
      to: number;
    }[] = [];

    let d = new Date();
    d.setMilliseconds(0);
    d.setSeconds(0);
    d.setMinutes(0);
    d.setHours(0);

    for (let i = 0; i < 30; i++) {
      const year = d.getFullYear();
      const month = d.getMonth() + 1;
      const date = d.getDate();
      dateList.push({
        text: `${year}/${padNumber(month)}/${padNumber(date)}`,
        from: d.getTime(),
        to: d.getTime() + 86400 * 1000,
      });

      d.setDate(d.getDate() - 1);
    }

    return dateList;
  }, [deviceInfo]);

  return (
    <>
      <div className="locator-history-list-container">
        <SectionList>
          {dateList.map(date => (
            <SectionList.Item
              key={date.text}
              label={date.text}
              onClick={() => {
                showLocationHistory({
                  from: date.from,
                  to: date.to,
                });
              }}
              clickable
            />
          ))}
        </SectionList>
      </div>
    </>
  );
}
