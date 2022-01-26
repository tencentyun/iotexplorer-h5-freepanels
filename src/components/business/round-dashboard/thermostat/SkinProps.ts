const SkinProps = {
  normal: {
    shutdown: {
      // 关机
      // 刻度线
      scaleLine: {
        defaultColor: 'rgba(156, 170, 181, 0.3)',
        activeColor: '#9CAAB5'
      },
      // 指针
      indicatorStyle: {
        color: '#9CAAB5'
      }
    },
    initiate: {
      // 工作中
      // 刻度线
      scaleLine: {
        defaultColor: 'rgba(14, 14, 14, 0.3)',
        activeColor: '#0E0E0E',
        animaTime: 60
      },
      // 指针
      indicatorStyle: {
        color: '#0F0F0F'
      }
    }
  },
  blueWhite: {
    shutdown: {
      warmth: {
        width: 75,
        height: 84,
        color: '#A4ADC0'
      },
      // 关机
      scaleIsGradient: true,
      // 中心圆
      centerCicle: {
        circleX: 357,
        circleY: 357,
        circleR: 285,
        color: '#FFFFFF'
      },
      outerCicle: {
        circleR: 357,
        color: 'rgba(254,254,254,0.20)' // 颜色
      },
      // 刻度线
      scaleLine: {
        defaultColor: 'rgba(254, 254, 254, 0.3)',
        activeColor: '#FEFEFE',
        animaTime: 60
      }
    },
    initiate: {
      warmth: {
        width: 75,
        height: 84,
        color: '#2885FE'
      },
      // 工作中
      scaleIsGradient: true,
      // 中心圆
      centerCicle: {
        circleX: 357,
        circleY: 357,
        circleR: 285,
        color: '#FFFFFF'
      },
      outerCicle: {
        circleR: 357,
        color: 'rgba(254,254,254,0.20)' // 颜色
      },
      // 刻度线
      scaleLine: {
        defaultColor: 'rgba(254, 254, 254, 0.3)',
        activeColor: '#FEFEFE',
        animaTime: 60
      }
    }
  },
  dark: {
    shutdown: {
      warmth: {
        width: 75,
        height: 84,
        color: '#FEFEFE'
      },
      // 关机
      scaleIsGradient: true,
      // 中心圆
      // 中心圆
      centerCicle: {
        circleX: 357,
        circleY: 357,
        circleR: 285,
        color: 'url(#gradient)',
        startColor: '#333E4D', // 渐变
        endColor: '#202C3A', // 渐变
        strokeColor: 'rgba(62,68,84,0.20)', // 描边
        strokeWidth: 3,
        shade: 'url(#dropshadow)'
      },
      outerCicle: {
        circleR: 357,
        color: 'url(#gradient)',
        startColor: '#333E4D', // 渐变
        endColor: '#202C3A', // 渐变
        strokeColor: 'rgba(62,68,84,0.20)', // 描边
        strokeWidth: 3,
        shade: 'url(#dropshadow)'
      },
      // 刻度线
      scaleLine: {
        defaultColor: 'rgba(254, 254, 254, 0.3)',
        activeColor: '#26B9FA',
        animaTime: 60
      }
    },
    initiate: {
      warmth: {
        width: 75,
        height: 84,
        color: '#FEFEFE'
      },
      // 关机
      scaleIsGradient: true,
      // 中心圆
      centerCicle: {
        circleX: 357,
        circleY: 357,
        circleR: 285,
        color: 'url(#gradient)',
        startColor: '#333E4D', // 渐变
        endColor: '#202C3A', // 渐变
        strokeColor: 'rgba(62,68,84,0.20)', // 描边
        strokeWidth: 3,
        shade: 'url(#dropshadow)'
      },
      outerCicle: {
        circleR: 357,
        color: 'url(#gradient)',
        startColor: '#333E4D', // 渐变
        endColor: '#202C3A', // 渐变
        strokeColor: 'rgba(62,68,84,0.20)', // 描边
        strokeWidth: 3,
        shade: 'url(#dropshadow)'
      },
      // 刻度线
      scaleLine: {
        defaultColor: 'rgba(254, 254, 254, 0.3)',
        activeColor: '#26B9FA',
        animaTime: 60
      }
    }
  },
  colorful: {
    shutdown: {
      // 关机
      // 中心圆
      centerCicle: {
        circleX: 428,
        circleY: 428,
        circleR: 338,
        color: '#B4C3D0'
      },
      // 刻度线
      scaleLine: {
        defaultColor: '#667994',
        activeColor: '#667994',
        animaTime: 60
      },
      indicator: {
        radius: 14,
        distance: 150
      },
      // 指针
      indicatorStyle: {
        color: '#FEFEFE'
      }
    },
    initiate: {
      // 工作中
      // 中心圆
      centerCicle: {
        circleX: 428,
        circleY: 428,
        circleR: 338,
        color: 'url(#gradient)',
        startColor: '#527DF4',
        endColor: '#044DFF'
      },
      // 刻度线
      scaleLine: {
        defaultColor: '#667994',
        activeColor: '#FFD102',
        animaTime: 60
      },
      indicator: {
        radius: 14,
        distance: 150
      },
      // 指针
      indicatorStyle: {
        color: '#FFD102'
      }
    }
  },
  morandi: {
    shutdown: {
      // 关机
      // 中心圆
      centerCicle: {
        circleX: 428,
        circleY: 428,
        circleR: 338,
        color: '#FDFBFC'
      },
      // 刻度线
      scaleLine: {
        defaultColor: 'rgba(253, 251, 252, 0.3)',
        activeColor: '#FDFBFC',
        animaTime: 60,
        length: 34
      },
      indicator: {
        radius: 14,
        distance: 150
      },
      // 指针
      indicatorStyle: {
        color: '#4E5869'
      }
    },
    initiate: {
      // 工作中
      // 中心圆
      centerCicle: {
        circleX: 428,
        circleY: 428,
        circleR: 338,
        color: '#FDFBFC'
      },
      // 刻度线
      scaleLine: {
        defaultColor: 'rgba(253, 251, 252, 0.3)',
        activeColor: '#FDFBFC',
        animaTime: 60,
        length: 34
      },
      indicator: {
        radius: 14,
        distance: 150
      },
      // 指针
      indicatorStyle: {
        color: '#4E5869'
      }
    }
  }
};

export { SkinProps };
