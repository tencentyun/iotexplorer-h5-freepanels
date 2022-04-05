import React, { useEffect, useState } from 'react';
import { useTitle } from '@hooks/useTitle';
import { Btn } from '@custom/Btn';
import dayjs from 'dayjs';
import { List } from '@custom/List';

// 密码类型
const PASSWORD_TYPE = ['单次', '周期'];

const mockData = [
  {
    id: 1,
    type: 0,
    loseTime: 1648145585399, // 失效时间
    isLose: true,
  },
  {
    id: 2,
    type: 1,
    startTime: 1648145585399, // 开始时间
    endTime: 1648643044260, // 结束时间
    week: '周一、周三',
    isLose: false,
  },
  {
    id: 3,
    type: 0,
    loseTime: 1648145585399, // 失效时间
    isLose: true,
  },
  {
    id: 4,
    type: 1,
    startTime: 1648145585399, // 开始时间
    endTime: 1648643044260, // 结束时间
    week: '周二、周三',
    isLose: false,
  },
  {
    id: 5,
    type: 0,
    loseTime: 1648145585399, // 失效时间
    isLose: true,
  },


];

export function TempPassword({ history: { push, PATH }, tips }) {
  useTitle('临时密码');
  const [data, setData] = useState([]);

  const getPasswordList = async () => {
    // TODO
    const result = await Promise.resolve(mockData);
    setData(result);
  };

  // 删除单条密码
  const onDelete = (item) => {
    // TODO 执行删除指定的密码
    setData(data.filter(({ id }) => item.id !== id));
  };

  // 清空密码
  const onCleanClick = async () => {
    const isClean = await tips.confirm('确认清空');
    if (isClean) {
      // TODO
      setData([]);
      // getPasswordList();
    }
  };

  useEffect(() => {
    getPasswordList();
  }, []);

  return (
    <div className="temp-password">
      <Btn className="add-btn" onClick={() => push(PATH.TEMP_PASSWORD_ADD)}>
        添加+{' '}
      </Btn>
      <div className="password-list">
        <List
          data={data}
          onDelete={onDelete}
          render={({ loseTime, type, isLose, startTime, endTime, week }, index) => (
            <div key={index} className="item">
              <span>
                <div>{PASSWORD_TYPE[type]}</div>
                {type === 1
                  ? <div>
                    <div>{`${dayjs(startTime).format('YYYY/MM/DD HH:mm')} - ${dayjs(endTime).format('YYYY/MM/DD HH:mm')}`}</div>
                    <div>{`${week} ${dayjs(loseTime).format('HH:mm')}`}</div>
                  </div>
                  : <div>将于{dayjs(loseTime).format('YYYY/MM/DD  HH:mm')}失效</div>
                }

              </span>
              <span className={isLose ? 'flag fail' : 'flag success'}>{isLose ? '已失效' : '生效中'}</span>
            </div>
          )}
        />

        {/* {data.map(({ loseTime, type, isLose }, index) => (
          <div key={index} className="item">
            <span>
              <div>{PASSWORD_TYPE[type]}</div>
              <div>将于{dayjs(loseTime).format('YYYY/MM/DD  HH:mm')}失效</div>
            </span>
            <span className={isLose ? 'flag fail' : 'flag success'}>{isLose ? '已失效' : '生效中'}</span>
          </div>
        ))} */}
      </div>
      <div className="fix-bottom-btn">
        <Btn btnText="清空" type="danger" onClick={onCleanClick} />
      </div>
    </div>
  );
}
