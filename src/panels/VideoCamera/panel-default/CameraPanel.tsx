import React, { useEffect, useState } from "react";
import { FreePanelLayout } from "@components/FreePanelLayout";
import { CalendarList } from "../CalendarList/CalendarList";
import { Modal } from "@components/Modal";
import { imgNotFound } from "@icons/panel";
import "./CameraPanel.less";
import moment from "moment";
import { EventDetail } from "./EventDetail";
import { describeCloudStorageEvents, describeCloudStorageThumbnail } from "./models";
import sdk from "qcloud-iotexplorer-h5-panel-sdk";

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
  const [eventList, setEventList] = useState([
    {
      StartTime: 842084401,
      EndTime: 842084401,
      Thumbnail: "",
      EventId: "id1_data",
    },
    {
      StartTime: 842084401,
      EndTime: 842084401,
      Thumbnail: "",
      EventId: "id1_data",
    },
  ]);

  const getCloudStorageEvents = async () => {
    const { list } = await describeCloudStorageEvents();
    const res = await describeCloudStorageThumbnail({})
    console.log(res)
    setEventList(list);
  };

  useEffect(() => {
    getCloudStorageEvents();
  }, []);

  const onCalendarClose = () => {
    setCalendarVisible(false);
  };

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
        {eventList.map((item, index) => (
          <div className="event-item" key={index}>
            <div className="event-info">
              <div className="event-time">
                {moment(item["StartTime"]).format("HH:mm")}
              </div>
              <div className="event-name">{item["EventID"]}</div>
            </div>
            <div className="event-img">
              <img className="not-found" src={imgNotFound}></img>
            </div>
          </div>
        ))}
        <div></div>
      </div>

      <CalendarList
        visible={calendarVisible}
        setVisible={setCalendarVisible}
        setDate={setDate}
      ></CalendarList>
    </>
  );
}
