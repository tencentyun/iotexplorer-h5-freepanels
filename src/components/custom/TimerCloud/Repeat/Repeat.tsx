import React from 'react';
import { List, Checkbox } from 'antd-mobile';
import { Icon } from '@custom/Icon';
import { t } from '@locales';

export const arrWeek = [t('周日'), t('周一'), t('周二'), t('周三'), t('周四'), t('周五'), t('周六')]

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

const setWeeksFormat = (weeks: number[]) => {
  if (!weeks) return [];
  const res = [] as number[];
  for (let i = 0; i < 7; i++) {
    res[i] = weeks.includes(i) ? 1 : 0;
  }
  return res;
};

export const Repeat = ({ context: { Days = [] }, setContext }) => {
  const weeks = getWeeks(Days);
  return (
    <div className="timer-action switch-modal">
      <List>
        <Checkbox.Group
          value={weeks}
          onChange={(val) => {
            setContext('Days', setWeeksFormat(val));
          }}
        >
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
      <div className="description">{t('不勾选将默认只执行一次')}</div>
    </div>
  );
};
