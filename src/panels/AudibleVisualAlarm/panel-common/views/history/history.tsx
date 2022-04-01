import React, { useState } from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import classNames from 'classnames';
import { Cell } from '@components/base';
import { SvgIcon } from '@components/common/icon';
import { getThemeType } from '@libs/theme';
import './history.less';
import History_Records from '../home/history_Records/history_Records';
import dayjs from 'dayjs';

export function History() {
  const themeType = getThemeType();
  const [recordList, setRecordList] = useState([]);
  // 获取历史记录
  const getDeviceDataHistory = async () => {
    try {
      const time = sdk.deviceData.month ? sdk.deviceData.year : new Date();
      const currentTime = sdk.deviceData.year ? sdk.deviceData.month : new Date().getTime();
      const lastYear = new Date().getFullYear() - 1;
      const lastYearTime = time.setFullYear(lastYear);

      const recordListInfo = await sdk.getDeviceDataHistory({
        FieldName: 'alarm_state',
        MaxTime: currentTime,
        MinTime: lastYearTime,
        Limit: 3,
      });
      console.log('get info', recordListInfo);
      setRecordList(recordListInfo.Results);
    } catch (err) {
      console.error('get info fail', err);
    }
    getDeviceDataHistory();
  };
  const statusLabel: any = {
    alarm_sound: '声音告警',
    alarm_light: '光亮报警',
    alarm_sound_light: '声光报警',
    normal: '正常',
  };
  const [selectTheHistory, theHistory_Records] = useState(false);
  const onHistory = () => {
    theHistory_Records(true);
  };
  return (
    <article id={'buttom'} className={classNames('buttom')}>
      <div className="lists">
        <Cell
          className="_color_white_"
          title="历史记录"
          //   isLink={false}
          value=""
          valueStyle="gray"
          size="medium"
          prefixIcon={<SvgIcon name={`icon-audible-bw-history-${themeType}`} width={40} height={40}/>}
          onClick={onHistory}
        >
          {recordList.map((value, index) => (
           <ul className="list_ul">
              <li>
                  {dayjs(Number(value.Time)).format('YYYY-MM-DD')}
              </li>
              <li>
                  {dayjs(Number(value.Time)).format('HH:mm')}
              </li>
              <li>
                  {statusLabel[Number(value.Value)]}
              </li>
            </ul>
          ))}
        </Cell>
        <History_Records
          isShow={selectTheHistory}
          onClose={() => {
            theHistory_Records(false);
          }}
        />
      </div>
    </article>
  );
}
export default History;
