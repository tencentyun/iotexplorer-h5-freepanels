const SkinProps = {
  normal: {
    shutdown: {
      // 关机
      // 中心圆
      centerCicle: {
        circleX: 357,
        circleY: 357,
        circleR: 285,
        color: '#FFFFFF',
      },
      // 刻度线
      scaleLine: {
        defaultColor: 'rgba(156, 170, 181, 0.3)',
        activeColor: '#9CAAB5',
      },
      // 指针
      indicatorStyle: {
        color: '#9CAAB5',
      },
    },
    initiate: {
      // 工作中
      // 中心圆
      centerCicle: {
        circleX: 357,
        circleY: 357,
        circleR: 285,
        color: '#FFFFFF',
      },
      // 刻度线
      scaleLine: {
        defaultColor: 'rgba(14, 14, 14, 0.3)',
        activeColor: '#0E0E0E',
      },
      // 指针
      indicatorStyle: {
        color: '#0F0F0F',
      },
    },
  },
  blueWhite: {
    shutdown: {
      // 关机
      // 中心圆
      centerCicle: {
        circleX: 357,
        circleY: 357,
        circleR: 285,
        color: '#FFFFFF',
      },
      // 刻度线
      scaleLine: {
        defaultColor: 'rgba(254, 254, 254, 0.3)',
        activeColor: '#FEFEFE',
      },
      // 指针
      indicatorStyle: {
        color: '#9CAAB5',
      },
    },
    initiate: {
      // 工作中
      // 中心圆
      centerCicle: {
        circleX: 357,
        circleY: 357,
        circleR: 285,
        color: '#FFFFFF',
      },
      // 刻度线
      scaleLine: {
        defaultColor: 'rgba(254, 254, 254, 0.3)',
        activeColor: '#FEFEFE',
      },
      // 指针
      indicatorStyle: {
        color: '#0F0F0F',
      },
    },
  },
  dark: {
    shutdown: {
      // 关机
      // 中心圆
      centerCicle: {
        circleX: 357,
        circleY: 357,
        circleR: 285,
        color: 'url(#gradient)',
        startColor: '#333E4D',
        endColor: '#202C3A',
        strokeColor: 'rgba(62, 68, 84, 0.20)', // 描边
        strokeWidth: '3', // 描边
        shade: '', // 阴影
      },
      // 刻度线
      scaleLine: {
        defaultColor: 'rgba(38, 185, 250, 0.3)',
        activeColor: '#26B9FA',
      },
      // 指针
      indicatorStyle: {
        color: '#25B3F3',
      },
    },
    initiate: {
      // 工作中
      // 中心圆
      centerCicle: {
        circleX: 357,
        circleY: 357,
        circleR: 285,
        color: 'url(#gradient)',
        startColor: '#333E4D',
        endColor: '#202C3A',
        strokeColor: 'rgba(62, 68, 84, 0.20)', // 描边
        strokeWidth: '3', // 描边
        shade: '',
      },
      outerCicle: {
        circleR: 357,
        color: 'url(#gradient)',
        strokeColor: 'rgba(62, 68, 84, 0.20)', // 描边
        strokeWidth: '3', // 描边
        shade: '',
      },
      // 刻度线
      scaleLine: {
        defaultColor: 'rgba(38, 185, 250, 0.3)',
        activeColor: '#26B9FA',
      },
      // 指针
      indicatorStyle: {
        color: '#25B3F3',
      },
    },
  },
  colorful: {
    shutdown: {
      // 关机
      // 中心圆
      centerCicle: {
        circleX: 357,
        circleY: 357,
        circleR: 285,
        color: '#B4C3D0',
      },
      // 刻度线
      scaleLine: {
        defaultColor: '#667994',
        activeColor: '#667994',
      },
      // 指针
      indicatorStyle: {
        color: '#FEFEFE',
      },
    },
    initiate: {
      // 工作中
      // 中心圆
      centerCicle: {
        circleX: 357,
        circleY: 357,
        circleR: 285,
        color: 'url(#gradient)',
        startColor: '#527DF4',
        endColor: '#044DFF',
      },
      // 刻度线
      scaleLine: {
        defaultColor: '#667994',
        activeColor: '#FFD102',
      },
      // 指针
      indicatorStyle: {
        color: '#FFD102',
      },
    },
  },
  morandi: {
    shutdown: {
      // 关机
      // 中心圆
      centerCicle: {
        circleX: 357,
        circleY: 357,
        circleR: 285,
        color: '#FDFBFC',
      },
      // 刻度线
      scaleLine: {
        defaultColor: 'rgba(253, 251, 252, 0.3)',
        activeColor: '#FDFBFC',
      },
      // 指针
      indicatorStyle: {
        color: '#909CAB',
      },
    },
    initiate: {
      // 工作中
      // 中心圆
      centerCicle: {
        circleX: 357,
        circleY: 357,
        circleR: 285,
        color: '#FDFBFC',
      },
      // 刻度线
      scaleLine: {
        defaultColor: 'rgba(253, 251, 252, 0.3)',
        activeColor: '#FDFBFC',
      },
      // 指针
      indicatorStyle: {
        color: '#B6ACA3',
      },
    },
  },
};

export { SkinProps };
