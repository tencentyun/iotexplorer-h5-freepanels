const themeType = 'normal';

const skinProps = {
  normal: {
    mileage: {
      color: '#000000'
    },
    more: {
      color: '#000000'
    }
  },
  blueWhite: {
    mileage: {
      color: '#FFFFFF'
    },
    more: {
      color: '#FFFFFF'
    }
  },
  dark: {
    mileage: {
      gradientId: 'mileage',
      startColor: '#00B4FF',
      endColor: '#5377F5'
    },
    more: {
      color: '#FFFFFF'
    }
  },
  colorful: {
    mileage: {
      color: '#5CB4DB'
    },
    more: {
      color: '#FFFFFF'
    },
    bluetooth: {
      color: '#FFC904'
    },
    alarm: {
      color: '#FFC904'
    },
    mute: {
      gradientId: 'mute',
      startColor: '#527DF4',
      endColor: '#044DFF'
    }
  },
  morandi: {
    mileage: {
      color: '#B6ACA3'
    },
    more: {
      color: '#FFFFFF'
    }
  }
};

export const CurrentSkinProps: any = skinProps[themeType];
