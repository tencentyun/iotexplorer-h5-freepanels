import { getThemeType } from '@/business';
const themeType = getThemeType();

const skinProps = {
  normal: {
    tempChart: {
      id: 'tempChart',
      isShowX: false,
      type: 'line',
      lineColor: '#0F0F0F',
      isSolid: false,
      pointFill: '#FFFFFF',
      pointColor: '#0F0F0F',
      wordColor: '#000000',
      bottom: 90,
      unit: '°C'
    },
    humidityChart: {
      id: 'humidityChart',
      isShowX: true,
      axisWordColor: '#000000',
      type: 'area',
      lineColor: '#B5C4D1',
      isSolid: false,
      pointFill: '#FFFFFF',
      pointColor: '#B5C4D1',
      wordColor: '#B5C4D1',
      areaColor: 'url(#area-normal)',
      bottom: 50
    },
    icon: {
      color: '#000000'
    },
    temperature: {
      color: '#000000'
    },
    history: {
      color: '#000000'
    }
  },
  blueWhite: {
    tempChart: {
      id: 'tempChart',
      isShowX: false,
      type: 'line',
      lineColor: '#FCFDFF',
      isSolid: false,
      pointFill: '#0076FF',
      pointColor: '#FCFDFF',
      wordColor: '#FCFDFF',
      bottom: 90,
      unit: '°C'
    },
    humidityChart: {
      id: 'humidityChart',
      isShowX: true,
      axisWordColor: '#FCFDFF',
      type: 'line',
      lineColor: '#FCFDFF',
      isSolid: true,
      pointColor: '#FCFDFF',
      wordColor: '#FCFDFF',
      bottom: 50
    },
    temperature: {
      color: '#0079FF'
    },
    history: {
      color: '#0079FF'
    },
    icon: {
      color: '#0079FF'
    }
  },
  dark: {
    tempChart: {
      id: 'tempChart',
      isShowX: false,
      type: 'line',
      lineColor: '#1EC4FB',
      isSolid: true,
      pointColor: '#1EC4FB',
      wordColor: '#1EC4FB',
      bottom: 90,
      unit: '°C'
    },
    humidityChart: {
      id: 'humidityChart',
      isShowX: true,
      axisWordColor: '#FFFFFF',
      type: 'line',
      lineColor: '#FFFFFF',
      isSolid: true,
      pointColor: '#FFFFFF',
      wordColor: '#FFFFFF',
      bottom: 50
    },
    temperature: {
      gradientId: 'temperature',
      startColor: '#04EAFE',
      endColor: '#448EF6',
      x1: '61.5645064%',
      y1: '-28.7259615%',
      x2: '61.5645064%',
      y2: '100%'
    },
    history: {
      gradientId: 'history',
      startColor: '#04EAFE',
      endColor: '#448EF6',
      x1: '61.5645064%',
      y1: '-28.7259615%',
      x2: '61.5645064%',
      y2: '100%'
    }
  },
  colorful: {
    tempChart: {
      id: 'tempChart',
      isShowX: false,
      type: 'line',
      lineColor: '#1D5CFB',
      isSolid: true,
      pointColor: 'url(#point-colorful)',
      wordColor: '#000000',
      bottom: 90,
      unit: '°C'
    },
    humidityChart: {
      id: 'humidityChart',
      isShowX: true,
      axisWordColor: '#000000',
      type: 'area',
      lineColor: '#FFD102',
      isSolid: true,
      pointColor: '#FFD102',
      wordColor: '#000000',
      areaColor: 'url(#area-colorful)',
      bottom: 50
    },
    temperature: {
      gradientId: 'temperature',
      startColor: '#2CE74F',
      endColor: '#00E1AD',
      x1: '50%',
      y1: '0%',
      x2: '50%',
      y2: '100%'
    },
    history: {
      gradientId: 'history',
      startColor: '#3FE83F',
      endColor: '#00D8B2',
      x1: '50%',
      y1: '0%',
      x2: '50%',
      y2: '100%'
    }
  },
  morandi: {
    tempChart: {
      id: 'tempChart',
      isShowX: false,
      type: 'line',
      lineColor: '#FDFBFC',
      isSolid: true,
      pointColor: '#FDFBFC',
      wordColor: '#FDFBFC',
      bottom: 90,
      unit: '°C'
    },
    humidityChart: {
      id: 'humidityChart',
      isShowX: true,
      axisWordColor: '#FDFBFC',
      type: 'area',
      lineColor: '#B5ABA1',
      isSolid: true,
      pointColor: '#B5ABA1',
      wordColor: '#B5ABA1',
      areaColor: 'url(#area-morandi)',
      bottom: 50
    },
    temperature: {
      color: '#566172'
    },
    history: {
      color: '#566172'
    }
  }
};

export const CurrentSkinProps: any = skinProps[themeType];
