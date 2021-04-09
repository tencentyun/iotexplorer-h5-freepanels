import React, { useEffect, useState } from "react";
import { FreePanelLayout } from "@components/FreePanelLayout";
import { CalendarList } from "../CalendarList/CalendarList";
import { Modal } from "@components/Modal";
import { imgNotFound } from "@icons/panel";
import "./CameraPanel.less";
import moment from "moment";
import { EventDetail } from "./EventDetail";
import { describeCloudStorageEvents } from './models';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';

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
  const [visible, setVisible] = useState(false);
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

  const getCloudStorageEvents = async()=>{
    const res = await describeCloudStorageEvents()
    console.log(res)
  }

  useEffect(()=>{
     getCloudStorageEvents();
  },[])

  const onCalendarClose = () => {
    setVisible(false);
  };

  return (
      <>
        {/* <EventDetail item=""></EventDetail> */}
        <div className="selector-wrapper">
          <div className="date-selector selector-item">
            {/* <div>{`${date.format("M")}月${date.format("D")}日`}</div> */}
            <div>{date.format("M月D日")}</div>
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
                <div className="event-name">{item["EventId"]}</div>
              </div>
              <div className="event-img">
                <img className="not-found" src={imgNotFound}></img>
              </div>
            </div>
          ))}
          <div></div>
        </div>
        <Modal
          visible={visible}
          fixedBottom={true}
          onClose={onCalendarClose}
          maskClosable={true}
          title={"选择日期"}
          showBackBtn={true}
        >
          <CalendarList></CalendarList>
        </Modal>
      </>
  );
}
