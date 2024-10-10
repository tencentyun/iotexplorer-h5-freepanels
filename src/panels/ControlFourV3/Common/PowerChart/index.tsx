import React, { useEffect, useState } from 'react';
import { LineChart } from '../Home/LineChart';
import { Btn } from '@src/components/custom/Btn';
import classNames from 'classnames';
import { t } from '@locales';

const btns = [
  [t('日'), 'day'],
  [t('周'), 'week'],
  [t('月'), 'month'],
  [t('年'), 'year'],
];

const xData = {
  day: ['2023-06-01', '2023-06-02', '2023-06-03', '2023-06-04', '2023-06-05', '2023-06-06', '2023-06-07'],
  week: [t('周一'), t('周二'), t('周三'), t('周四'), t('周五'), t('周六'), t('周日')],
  month: [t('一月'), t('二月'), t('三月'), t('四月'), t('五月'), t('六月'), t('七月')],
  year: ['2017', '2018', '2019', '2020', '2021', '2022', '2023'],
};
const yData = {
  day: [820, 932, 901, 934, 1290, 1330, 1320],
  week: [720, 332, 931, 934, 1390, 1320, 320],
  month: [920, 432, 941, 934, 1590, 1230, 1420],
  year: [620, 532, 981, 934, 1890, 1130, 500],
};
function PowerChart() {
  const [selected, setSelected] = useState(btns[0][1]);
  return (
    <div className="ec-chart">
      <div className="cycle-btns">
        {btns.map(([label, value], index) => <Btn className={classNames("custom-btn", selected === value ? 'selected' : '')} key={index} onClick={() => setSelected(value)} >{label}</Btn>)}
      </div>
      <div className="desc">
        <div className="content">
          <div className="value">300</div>
          <div className="unit">{t('度')}</div>
        </div>
        <div className="label">{t('当前用电量')}</div>
      </div>
      <div className="container">
        <LineChart xData={xData[selected]} yData={yData[selected]} />
      </div>
    </div>
  );
}

export default PowerChart;
