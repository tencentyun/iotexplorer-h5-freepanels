import React, {useState} from 'react';
import './side_foot.less';
import classNames from 'classnames';
import {SvgIcon} from '@components/common/icon';
import Options_Work from '../../home-normal/work_model/work_model';
import Options_Motor from '../../home-normal/motor/motor';
import {useHistory} from 'react-router-dom';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import {onControlDevice} from '@hooks/useDeviceData';


export function Side_Foot() {
  const history = useHistory();

  const onCurtainWork = () => {
    history.push('/curtain_more');
  }

  const [selectTheCurtain, theCurtain_options] = useState(false);
  const [selectTheWork, theCurtain_Work] = useState(false);

  const onCurtain = () => {
    theCurtain_options(true);
  }
  const onWork = () => {
    theCurtain_Work(true);
  }

  const [openRatio, onToggleOpenRatio] = useState(55);
  const openLeave = (openRatio) => {
    onToggleOpenRatio(openRatio);
    // let one_el_div = document.getElementsByClassName("dark_leave_div")[0];
    // let el_wrap = document.getElementById("dark_leave_wrap");
    // // console.log(one_el_div?.clientWidth);
    // // console.log(el_wrap?.clientWidth);
    // let x = el_wrap?.clientWidth/18.0*openRatio/100;
    // // console.log(x);
    // let divs=document.getElementsByClassName("dark_leave_div");
    // for(let i=0;i<divs.length;i++){

    //   divs[i].style.width = x + "px";
    // }

    if (openRatio === 0) {
      onControlDevice('control', 'open');
    } else {
      onControlDevice('control', 'close');
    }
  }
  const onSwitch = () => {
    onControlDevice('control', 'pause');
  }

  return (
    <article id={'sidefoot'} className={classNames('sidefoot')}>
      <div className="side_botton">
        <div className="side_span"
             onClick={onCurtain}
        >
          <div className="icon_reverse">
            <SvgIcon name={'icon-curtains-motor-reverse-blueWhite'} color="#FFFFF" width={67} height={71}/>
          </div>
          <div className="span_font reverse_font">
            电机反向
          </div>
        </div>

        <div className="side_span"
             onClick={onWork}
        >
          <div className="icon_morning">
            <SvgIcon className="icon_margtop" name={'icon-curtains-morning-mode-blueWhite'} color="#FFFFF" width={204}
                     height={225}/>
          </div>
          <div className="morning_font">
            早安模式
          </div>
        </div>

        <div className="side_span"
             onClick={onCurtainWork}
        >
          <div className="icon_curtains">
            <SvgIcon name={'icon-curtains-more-blueWhite'} color="#FFFFF" width={81.5} height={23}/>
          </div>
          <div className="curtains_font">
            更多
          </div>
        </div>
      </div>

      <div className="side_botton">
        <div className={classNames("side_span", sdk.deviceData.control === 'open' && "button_select")}
             onClick={() => openLeave(0)}>
          <SvgIcon
            name={sdk.deviceData.control === 'open' && 'icon-curtains-open-unlock-blueWhite' || 'icon-curtains-open-blueWhite'}
            color="#FFFFF" width={89} height={32}/>
          {/* <img className="span_open" src={require('../images/curtains-open-blueWhite.png')}></img> */}
          <div className={classNames("open_font", sdk.deviceData.control === 'open' && "font_select")}>
            开启
          </div>
        </div>

        <div className="side_span1" id='power' onClick={onSwitch}>
          <SvgIcon
            name={!sdk.deviceData.control || sdk.deviceData.control === 'pause' ? 'icon-curtains-total-unlock-blueWhite' : 'icon-curtains-total-paused-blueWhite'}
            color="#000000" width={350} height={350}/>
        </div>

        <div className={classNames("side_span", sdk.deviceData.control === 'close' && "button_select")}
             onClick={() => openLeave(100)}>
          <SvgIcon
            name={sdk.deviceData.control === 'close' && 'icon-curtains-close-unlock-blueWhite' || 'icon-curtains-close-blueWhite'}
            color="#FFFFF" width={89} height={32}/>
          <div className={classNames("close_font", sdk.deviceData.control === 'close' && "font_select")}>
            关闭
          </div>
        </div>

      </div>

      <Options_Motor
        isShow={selectTheCurtain}
        onClose={() => {
          theCurtain_options(false);
        }}
      />

      <Options_Work
        isShow={selectTheWork}
        onClose={() => {
          theCurtain_Work(false);
        }}
      />
    </article>
  );
};

export default Side_Foot;
