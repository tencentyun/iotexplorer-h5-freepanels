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
      color: '#2885FE'
    },
    settings: {
      gradientId: 'setting',
      startColor: '#0DDFFE',
      endColor: '#2885FE'
    }
  },
  colorful: {
    battery: {
      color: ''
    },
    record: {
      gradientId: 'record',
      startColor: '#27E75B',
      endColor: '#01E1A9'
    },
    settings: {
      gradientId: 'setting',
      startColor: '#FFDA01',
      endColor: '#FFC405'
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
