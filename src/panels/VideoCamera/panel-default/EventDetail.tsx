import React from 'react';
import { imgNotFound } from "@icons/panel";
import './EventDetail.less'
import moment from 'moment';

export function EventDetail({item}){
  return (
    <div className="event-detail">
    <img  className="event-img" src={imgNotFound}></img>

    <div className="detail-info">
      <div className="detail-info-row">
        <div className="label">设备</div>
        <div className="value">客厅摄像头</div>
      </div>
      <div className="detail-info-row">
        <div className="label">事件</div>
        <div className="value">123</div>
      </div>
      <div className="detail-info-row">
        <div className="label">告警时间</div>
        <div className="value">2012-12-32</div>
      </div>
    </div>
    </div>
  )
}
