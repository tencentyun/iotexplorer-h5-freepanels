import React, { useEffect, useState, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { CalendarList } from "../CalendarList/CalendarList";
import { Modal } from "@components/Modal";
import { imgNotFound } from "@icons/panel";
import "./CameraPanel.less";
import moment from "moment";
import { describeCloudStorageEvents } from "./models";
import { useInfiniteList } from "@hooks/useInfiniteList";
import sdk from "qcloud-iotexplorer-h5-panel-sdk";
import classNames from "classnames";
import { StatusTip } from "@components/StatusTip";
import { ScrollView } from "@src/components/ScrollView";

export function CameraPanel({ offline, powerOff }) {
  useEffect(() => {
    if (offline) {
      sdk.offlineTip.show();
    } else {
      sdk.offlineTip.hide();
    }
  }, [offline]);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [eventModalVisible, setEventModalVisible] = useState(false);
  const [date, setDate] = useState(moment());
  const [eventId, setEventId] = useState("");
  const [listState, { statusTip, reload, loadMore }] = useInfiniteList({
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
  const history = useHistory();

  const eventIdMap = [
    "_sys_id1_data",
    "_sys_id2_data",
    "_sys_id3_data",
    "_sys_id4_data",
    "_sys_id5_data",
    "_sys_id6_data",
    "_sys_id7_data",
    "_sys_id8_data",
    "_sys_id9_data",
    "_sys_id10_data",
    "_sys_id11_data",
    "_sys_id12_data",
    "_sys_id13_data",
    "_sys_id14_data",
    "_sys_id15_data",
    "_sys_id16_data",
  ];
  const goDetail = (item) => {
    history.push({
      pathname: "/detail",
      query: item,
    });
  };
  return (
    <div className="camera-page">
      <div className="selector-wrapper">
        <div className="date-selector selector-item">
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
        <ScrollView
          className="events-container"
          style={{ height: "100vh", overflow: "scroll" }}
          onReachBottom={() => {
            if (!listState.loadFinish && !listState.loading) {
              loadMore();
            }
          }}
        >
          <div className="events-wrapper">
            {listState.list.map((item, index) => (
              <div
                className="event-item"
                key={index}
                onClick={() => {
                  goDetail(item);
                }}
              >
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
        </ScrollView>
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
        <div
          className={classNames("modal-title", {
            "event-active": eventId === "",
          })}
          onClick={() => {
            setEventId('');
            setEventModalVisible(false);
            reload({ newEventId: '' });
          }}
        >
          全部事件
        </div>
        {/* "modal-events" */}
        <div className="modal-events">
          {eventIdMap.map((item) => (
            <div
              className={classNames("modal-event-item", {
               'event-active': eventId === item
              })}
              onClick={() => {
                setEventId(item);
                setEventModalVisible(false);
                reload({ newEventId: item });
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}
