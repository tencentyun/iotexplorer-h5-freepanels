import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Image } from '@custom/Image';
import { Btn } from '@custom/Btn';

const src =
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg9.51tietu.net%2Fpic%2F2019-091216%2Ftn25ktz0usktn25ktz0usk.jpg&refer=http%3A%2F%2Fimg9.51tietu.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1650682187&t=9d3ef8eaf2f52353d3ef2dc6e40ca922';
export function Photos({ tips }) {
  const [select, setSelect] = useState([]); // 选中的照片
  const [checkable, setCheckable] = useState(true); // 是否可以选择
  const result = [
    {
      dateTime: 1648089813698,
      total: 300,
      data: [{ src, id: '1' }]
    },
    {
      dateTime: 1648089813698,
      total: 300,
      data: [
        { src, id: '21' },
        { src, id: '22' }
      ]
    },
    {
      dateTime: 1648089813698,
      total: 300,
      data: [
        { src, id: '31' },
        { src, id: '32' },
        { src, id: '33' }
      ]
    },
    {
      dateTime: 1648089813698,
      total: 300,
      data: [
        { src, id: '41' },
        { src, id: '42' },
        { src, id: '43' },
        { src, id: '44' },
        { src, id: '45' }
      ]
    },
    {
      dateTime: 1648089813698,
      total: 300,
      data: [
        { src, id: '51' },
        { src, id: '54' },
        { src, id: '53' },
        { src, id: '54' },
        { src, id: '55' },
        { src, id: '56' },
        { src, id: '57' },
        { src, id: '58' },
        { src, id: '59' }
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
      data: [{ src, id: '71' }]
    }
  ];

  const onChange = (isChecked, id) => {
    if (isChecked) {
      setSelect(select.slice().concat(id));
    } else {
      setSelect(select.slice().filter((existId) => existId !== id));
    }
  };
  return (
    <div className="event-photo">
      {result
        .filter(({ data }) => data.length)
        .map(({ dateTime, total, data = [] }) => (
          <div key={dateTime} className="group">
            <div className="title">
              <span>{dateTime ? dayjs(dateTime).format('M月D日') : ''}</span>
              <span>共{total || 0}个</span>
            </div>
            <div className="content">
              {data.map(({ src, id }) => (
                <Image
                  key={id}
                  src={src}
                  checkable={checkable}
                  checked={select.includes(id)}
                  onChange={(isChecked) => onChange(isChecked, id)}
                />
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
