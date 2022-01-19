import { getThemeType } from '@/business';
const themeType = getThemeType();

const skinProps = {
  normal: {
    battery: {
      color: ''
    },
    record: {
      color: '#000000'
    },
    settings: {
      color: '#000000'
    }
  },
  blueWhite: {
    battery: {
      color: 'white'
    },
    record: {
      color: '#2885FE'
    },
    settings: {
      color: '#2885FE'
    }
  },
  dark: {
    battery: {
      color: 'white'
    },
    record: {
      gradientId: 'record',
      startColor: '#0DDFFE',
      endColor: '#2885FE',
      x1: '18.8378836%',
      y1: '13.9723887%',
      x2: '100%',
      y2: '100%'
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
      color: 'colorful'
    },
    record: {
      gradientId: 'record',
      startColor: '#57C6D6',
      endColor: '#60A1DF',
      x1: '50%',
      y1: '0%',
      x2: '50%',
      y2: '100%'
    },
    settings: {
      gradientId: 'setting',
      startColor: '#F773B2',
      endColor: '#9879F1',
      x1: '50%',
      y1: '0%',
      x2: '50%',
      y2: '100%'
    }
  },
  morandi: {
    battery: {
      color: 'white'
    },
    record: {
      color: '#4F596A'
    },
    settings: {
      color: '#4F596A'
    }
  }
};

export const CurrentSkinProps: any = skinProps[themeType];
