import { getThemeType } from '@/business';
const themeType = getThemeType();

const skinProps = {
  normal: {
    battery: {
      color: ''
    },
    settings: {
      color: '#000000'
    }
  },
  blueWhite: {
    battery: {
      color: 'white'
    },
    settings: {
      color: '#2885FE'
    }
  },
  dark: {
    battery: {
      color: 'white'
    },
    settings: {
      gradientId: 'setting',
      startColor: '#0DDFFE',
      endColor: '#2885FE',
      x1: '18.8378836%',
      y1: '13.9723887%',
      x2: '100%',
      y2: '100%'
    }
  },
  colorful: {
    battery: {
      color: ''
    },
    settings: {
      gradientId: 'setting',
      startColor: '#FFDA01',
      endColor: '#FFC405',
      x1: '19.9901284%',
      y1: '0%',
      x2: '79.7644953%',
      y2: '100%'
    }
  },
  morandi: {
    battery: {
      color: 'white'
    },
    settings: {
      color: '#4F596A'
    }
  }
};

export const CurrentSkinProps: any = skinProps[themeType];
