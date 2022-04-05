import React, { useState } from 'react';
import { Modal } from '@custom/Modal';
import { Checkbox, List } from 'antd-mobile';
import { Icon } from '@custom/Icon';

export const arrWeek = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

const getWeeks = (weeks: number[]) => {
  if (!weeks) return [];
  const res = [] as number[];
  for (let i = 0; i < weeks.length; i++) {
    if (weeks[i]) {
      res.push(i);
    }
  }
  return res;
};

const setWeeksFormat = (weeks: (number | string)[]) => {
  if (!weeks) return [];
  const res = [] as number[];
  for (let i = 0; i < 7; i++) {
    res[i] = weeks.includes(i) ? 1 : 0;
  }
  return res;
};

const Repeat = ({ onConfirm, defaultArrWeekVal }) => {
  const defaultWeeks = getWeeks(defaultArrWeekVal);
  const [visible, setVisible] = useState(false);
  const [weeks, setWeeks] = useState<(number | string)[]>(defaultWeeks);

  const handleConfirm = () => {
    onConfirm && onConfirm(setWeeksFormat(weeks));
    // setArrWeekCheckedCN(computeWeekVal());
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
    setWeeks(defaultWeeks);
  };

  const computeWeekVal = () => {
    const result: string[] = [];
    setWeeksFormat(weeks).forEach((item, index) => {
      if (item === 1) {
        result.push(arrWeek[index]);
      }
    });
    return result.length ? result.join(' ') : '仅限一次';
  };

  return (
    <>
      <List.Item
        className={`week-repeat ${weeks.length > 5 ? 'week-small' : ''}`}
        prefix={'重复'}
        extra={computeWeekVal()}
        onClick={() => {
          setVisible(true);
        }}
      />
      <Modal
        className="repeat-modal"
        visible={visible}
        title={'重复'}
        onClose={handleCancel}
      >
        <Modal.Body>
          <List className="repeat-list">
            <Checkbox.Group value={weeks} onChange={setWeeks}>
              {arrWeek.map((day, index) => (
                <List.Item
                  key={day}
                  prefix={day}
                  extra={
                    <Checkbox value={index}>
                      <Icon size="small" checked={weeks.includes(index)} />
                    </Checkbox>
                  }
                />
              ))}
            </Checkbox.Group>
          </List>
          <p className="week-repeat-desc">不勾选将默认只执行一次</p>
        </Modal.Body>
        <Modal.Footer>
          <Modal.FooterConfirmBtnGroup
            {...{
              onCancel: handleCancel,
              onConfirm: handleConfirm,
              confirmText: '确定',
              isInFixedBottomModal: true,
              cancelText: '取消',
              confirmBtnType: 'default',
              cancelBtnType: 'default',
            }}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Repeat;
