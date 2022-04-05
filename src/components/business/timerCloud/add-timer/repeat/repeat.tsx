import React, { FC, useEffect, useState } from 'react';
import { Modal } from '@components/base';
import { Checkbox, List } from 'antd-mobile';
import IconChecked from '@components/base/icon-checked/icon-checked';

export const arrWeek = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

const Repeat: FC<{
  // eslint-disable-next-line no-unused-vars
  onConfirm?: (arrWeekVal: number[]) => void;
  defaultArrWeekVal?: number[];
}> = ({ onConfirm, defaultArrWeekVal }) => {
  const ARR_WEEK_VAL = [0, 0, 0, 0, 0, 0, 0];
  const [isShow, setIsShow] = useState(false);
  const [arrWeekVal, setWeekVal] = useState(defaultArrWeekVal || ARR_WEEK_VAL);

  const handleChecked = (index: number, val: number) => {
    const checked = arrWeekVal.slice();
    checked.splice(index, 1, val);
    setWeekVal(checked);
  };

  const handleConfirm = () => {
    onConfirm && onConfirm(arrWeekVal);
    setArrWeekCheckedCN(computeWeekVal());
  };

  const handleCancel = () => {
    setIsShow(false);
    setWeekVal(defaultArrWeekVal || ARR_WEEK_VAL);
  };

  useEffect(() => {
    setWeekVal(defaultArrWeekVal || ARR_WEEK_VAL);
  }, defaultArrWeekVal);

  const computeWeekVal = () => {
    const result: string[] = [];

    arrWeekVal.forEach((item, index) => {
      if (item === 1) {
        result.push(arrWeek[index]);
      }
    });

    return result.length ? result.join(' ') : '仅限一次';

    // const weekCheckedCN = arrWeekVal.map((item, index) => {
    //   if (item === 1) {
    //     return arrWeek[index];
    //   }
    // });
    // console.log(weekCheckedCN);
    // return weekCheckedCN.join(' ').length
    //   ? weekCheckedCN.join(' ')
    //   : '仅限一次';
  };
  const [arrWeekCheckedCN, setArrWeekCheckedCN] = useState(computeWeekVal());

  return (
    <>
      <List.Item
        className={'week-repeat'}
        prefix={'重复'}
        extra={arrWeekCheckedCN}
        onClick={() => {
          setIsShow(true);
        }}
      />
      <Modal
        visible={isShow}
        title={'重复'}
        onConfirm={handleConfirm}
        onClose={handleCancel}
      >
        <List>
          <Checkbox.Group>
            {arrWeek.map((day, index) => (
              <List.Item
                key={day}
                prefix={day}
                extra={
                  <Checkbox
                    checked={!!arrWeekVal[index]}
                    // defaultChecked={arrWeekVal[index] === 1}
                    onChange={(val) => {
                      handleChecked(index, val ? 1 : 0);
                    }}
                  >
                    <IconChecked isChecked={arrWeekVal[index] === 1} />
                  </Checkbox>
                }
              />

              /* <List.Item
                key={day}
                prefix={day}
                extra={
                  <IconChecked
                    defaultChecked={arrWeekVal[index] === 1}
                    onChange={val => {
                      handleChecked(index, val ? 1 : 0);
                    }}
                  />
                }
              />*/
            ))}
          </Checkbox.Group>
        </List>
        <p className={'week-repeat-desc'}>不勾选将默认只执行一次</p>
      </Modal>
    </>
  );
};
export default Repeat;
