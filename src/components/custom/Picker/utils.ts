import dayjs from 'dayjs';
export function generateIntArray(from: number, to: number) {
  const array = [] as number[];
  for (let i = from; i <= to; i++) {
    array.push(i);
  }
  return array;
}

const fillTwoDigit = (value, showTwoDigit) => {
  if (!showTwoDigit) return value;
  return value < 10 ? `0${value}` : value;
};

export const appendUnit = (data: number[] = [], showTwoDigit: boolean | undefined, unit = '') => data.map(value => ({ text: fillTwoDigit(value, showTwoDigit) + unit, value }));

export const getYears = (begin: Date, end: Date, showUnit: string, showTwoDigit: boolean) => {
  let beginYear = dayjs(begin)?.$y as number;
  let endYear = dayjs(end)?.$y as number;
  if (beginYear >= endYear) {
    endYear = beginYear;
    beginYear = beginYear - 10;
  }
  return appendUnit(generateIntArray(beginYear, endYear), showTwoDigit, showUnit);
};

// 获取某年 某月的天数
function getMDays(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const data = new Date(year, month, 0);
  const days = data.getDate();
  return days;
}

export const getMouths = (showUnit, showTwoDigit) => appendUnit(generateIntArray(1, 12), showTwoDigit, showUnit);

export const getDays = (showUnit: string | undefined, showTwoDigit: boolean | undefined, date: Date) => {
  const data = generateIntArray(1, getMDays(date));
  return appendUnit(data, showTwoDigit, showUnit);
};


