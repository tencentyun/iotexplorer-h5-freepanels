import React, {useEffect, useState} from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import classNames from 'classnames';
import { Cell } from '@components/base';
import { ListPicker } from '@components/business';
import { useHistory } from 'react-router';
import { getThemeType } from '@libs/theme';
import { onControlDevice } from '@hooks/useDeviceData';
import './detail.less';

import ArmingImage from "../../icons/normal/trigger-alarm.svg";
import ArmingImageBlueWhite from "../../icons/blue-white/trigger-alarm.svg";
import ArmingImageDark from "../../icons/dark/trigger-alarm.svg";
import ArmingImageColorful from "../../icons/colorful/trigger-alarm.svg";
import ArmingImageMorandi from "../../icons/morandi/trigger-alarm.svg";

import HistoryImage from "../../icons/normal/history.svg";
import HistoryImageBlueWhite from "../../icons/blue-white/history.svg";
import HistoryImageDark from "../../icons/dark/history.svg";
import HistoryImageColorful from "../../icons/blue-white/history.svg";
import HistoryImageMorandi from "../../icons/morandi/history.svg";

import MountingsImage from "../../icons/normal/mountings.svg";
import MountingsImageBlueWhite from "../../icons/blue-white/mountings.svg";
import MountingsImageDark from "../../icons/dark/mountings.svg";
import MountingsImageColorful from "../../icons/colorful/mountings.svg";
import MountingsImageMorandi from "../../icons/morandi/mountings.svg";

import SettingImage from "../../icons/normal/setting.svg";
import SettingImageBlueWhite from "../../icons/blue-white/setting.svg";
import SettingImageDark from "../../icons/dark/setting.png";
import SettingImageColorful from "../../icons/colorful/setting.svg";
import SettingImageMorandi from "../../icons/morandi/setting.svg";
import dayjs from "dayjs";


export function Detail() {
  const themeType = getThemeType();
  const [recordList, setRecordList] = useState([]);
  useEffect(() => {
    // 获取历史记录
    const getDeviceDataHistory = async () => {
      try {
        const time = new Date();
        const currentTime = new Date().getTime();
        const lastYear = new Date().getFullYear() - 1;
        const lastYearTime = time.setFullYear(lastYear);

        const recordListInfo = await sdk.getDeviceDataHistory({
          FieldName: 'woke_mode',
          MaxTime: currentTime,
          MinTime: lastYearTime,
          Limit: 10
        });
        console.log('get info', recordListInfo);
        for (let i = 0; i < 3; i++) {
          setRecordList(recordListInfo.Results[i]);
        }
      } catch (err) {
        console.error('get info fail', err);
      }
    };
    getDeviceDataHistory();
  }, []);
  const statusLabel: any = {
    disarmed: '撤防',
    arm: '布防',
    home: '在家',
    sos: '紧急',
    work: '工作',
    play: '休闲'
  };
  const alarmImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return ArmingImage;
      case 'blueWhite':
        return ArmingImageBlueWhite;
      case 'dark':
        return ArmingImageDark;
      case 'colorful':
        return ArmingImageColorful;
      case 'morandi':
        return ArmingImageMorandi;
      default:
        return ArmingImage;
    }
  };
  const historyImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return HistoryImage;
      case 'blueWhite':
        return HistoryImageBlueWhite;
      case 'dark':
        return HistoryImageDark;
      case 'colorful':
        return HistoryImageColorful;
      case 'morandi':
        return HistoryImageMorandi;
      default:
        return HistoryImage;
    }
  };
  const mountingsImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return MountingsImage;
      case 'blueWhite':
        return MountingsImageBlueWhite;
      case 'dark':
        return MountingsImageDark;
      case 'colorful':
        return MountingsImageColorful;
      case 'morandi':
        return MountingsImageMorandi;
      default:
        return MountingsImage;
    }
  };
  const settingImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return SettingImage;
      case 'blueWhite':
        return SettingImageBlueWhite;
      case 'dark':
        return SettingImageDark;
      case 'colorful':
        return SettingImageColorful;
      case 'morandi':
        return SettingImageMorandi;
      default:
        return SettingImage;
    }
  };
  const [alarmStateVisible, onToggleAlarmState] = useState(false);
  const history = useHistory();

  const handleRecord = () => {
    return history.push('/record');
  };
  const handleMountings = () => {
    return history.push('/mountings');
  };
  const handleSetting = () => {
    return history.push('/setting');
  };
  const cellIcon = (url: string) => (
    <img className="details-icon" src={url}></img>
  );
  return (
    <article className={classNames('detail')}>
      <ul className="setting-list">
        <li className="list-item">
          <Cell
            size="medium"
            title="触发报警"
            value={sdk.deviceData.alert_state === '1' ? '布防' : '撤防'}
            prefixIcon={cellIcon(alarmImageSrc())}
            valueStyle="gray"
            onClick={() => {
              onToggleAlarmState(true);
            }}
          >
            <ListPicker
              visible={alarmStateVisible}
              title="触发报警"
              defaultValue={[
                sdk.deviceData.alert_state ? sdk.deviceData.alert_state : '0'
              ]}
              options={[
                {
                  label: '撤防',
                  value: '0'
                },
                {
                  label: '布防',
                  value: '1'
                }
              ]}
              onCancel={() => onToggleAlarmState(false)}
              onConfirm={value => {
                onControlDevice('alert_state', value[0]);
                onToggleAlarmState(false);
              }}
            />
          </Cell>
        </li>
        <li className="list-item">
          <Cell
            size="medium"
            title="历史记录"
            value={''}
            prefixIcon={cellIcon(historyImageSrc())}
            valueStyle="gray"
            onClick={handleRecord}
          />
          <div className="history-list">
            <ul>
              {recordList != null
                ? recordList.map((value, index) =>
                    index === 0 ? (
                      <li className="history-title active">
                        <span className="label">{dayjs(Number(value.Time)).format('YYYY-MM-DD')+" "+ statusLabel[Number(value.Value)]}</span>
                      </li>
                    ) : (
                      <li className="history-title">
                        <span className="label">{dayjs(Number(value.Time)).format('YYYY-MM-DD')+" "+ statusLabel[Number(value.Value)]}</span>
                      </li>
                    )
                  )
                : ''}
            </ul>
          </div>
        </li>
        <li className="list-item">
          <Cell
            size="medium"
            title="配件"
            value={'有0个设备'}
            prefixIcon={cellIcon(mountingsImageSrc())}
            valueStyle="gray"
            onClick={handleMountings}
          />
        </li>
        <li className="list-item">
          <Cell
            size="medium"
            title="设置"
            value=""
            prefixIcon={cellIcon(settingImageSrc())}
            valueStyle="gray"
            onClick={handleSetting}
          />
        </li>
      </ul>
    </article>
  );
}
