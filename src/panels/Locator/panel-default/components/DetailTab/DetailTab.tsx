import React from 'react';
import { useHistory } from 'react-router-dom';
import { RawBtn } from '@components/Btn/Btn';
import { iconArrowRightGrey } from '@icons/common';
import { DetailPage } from '../../types';

import './DetailTab.less';

function DetailMenuEntry({
  text,
  onClick,
}) {
  return (
    <RawBtn className="locator-detail-tab-menu-entry" onClick={onClick}>
      <span>{text}</span>
      <span className="icon-right"><img src={iconArrowRightGrey} className="arrow-icon" /></span>
    </RawBtn>
  );
}

export function DetailTab() {
  const history = useHistory();
  const onGoPage = (page: DetailPage) => {
    history.push(`/detail/${page}`);
  };

  return (
    <div className="locator-tab locator-detail-tab">
      <div className="locator-detail-tab-menu">
        <DetailMenuEntry text="历史轨迹" onClick={() => { onGoPage(DetailPage.HistoryList); }} />
        <DetailMenuEntry text="报警记录" onClick={() => { onGoPage(DetailPage.EventList); }} />
        <DetailMenuEntry text="定位模式" onClick={() => { onGoPage(DetailPage.PositioningMode); }} />
      </div>
    </div>
  );
}
