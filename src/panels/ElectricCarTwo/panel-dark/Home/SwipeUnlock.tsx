import * as React from 'react';

interface UnlockProps {
  width: number;
  height: number;
  bgColor: string;
  borderRadius: number;
  tips: string;
  barBackground: string;
  movedColor: string;
  successTips: string;
  success?: () => void;
  resetClick?: () => void;
}

interface UnlockState {
  isMouseEnter: boolean;
  diff: number;
}

export default class SwipeUnlock extends React.Component<
  UnlockProps,
  UnlockState
> {
  /**
   * 默认参数
   */
  static defaultProps = {
    width: 965,
    height: 160,
    bgColor: 'rgba(255,255,255,0.20)',
    borderRadius: 80,
    tips: '滑动开锁',
    barBackground: 'url()',
    movedColor: 'transform',
    successTips: '已开锁',
  };
  public px2vw(px: number) {
    return px;
    const viewportWidth = 1125;
    const vw = px * (100 / viewportWidth);

    if (px === 0) {
      return px;
    }
    return `${vw.toFixed(3 || 3)}vw`;
  }

  /**
   * 初始数据
   */
  /** x */
  private x1 = 0;
  private x2 = 0;
  /** 鼠标是否按下 */
  private isMousedown = false;
  /** 是否已经成功 */
  private isSuccess = false;
  /** 最大滑动距离 */
  private max = (this.props.width - 308 * 2);
  /** 盒子样式 */
  private style = {
    width: this.px2vw(this.props.width),
    height: this.px2vw(this.props.height),
    backgroundColor: this.props.bgColor,
    borderRadius: this.px2vw(this.props.borderRadius),
  };
  /** 滑条盒子样式 */
  private slideBoxStyle = {
    borderRadius: this.px2vw(this.props.borderRadius),
  };

  constructor(props: UnlockProps) {
    super(props);
    this.state = {
      /** 是否滑入 */
      isMouseEnter: false,
      /** 滑动距离 */
      diff: 0,
    };
  }

  /**
   * 绑定事件
   */
  public componentDidMount() {
    document.body.addEventListener('mousemove', this.mousemove.bind(this));
    document.body.addEventListener('touchmove', this.mousemove.bind(this));
    document.body.addEventListener('mouseup', this.mouseup.bind(this));
    document.body.addEventListener('touchend', this.mouseup.bind(this));
  }

  /**
   * 移除事件
   */
  public componentWillUnmount() {
    document.body.removeEventListener('mousemove', this.mousemove.bind(this));
    document.body.removeEventListener('touchmove', this.mousemove.bind(this));
    document.body.removeEventListener('mouseup', this.mouseup.bind(this));
    document.body.removeEventListener('touchend', this.mouseup.bind(this));
  }

  /**
   * 鼠标移入
   */
  private mouseenter() {
    if (this.isSuccess) {
      return;
    }
    this.setState({
      isMouseEnter: true,
    });
  }

  /**
   * 鼠标离开
   */
  private mouseleave() {
    if (this.isSuccess || this.isMousedown) {
      return;
    }
    this.setState({
      isMouseEnter: false,
    });
  }

  /**
   * 鼠标按下
   */
  private mousedown(e: any) {
    if (this.isSuccess) {
      return;
    }
    this.x1 = e.nativeEvent.x || e.touches[0].clientX;
    this.isMousedown = true;
  }

  /**
   * 鼠标移动
   */
  private mousemove(e: any) {
    if (!this.isMousedown || this.isSuccess) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    this.x2 = e.x || e.touches[0].clientX;
    let diff = this.x2 - this.x1;
    if (diff < 0) {
      diff = 0;
    }
    // console.log(diff);
    // console.log(this.max);
    if (diff >= this.max) {
      diff = this.max;
      this.isSuccess = true;
      this.props.success && this.props.success();
    }
    this.setState({
      diff,
    });
  }

  /**
   * 鼠标松开
   */
  private mouseup() {
    if (this.isSuccess) {
      return;
    }
    this.isMousedown = false;
    this.setState({
      isMouseEnter: false,
      diff: 0,
    });
  }

  /**
   * 重置
   */
  public reset = () => {
    if (!this.isSuccess) return;
    this.isSuccess = false;
    this.setState({
      diff: 0,
    });
    setTimeout(() => {
      this.isMousedown = false;
      this.setState({
        isMouseEnter: false,
      });
      this.props.resetClick && this.props.resetClick();
    }, 0);
  };

  public render() {
    /** 滑条样式 */
    const slideStyle = {
      borderRadius: this.px2vw(this.props.borderRadius),
      background: this.props.movedColor,
      left: this.px2vw(308 - this.props.width),
      opacity: this.state.isMouseEnter ? 1 : 0,
      transitionDuration:
        !this.state.isMouseEnter || !this.isMousedown ? '.3s' : '0s',
      transform: `translateX(${this.state.diff}px)`,
    };
    /** 滑块样式 */
    const barStyle = {
      transitionDuration:
        !this.state.isMouseEnter || !this.isMousedown ? '.3s' : '0s',
      transform: `translateX(${this.state.diff}px)`,
    };
    /** 成功文本样式 */
    const textStyle = {
      opacity: this.isSuccess ? 1 : 0,
      transitionDuration:
        !this.state.isMouseEnter || !this.isMousedown ? '.3s' : '0s',
    };
    return (
      <div style={this.style} className="swipe-unlock">
        <div
          style={this.slideBoxStyle}
          className="unlock-box"
          onClick={this.reset}
        >
          {this.isSuccess ? (
            <div style={textStyle} className="unlock-success-tips">
              <div className="icon"></div>
              {this.props.successTips}
            </div>
          ) : (
            <>
              <div className="unlock-tips">
                <div className="tips">{this.props.tips}</div>
                <div className="slide-guide"></div>
              </div>
              <div style={slideStyle} className="unlock-slide"></div>
              <div
                className="unlock-bar"
                onMouseEnter={this.mouseenter.bind(this)}
                onTouchStart={this.mouseenter.bind(this)}
                onMouseLeave={this.mouseleave.bind(this)}
                onTouchEnd={this.mouseleave.bind(this)}
                onMouseDown={this.mousedown.bind(this)}
                onTouchMove={this.mousedown.bind(this)}
              >
                <div style={barStyle} className="slider">
                  <div className="icon"></div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}
