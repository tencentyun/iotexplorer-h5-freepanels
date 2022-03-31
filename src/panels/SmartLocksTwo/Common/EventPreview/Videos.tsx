import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Image } from '@custom/Image';
import { Btn } from '@custom/Btn';
import { CheckBox } from '@custom/CheckBox';

const src =
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg9.51tietu.net%2Fpic%2F2019-091216%2Ftn25ktz0usktn25ktz0usk.jpg&refer=http%3A%2F%2Fimg9.51tietu.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1650682187&t=9d3ef8eaf2f52353d3ef2dc6e40ca922';
const result = [
  {
    dateTime: 1648089813698,
    total: 300,
    data: [{ src, id: '1', videoLength: '00: 06', message: '有人移动逗留', time: 1648089813698 }]
  },
  {
    dateTime: 1648089813698,
    total: 300,
    data: [
      { src, id: '21', videoLength: '00: 06', message: '有人移动逗留', time: 1648089813698 },
      { src, id: '22', videoLength: '00: 06', message: '有人移动逗留', time: 1648089813698 }
    ]
  },
  {
    dateTime: 1648089813698,
    total: 300,
    data: [
      { src, id: '31', videoLength: '00: 06', message: '有人移动逗留', time: 1648089813698 },
      { src, id: '32', videoLength: '00: 06', message: '有人移动逗留', time: 1648089813698 },
      { src, id: '33', videoLength: '00: 06', message: '有人移动逗留', time: 1648089813698 }
    ]
  },
  {
    dateTime: 1648089813698,
    total: 300,
    data: [
      { src, id: '41', videoLength: '00: 06', message: '有人移动逗留', time: 1648089813698 },
      { src, id: '42', videoLength: '00: 06', message: '有人移动逗留', time: 1648089813698 },
      { src, id: '43', videoLength: '00: 06', message: '有人移动逗留', time: 1648089813698 },
      { src, id: '44', videoLength: '00: 06', message: '有人移动逗留', time: 1648089813698 },
      { src, id: '45', videoLength: '00: 06', message: '有人移动逗留', time: 1648089813698 }
    ]
  },
  {
    dateTime: 1648089813698,
    total: 300,
    data: [
      { src, id: '51', videoLength: '00: 06', message: '有人移动逗留', time: 1648089813698 },
      { src, id: '54', videoLength: '00: 06', message: '有人移动逗留', time: 1648089813698 },
      { src, id: '53', videoLength: '00: 06', message: '有人移动逗留', time: 1648089813698 },
      { src, id: '54', videoLength: '00: 06', message: '有人移动逗留', time: 1648089813698 },
      { src, id: '55', videoLength: '00: 06', message: '有人移动逗留', time: 1648089813698 },
      { src, id: '56', videoLength: '00: 06', message: '有人移动逗留', time: 1648089813698 },
      { src, id: '57', videoLength: '00: 06', message: '有人移动逗留', time: 1648089813698 },
      { src, id: '58', videoLength: '00: 06', message: '有人移动逗留', time: 1648089813698 },
      { src, id: '59', videoLength: '00: 06', message: '有人移动逗留', time: 1648089813698 }
    ]
  },
  {
    dateTime: undefined,
    total: undefined,
    data: []
  },
  {
    dateTime: undefined,
    total: undefined,
    data: [{ src, id: '71', videoLength: '00: 06', message: '有人移动逗留', time: 1648089813698 }]
  }
];

export function Videos(props) {
  const [select, setSelect] = useState([]); // 选中的照片
  const [checkable, setCheckable] = useState(true); // 是否可以选择
  const onChange = (isChecked, id) => {
    if (isChecked) {
      setSelect(select.slice().concat(id));
    } else {
      setSelect(select.slice().filter((existId) => existId !== id));
    }
  };

  return (
    <div className="event-videos">
      {result
        .filter(({ data }) => data.length)
        .map(({ dateTime, total, data = [] }) => (
          <div key={dateTime} className="group">
            <div className="title">
              <span>{dateTime ? dayjs(dateTime).format('M月D日') : ''}</span>
              <span>共{total || 0}个</span>
            </div>
            <div className="content">
              {data.map(({ src, id, message, time }) => (
                <div className="item" key={id}>
                  <CheckBox value={select.includes(id)} type="radio" onChange={(checked) => onChange(checked, id)} />
                  {/* TODO 确认视频后切换为视频组件 */}
                  <Image src={src} />
                  <div className="infos">
                    <div className="tips">{message}</div>
                    <div className="time">{time ? dayjs(time).format('YYYY-MM-DD HH: mm: ss') : ''}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      {select.length ? (
        <div className="fix-bottom-btn">
          <Btn btnText="删除" type="danger" />{' '}
        </div>
      ) : null}
    </div>
  );
}
