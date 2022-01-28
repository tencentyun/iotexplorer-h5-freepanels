import { getThemeType } from '@libs/theme';
const themeType = getThemeType();

const skinProps = {
  normal: {
    more: {
      active: '#0F0F0F',
      default: '#C9D4DD',
    },
    warmth: {
      color: '#000000',
    },
    edit: {
      color: '#000000',
    },
    unit: {
      color: '#000000',
    },
  },
  blueWhite: {
    more: {
      active: '#FFFFFF',
      default: '#FFFFFF',
    },
    warmth: {
      color: '#006FFF',
    },
    edit: {
      color: '#000000',
    },
    unit: {
      color: '#006FFF',
    },
  },
  dark: {
    more: {
      active: '#FEFEFE',
      default: '#FEFEFE',
    },
    warmth: {
      gradientId: 'warmth',
      startColor: '#00F0FF',
      endColor: '#704DF0',
      x1: '11.8644068%',
      y1: '18.182147%',
      x2: '104.602754%',
      y2: '88.2505064%',
    },
    edit: {
      color: '#F9FAFA',
    },
    unit: {
      gradientId: 'unit',
      startColor: '#00F0FF',
      endColor: '#704DF0',
      x1: '11.8644068%',
      y1: '18.182147%',
      x2: '104.602754%',
      y2: '88.2505064%',
    },
  },
  colorful: {
    more: {
      active: '#2762FA',
      default: '#B4C3D0',
    },
    warmth: {
      color: '#FFD102',
    },
    edit: {
      color: '#000000',
    },
    unit: {
      color: '#006FFF',
    },
  },
  morandi: {
    more: {
      active: '#FDFBFC',
      default: '#FDFBFC',
    },
    warmth: {
      color: '#FFFFFF',
    },
    edit: {
      color: '#FFFFFF',
    },
    unit: {
      color: '#576273',
    },
  },
};

export const CurrentSkinProps: any = skinProps[themeType];
