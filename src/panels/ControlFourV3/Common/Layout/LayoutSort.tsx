import React, { useState, useEffect, useRef } from 'react';
import DndKitGrid from '../DndKitGrid';
import { Btn } from '@custom/Btn';
import { setNewToOld, setOldToNew } from '../Layout/constant';

export default function LayoutSort(props) {
  const dndkitRef = useRef<any>(null);
  const { history: { goBack }, deviceData = {}, doControlDeviceData } = { ...props };
  const { screen_page = [] } = { ...deviceData };
  const getOldData = (newData) => newData.map(item => setNewToOld(item));
  const dataSource = screen_page.length ? getOldData(screen_page) : [];
  const getNewData = (oldData) => oldData.map(item => setOldToNew(item));

  return (<div className="screen-sort">
    {dataSource.length ? <>
      <div className="sort-list">
        <DndKitGrid ref={dndkitRef} dataSource={dataSource} />
      </div>
      <div className="footer">
        <Btn type="default" className="custom-btn cancel" onClick={goBack}>取消</Btn>
        <Btn className="custom-btn save" onClick={() => {
          const value = dndkitRef.current.getValue();
          doControlDeviceData('screen_page', getNewData(value));
          goBack();
        }}>保存</Btn>
      </div>
    </> : <></>}
  </div>);
}
