import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { Battery } from '@custom/Battery';
import { Cell } from '@custom/Cell';
import { Icon } from '@custom/Icon';
import { Disk } from './Disk';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { useTitle } from '@hooks/useTitle';
import { Popup } from '@custom/Popup';
import { LogList, getEventDetail } from '../Log/LogList';
import { useParams } from '@hooks/useParams';
import dayjs from 'dayjs';

const lockStatusWord = {
  0: '未上锁',
  1: '已上锁',
  2: '已离线',
};

const lockStatus = {
  0: 'unlocked',
  1: 'locked',
  2: 'offline',
};

async function getDoorbellDetail() {
  const res = await getEventDetail(new Date(), 100);
  console.log(res.EventHistory);
  const events = res.EventHistory;
  const doorbellEvent = events.find(event => event.EventId === 'doorbell');
  if (doorbellEvent) {
    return { time: doorbellEvent.TimeStamp, ...JSON.parse(doorbellEvent.Data) };
  }
  return doorbellEvent;
}

export function Home({
  deviceData,
  productInfo,
  doControlDeviceData,
  offline,
  templateMap,
  history: { PATH, push },
  tips,
}) {
  useTitle(productInfo.Name ? productInfo.Name : '首页');
  const [visible, setVisible] = useState(false);
  const params = useParams();
  const { from: fromScene } = JSON.parse(params.passthrough || '{}');
  const [doorbellInfo, setDoorbellInfo] = useState<{time?: string, url?: string, type?: 'image'}>({});

  const showDoorbellModal = async () => {
    // 是否在3分钟内
    const isIn3min = (time: number) => Date.now() - time < 3 * 60 * 1000;
    const eventDetail = await getDoorbellDetail();
    if (eventDetail && isIn3min(eventDetail.time)) {
      setVisible(true);
      setDoorbellInfo(eventDetail);
    }
  };

  useEffect(() => {
    if (offline) {
      sdk.offlineTip.show();
    } else {
      sdk.offlineTip.hide();
    }
  }, [offline]);

  useEffect(() => {
    if (fromScene === 'template-message') {
      showDoorbellModal();
    }
  }, []);

  useEffect(() => {
    const doorbellHandler = async ({ deviceId, Payload }) => {
      const { eventId } = Payload;
      if (eventId === 'doorbell') {
        console.log('doorbell', deviceId, Payload);
        showDoorbellModal();
      }
    };
    sdk.on('wsEventReport', doorbellHandler);
    return () => sdk.off('wsEventReport', doorbellHandler);
  }, []);

  // 门锁状态
  const status = useMemo(() => {
    if (offline) return 2;
    return deviceData.lock_motor_state || 0;
  }, [offline, deviceData]);

  const handleClose = () => {
    setVisible(false);
  };

  // 重新拍摄
  const reshoot = () => {
    sdk.callDeviceAction({}, 'reshoot')
      .then((res) => {
        console.log(res);
        const { url } = JSON.parse(res.OutputParams);
        setDoorbellInfo({
          ...doorbellInfo,
          url,
        });
      })
      .catch((err) => {
        console.warn('重新拍摄出错', err);
        sdk.tips.showError(err.msg || '重新拍摄出错');
      });
  };

  return (
    <main className="home">
      {/* 顶部 */}
      <header className="header-wrap">
        <div className="header-left">
          {/* 门锁电源模块 */}
          <div>
            <Battery
              value={deviceData.battery_percentage || 0}
              isShowPercent={true}
              isShowTip={false}
            />
            <label>门锁电池</label>
          </div>
        </div>
        <div className="middle-wrap" style={{ padding: 0 }}>
          <div className={classNames(
            'status-tip',
            lockStatus[status],
          )}>{lockStatusWord[status]}</div>
        </div>

        {/* 更多 */}
        <div
          className="header-right"
          onClick={() => {
            push(PATH.SETTINGS_INDEX);
          }
        }>
          <Icon name='more'></Icon>
        </div>
      </header>
      {/* 表盘 */}
      <Disk
        deviceData={deviceData}
        offline={offline}
        doControlDeviceData={doControlDeviceData}
        tips={tips}
      ></Disk>

      {/* 设置按钮 */}
      <div className="setting-block">
        <Cell
          className="cell-border"
          title="日志"
          prefixIcon={<Icon name="log"/>}
          size="medium"
          onClick={() => {
            push(PATH.LOG);
          }}
        >
          <LogList
            style={{ paddingTop: '20px' }}
            emptyTip={
              <div className="empty-tip">暂无数据</div>
            }
            hideTitle
            logType={'action'}
            activeKey="action"
            limit={3}
            dateTime={[new Date(), new Date]}
            templateMap={templateMap}
          />
        </Cell>
      </div>
      <footer className='footer'>
        <div
          onClick={() => {
            push(PATH.USERS_INDEX);
          }}
        >用户管理</div>
        <div className='split-line'></div>
        <div
          onClick={() => {
            push(PATH.TEMP_PASSWORD_INDEX);
          }}
        >临时密码</div>
      </footer>
      <Popup
        visible={visible}
        className="alarm-popup"
      >
        <div className="popup-wrapper">
          <div className="pop-title">
            <div className='title'>
              <div className="icon-bell">
                <div></div>
              </div>
              门铃呼叫
            </div>
            <div className="close" onClick={handleClose}>关闭</div>
          </div>
          <div className="pop-content">
            <img src={doorbellInfo.url} />
          </div>
          <div className="alarm-tip">
            <div>有人在{dayjs(doorbellInfo.time).format('HH:mm:ss')}按门铃</div>
            <div onClick={reshoot} className="reshoot">
              <Icon name="camera"></Icon>&nbsp;重新拍摄
            </div>
          </div>
          <div className="disk-wrapper">
            <Disk
              deviceData={deviceData}
              offline={offline}
              doControlDeviceData={doControlDeviceData}
              className="unlock-btn"
              unlockTip=''
              tips={tips}
            ></Disk>
          </div>
        </div>
      </Popup>
    </main>
  );
}
