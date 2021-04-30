import React from "react";
import { imgNotFound } from "@icons/panel";
import "./EventDetail.less";
import moment from "moment";

export function EventDetail({ item, deviceInfo }) {
  return (
    <div className="event-detail">
      <img
        className="event-img"
        src={
          (item.location.query && item.location.query["ThumbnailURL"]) ||
          imgNotFound
        }
      ></img>
      <div className="detail-info">
        <div className="detail-info-row">
          <div className="label">设备</div>
          <div className="value">{deviceInfo && deviceInfo.DeviceName}</div>
        </div>
        <div className="detail-info-row">
          <div className="label">事件</div>
          <div className="value">
            {(item.location.query && item.location.query.EventID) || "-"}
          </div>
        </div>
        <div className="detail-info-row">
          <div className="label">告警时间</div>
          <div className="value">
            {(item.location.query &&
              item.location.query.StartTime &&
              moment(item.location.query.StartTime * 1000).format(
                "yyyy-MM-DD HH:mm:ss"
              )) ||
              "="}
          </div>
        </div>
      </div>
    </div>
  );
}
