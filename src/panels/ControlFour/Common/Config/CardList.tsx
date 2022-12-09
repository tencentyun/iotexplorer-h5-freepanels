import React, { useEffect, useState } from 'react';
import GridDnD from '@custom/GridDnD';

const dataSource = [{
  id: 7,
  content: '布局1'
}, {
  id: 8,
  content: '布局2'
}, {
  id: 9,
  content: '布局3'
},
// {
//   id: 10,
//   content: '布局4'
// }, {
//   id: 11,
//   content: '布局5'
// }, {
//   id: 13,
//   content: '布局5'
// }, {
//   id: 12,
//   content: '布局6',
// },
{
  id: 'add',
  content: '添加'
}];

const maxLength = 6;

export function CardList({
  deviceData,
  doControlDeviceData,
  context: { switchNum },
  currentSwitch,
  history: { PATH, push },
  timerHeight,
  isModal,
  isPopUp
}) {

  const [data, setData] = useState([{
    id: 'add',
    content: '添加'
  }]);
  const [num, setNum] = useState(1);


  const onAddItemClick = () => {
    const _data = [...data];
    const addList = _data.splice(data.length - 1, 1);
    const item = data.length === maxLength ? [] : addList;
    setData([..._data, { id: num, content: `布局${num}` }, ...item]);
  }

  const onItemClick = (id) => {
    if (id === 'add') {
      onAddItemClick();
      setNum(num + 1);
      return;
    }
    push('/card/editor', { id })
  }

  return (
    <div className="card-list">
      <GridDnD dataSource={data} onChange={(items) => { console.log(items) }} onClick={onItemClick} />
    </div>
  );
}
