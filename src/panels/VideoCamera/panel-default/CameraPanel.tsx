import React, { useEffect, useState, useMemo } from "react";
import { FreePanelLayout } from "@components/FreePanelLayout";
import { CalendarList } from "../CalendarList/CalendarList";
import { Modal } from "@components/Modal";
import { imgNotFound } from "@icons/panel";
import "./CameraPanel.less";
import moment from "moment";
import { EventDetail } from "./EventDetail";
import {
  describeCloudStorageEvents,
  describeCloudStorageThumbnail,
} from "./models";
import { useInfiniteList } from "@hooks/useInfiniteList";
import sdk from "qcloud-iotexplorer-h5-panel-sdk";
import classNames from "classnames";

export function CameraPanel({
  deviceInfo,
  deviceData,
  offline,
  powerOff,
  doControlDeviceData,
}) {
  useEffect(() => {
    if (offline) {
      sdk.offlineTip.show();
    } else {
      sdk.offlineTip.hide();
    }
  }, [offline]);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const cameraDisabled = offline || powerOff;
  const [date, setDate] = useState(moment());
  const [eventList, setEventList] = useState([]);
  const [eventId, setEventId] = useState('');
  const getCloudStorageEvents = async () => {
    console.log(date.startOf("date").unix());
    const { list } = await describeCloudStorageEvents({
      StartTime: date.startOf("date").unix(),
      EndTime: date.endOf("date").unix(),
      EventId: "",
      Context: "",
      Size: 10,
    });
    setEventList(list);
  };

  // useEffect(() => {
  //   getCloudStorageEvents();
  // }, []);

  const onCalendarClose = () => {
    setCalendarVisible(false);
  };

  const [listState, { loadMore, statusTip, reload }] = useInfiniteList({
    statusTipOpts: {
      emptyMessage: "暂无事件",
      fillContainer: true,
    },
    getData: async ({ context }) => {
      const {
        list,
        context: newContext,
        listOver,
      } = await describeCloudStorageEvents({
        StartTime: date.startOf("date").unix(),
        EndTime: date.endOf("date").unix(),
        EventId: eventId,
        Context: context,
        Size: 10,
      });
      return {
        context: newContext,
        list,
        loadFinish: listOver,
      };
    },
    // dependences: [date, eventId],

  });

  // const eventList = useMemo(()=> )
  return (
    <>
      {/* <EventDetail item=""></EventDetail> */}
      <div className="selector-wrapper">
        <div className="date-selector selector-item">
          {/* <div>{`${date.format("M")}月${date.format("D")}日`}</div> */}
          <div
            onClick={() => {
              setCalendarVisible(true);
            }}
          >
            {date.format("M月D日")}
          </div>
        </div>
        <div className="things-selector selector-item">
          <div>全部事件</div>
        </div>
      </div>
      {/* 事件列表 */}
      <div className="events-wrapper">
        {listState.list.map((item, index) => (
          <div className="event-item" key={index}>
            <div className="event-info">
              <div className="event-time">
                {moment(item["StartTime"]).format("HH:mm")}
              </div>
              <div className="event-name">{item["EventID"]}</div>
            </div>
            <div className="event-img">
              <img
                className={classNames({
                  "not-found": !item["ThumbnailURL"],
                  logo: !!item["ThumbnailURL"],
                })}
                src={item["ThumbnailURL"] || imgNotFound}
              />
            </div>
          </div>
        ))}
        <div></div>
      </div>

      <CalendarList
        visible={calendarVisible}
        setVisible={setCalendarVisible}
        setDate={setDate}
        reload={reload}
      ></CalendarList>
    </>
  );
}
