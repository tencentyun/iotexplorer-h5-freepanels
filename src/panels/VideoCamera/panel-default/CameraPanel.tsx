import React, { useEffect, useState, useMemo } from "react";
import { FreePanelLayout } from "@components/FreePanelLayout";
import { CalendarList } from "../CalendarList/CalendarList";
import { Modal } from "@components/Modal";
import { imgNotFound } from "@icons/panel";
import "./CameraPanel.less";
import moment from "moment";
import { EventDetail } from "./EventDetail";
import { describeCloudStorageEvents } from "./models";
import { useInfiniteList } from "@hooks/useInfiniteList";
import sdk from "qcloud-iotexplorer-h5-panel-sdk";
import classNames from "classnames";
import { StatusTip } from "@components/StatusTip";

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
  const [eventModalVisible, setEventModalVisible] = useState(false);
  const cameraDisabled = offline || powerOff;
  const [date, setDate] = useState(moment());
  const [eventId, setEventId] = useState("");
  const [listState, { statusTip, reload }] = useInfiniteList({
    // todo看下这里dependence的用法，目前有点问题，暂时用传参方式了
    statusTipOpts: {
      emptyMessage: "暂无事件",
      fillContainer: true,
    },
    getData: async ({ context, newDate = "", newEventId = "" }) => {
      const {
        list,
        context: newContext,
        listOver,
      } = await describeCloudStorageEvents({
        StartTime: newDate
          ? newDate.clone().startOf("date").unix()
          : date.clone().startOf("date").unix(),
        EndTime: newDate
          ? newDate.clone().endOf("date").unix()
          : date.clone().endOf("date").unix(),
        EventId: newEventId ? newEventId : eventId,
        Context: context,
        Size: 10,
      });
      return {
        context: newContext,
        list,
        loadFinish: listOver,
      };
    },
  });
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
          <div
            onClick={() => {
              setEventModalVisible(true);
            }}
          >
            全部事件
          </div>
        </div>
      </div>
      {statusTip ? (
        <StatusTip {...statusTip} />
      ) : (
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
        </div>
      )}

      <CalendarList
        visible={calendarVisible}
        setVisible={setCalendarVisible}
        setDate={setDate}
        reload={reload}
        disabledDate={(date) => {
          let start = moment().subtract(8, "days").format("yyyy-MM-DD");
          let end = moment().add(1, "days").format("yyyy-MM-DD");
          if (date.isBetween(start, end)) {
            return false;
          }
          return true;
        }}
      ></CalendarList>
      {/* 事件选择 */}
      <Modal
        className="event-modal"
        visible={eventModalVisible}
        onClose={() => {
          setEventModalVisible(false);
        }}
        maskClosable={true}
      >
        <div className="modal-title">全部事件</div>
        <div className="modal-events">
          {listState.list.map((item) => (
            <div
              className="modal-event-item"
              onClick={() => {
                setEventId(item["EventID"]);
                setEventModalVisible(false);
                reload({ newEventId: item["EventID"] });
              }}
            >
              {item["EventID"]}
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
}
