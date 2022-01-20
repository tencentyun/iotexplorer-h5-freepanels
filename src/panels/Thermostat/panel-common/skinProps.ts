import { getThemeType } from '@/business';
const themeType = getThemeType();

const skinProps = {
  normal: {
    shutdown: {
      mode: {
        color: '#B5C4D1'
      },
      gear: {
        color: '#B5C4D1'
      },
      settings: {
        color: '#B5C4D1'
      }
    },
    initiate: {
      battery: {
        color: ''
      },
      mode: {
        color: '#000000'
      },
      gear: {
        color: '#000000'
      },
      settings: {
        color: '#000000'
      }
    },
    record: {
      color: '#000000'
    },
    settings: {
      color: '#000000'
    },
    power: {
      color: '#FFFFFF'
    },
    anion: {
      color: '#000000'
    }, // 负离子
    lamplight: {
      color: '#000000'
    }, // 灯光
    sound: {
      color: '#000000'
    },
    eco: {
      color: '#000000'
    }, // eco
    window: {
      color: '#000000'
    }, // 开窗检测
    sleep: {
      color: '#000000'
    }, // 睡眠功能
    frost: {
      color: '#000000'
    }, // 防霜冻功能
    check: {
      color: '#000000'
    }, // 阀门检测
    unit: {
      color: '#000000'
    }
  },
  blueWhite: {
    shutdown: {
      mode: {
        color: '#B5C4D1'
      },
      gear: {
        color: '#B5C4D1'
      },
      settings: {
        color: '#B5C4D1'
      }
    },
    initiate: {
      battery: {
        color: '#2885FE'
      },
      mode: {
        color: '#006FFF'
      },
      gear: {
        color: '#006FFF'
      },
      settings: {
        color: '#006FFF'
      }
    },
    battery: {
      color: 'white'
    },
    record: {
      color: '#2885FE'
    },
    settings: {
      color: '#2885FE'
    },
    power: {
      color: '#2885FE'
    },
    anion: {
      gradientId: 'anion',
      startColor: '#3374FA',
      endColor: '#549CFC',
      x1: '50%',
      y1: '0%',
      x2: '50%',
      y2: '100%'
    }, // 负离子
    lamplight: {
      gradientId: 'lamplight',
      startColor: '#3374FA',
      endColor: '#549CFC',
      x1: '50%',
      y1: '0%',
      x2: '50%',
      y2: '100%'
    }, // 灯光
    sound: {
      gradientId: 'sound',
      startColor: '#3374FA',
      endColor: '#549CFC',
      x1: '50%',
      y1: '0%',
      x2: '50%',
      y2: '100%'
    }, // 声音
    eco: {
      gradientId: 'eco',
      startColor: '#3374FA',
      endColor: '#549CFC',
      x1: '50%',
      y1: '0%',
      x2: '50%',
      y2: '100%'
    }, // eco
    window: {
      gradientId: 'window',
      startColor: '#3374FA',
      endColor: '#549CFC',
      x1: '50%',
      y1: '0%',
      x2: '50%',
      y2: '100%'
    }, // 开窗检测
    sleep: {
      gradientId: 'sleep',
      startColor: '#3374FA',
      endColor: '#549CFC',
      x1: '50%',
      y1: '0%',
      x2: '50%',
      y2: '100%'
    }, // 睡眠功能
    frost: {
      gradientId: 'frost',
      startColor: '#3374FA',
      endColor: '#549CFC',
      x1: '50%',
      y1: '0%',
      x2: '50%',
      y2: '100%'
    }, // 防霜冻功能
    check: {
      gradientId: 'check',
      startColor: '#3374FA',
      endColor: '#549CFC',
      x1: '50%',
      y1: '0%',
      x2: '50%',
      y2: '100%'
    }, // 阀门检测
    unit: {
      gradientId: 'unit',
      startColor: '#3374FA',
      endColor: '#549CFC',
      x1: '50%',
      y1: '0%',
      x2: '50%',
      y2: '100%'
    }
  },
  dark: {
    shutdown: {
      mode: {
        color: '#B5C4D1'
      },
      gear: {
        color: '#B5C4D1'
      },
      settings: {
        color: '#B5C4D1'
      }
    },
    initiate: {
      battery: {
        color: ''
      },
      mode: {
        gradientId: 'mode',
        startColor: '#00F0FF',
        endColor: '#704DF0',
        x1: '11.8644068%',
        y1: '18.182147%',
        x2: '104.602754%',
        y2: '88.2505064%'
      },
      gear: {
        gradientId: 'gear',
        startColor: '#00F0FF',
        endColor: '#704DF0',
        x1: '11.8644068%',
        y1: '18.182147%',
        x2: '104.602754%',
        y2: '88.2505064%'
      },
      settings: {
        gradientId: 'setting',
        startColor: '#00F0FF',
        endColor: '#704DF0',
        x1: '11.8644068%',
        y1: '18.182147%',
        x2: '104.602754%',
        y2: '88.2505064%'
      }
    },
    record: {
      color: '#2885FE'
    },
    settings: {
      gradientId: 'setting',
      startColor: '#0DDFFE',
      endColor: '#2885FE'
    },
    power: {
      color: '#FFFFFF'
    },
    anion: {
      gradientId: 'anion',
      startColor: '#00F0FF',
      endColor: '#704DF0',
      x1: '11.8644068%',
      y1: '18.182147%',
      x2: '104.602754%',
      y2: '88.2505064%'
    }, // 负离子
    lamplight: {
      gradientId: 'lamplight',
      startColor: '#00F0FF',
      endColor: '#704DF0',
      x1: '11.8644068%',
      y1: '18.182147%',
      x2: '104.602754%',
      y2: '88.2505064%'
    }, // 灯光
    sound: {
      gradientId: 'sound',
      startColor: '#00F0FF',
      endColor: '#704DF0',
      x1: '11.8644068%',
      y1: '18.182147%',
      x2: '104.602754%',
      y2: '88.2505064%'
    },
    eco: {
      gradientId: 'eco',
      startColor: '#00F0FF',
      endColor: '#704DF0',
      x1: '11.8644068%',
      y1: '18.182147%',
      x2: '104.602754%',
      y2: '88.2505064%'
    }, // eco
    window: {
      gradientId: 'window',
      startColor: '#00F0FF',
      endColor: '#704DF0',
      x1: '11.8644068%',
      y1: '18.182147%',
      x2: '104.602754%',
      y2: '88.2505064%'
    }, // 开窗检测
    sleep: {
      gradientId: 'sleep',
      startColor: '#00F0FF',
      endColor: '#704DF0',
      x1: '11.8644068%',
      y1: '18.182147%',
      x2: '104.602754%',
      y2: '88.2505064%'
    }, // 睡眠功能
    frost: {
      gradientId: 'frost',
      startColor: '#00F0FF',
      endColor: '#704DF0',
      x1: '11.8644068%',
      y1: '18.182147%',
      x2: '104.602754%',
      y2: '88.2505064%'
    }, // 防霜冻功能
    check: {
      gradientId: 'check',
      startColor: '#00F0FF',
      endColor: '#704DF0',
      x1: '11.8644068%',
      y1: '18.182147%',
      x2: '104.602754%',
      y2: '88.2505064%'
    }, // 阀门检测
    unit: {
      gradientId: 'unit',
      startColor: '#00F0FF',
      endColor: '#704DF0',
      x1: '11.8644068%',
      y1: '18.182147%',
      x2: '104.602754%',
      y2: '88.2505064%'
    }
  },
  colorful: {
    shutdown: {
      mode: {
        color: '#B5C4D1'
      },
      gear: {
        color: '#B5C4D1'
      },
      settings: {
        color: '#B5C4D1'
      }
    },
    initiate: {
      battery: {
        color: ''
      },
      mode: {
        gradientId: 'mode',
        startColor: '#2CE74F',
        endColor: '#00E1AD',
        x1: '50%',
        y1: '0%',
        x2: '50%',
        y2: '100%'
      },
      gear: {
        gradientId: 'gear',
        startColor: '#527DF4',
        endColor: '#044DFF',
        x1: '11.8644068%',
        y1: '18.182147%',
        x2: '104.602754%',
        y2: '88.2505064%'
      },
      settings: {
        gradientId: 'setting',
        startColor: '#FFDB01',
        endColor: '#FFC105',
        x1: '50%',
        y1: '0%',
        x2: '50%',
        y2: '100%'
      }
    },
    power: {
      color: '#FFFFFF'
    },
    anion: {
      gradientId: 'anion',
      startColor: '#3FE83F',
      endColor: '#00D8B2',
      x1: '50%',
      y1: '0%',
      x2: '50%',
      y2: '100%'
    }, // 负离子
    lamplight: {
      gradientId: 'lamplight',
      startColor: '#2960F3',
      endColor: '#1753FF',
      x1: '50%',
      y1: '0%',
      x2: '50%',
      y2: '100%'
    }, // 灯光
    sound: {
      gradientId: 'sound',
      startColor: '#57C6D6',
      endColor: '#60A1DF',
      x1: '50%',
      y1: '0%',
      x2: '50%',
      y2: '100%'
    },
    eco: {
      gradientId: 'eco',
      startColor: '#F773B2',
      endColor: '#9879F1',
      x1: '50%',
      y1: '0%',
      x2: '50%',
      y2: '100%'
    }, // eco
    window: {
      gradientId: 'window',
      startColor: '#FBE31A',
      endColor: '#FFB813',
      x1: '50%',
      y1: '0%',
      x2: '50%',
      y2: '100%'
    }, // 开窗检测
    sleep: {
      gradientId: 'sleep',
      startColor: '#3FE83F',
      endColor: '#00D8B2',
      x1: '50%',
      y1: '0%',
      x2: '50%',
      y2: '100%'
    }, // 睡眠功能
    frost: {
      gradientId: 'frost',
      startColor: '#5079F9',
      endColor: '#064EFF',
      x1: '50%',
      y1: '0%',
      x2: '50%',
      y2: '100%'
    }, // 防霜冻功能
    check: {
      gradientId: 'check',
      startColor: '#F773B2',
      endColor: '#9879F1',
      x1: '50%',
      y1: '0%',
      x2: '50%',
      y2: '100%'
    }, // 阀门检测
    unit: {
      gradientId: 'unit',
      startColor: '#527DF4',
      endColor: '#044DFF',
      x1: '11.8644068%',
      y1: '18.182147%',
      x2: '104.602754%',
      y2: '88.2505064%'
    }
  },
  morandi: {
    shutdown: {
      mode: {
        color: '#909CAB'
      },
      gear: {
        color: '#909CAB'
      },
      settings: {
        color: '#909CAB'
      }
    },
    initiate: {
      battery: {
        color: ''
      },
      mode: {
        color: '#B6ACA3'
      },
      gear: {
        color: '#B6ACA3'
      },
      settings: {
        color: '#B6ACA3'
      }
    },
    default: {
      color: '#909CAB'
    },
    active: {
      color: '#B6ACA3'
    },
    record: {
      color: '#4F596A'
    },
    settings: {
      color: '#4F596A'
    },
    power: {
      color: '#FFFFFF'
    },
    anion: {
      color: '#576273'
    }, // 负离子
    lamplight: {
      color: '#576273'
    }, // 灯光
    sound: {
      color: '#576273'
    },
    eco: {
      color: '#576273'
    }, // eco
    window: {
      color: '#576273'
    }, // 开窗检测
    sleep: {
      color: '#576273'
    }, // 睡眠功能
    frost: {
      color: '#576273'
    }, // 防霜冻功能
    check: {
      color: '#576273'
    }, // 阀门检测
    unit: {
      color: '#576273'
    }
  }
};

export const CurrentSkinProps: any = skinProps[themeType];
