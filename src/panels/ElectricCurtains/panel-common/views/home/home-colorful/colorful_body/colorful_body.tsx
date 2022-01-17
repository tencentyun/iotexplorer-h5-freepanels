import React, {useState} from 'react';
import './colorful_body.less';
import classNames from 'classnames';
import Options_Work from '../../home-normal/work_model/work_model';
import Options_Motor from '../../home-normal/motor/motor';
import {SvgIcon} from '@components/common/icon';
import {useHistory} from 'react-router-dom';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import {onControlDevice} from '@hooks/useDeviceData';

export function Colorful_body() {
  const history = useHistory();

  const onCurtainWork = () => {
    history.push('/curtain_more')
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
    <article id={'colorful_body'} className={classNames('colorful_body')}>
      <div className="colorful_body_card">
        <div className="card">
          <div className="card_botton"
               onClick={onCurtain}
          >
            <SvgIcon name={'icon-curtains-motor-reverse-colorful'} color="#FFFFF" width={67} height={69}/>
            <div className="card_font">
              电机反向
            </div>
          </div>

          <div className="card_botton"
               onClick={onWork}
          >
            <SvgIcon name={'icon-curtains-morning-mode-colorful'} color="#FFFFF" width={68} height={75}/>
            <div className="card_font">
              早安模式
            </div>
          </div>

          <div className="card_botton"
               onClick={onCurtainWork}
          >
            <SvgIcon name={'icon-curtains-more-colorful'} color="#FFFFF" width={67} height={69}/>
            <div className="card_font">
              更多
            </div>
          </div>
        </div>

        <div className="card">
          {/* <div className="card_botton">
                        <SvgIcon className="botton_icon" name={'icon-curtains-open-colorful'} color="#FFFFF" width={240} height={200}/>
                        <div className="card_font1">
                            开启
                        </div>
                    </div> */}

          <div className={classNames("card_botton", sdk.deviceData.control === 'open' && "button_select1")}
               onClick={() => openLeave(0)}>
            <SvgIcon
              name={sdk.deviceData.control === 'open' && 'icon-curtains-open-unlock-colorful' || 'icon-curtains-open-colorful'}
              color="#FFFFF" width={86.6} height={28.5}/>
            <div className={classNames("card_font1", sdk.deviceData.control === 'open' && "font_select")}>
              开启
            </div>
          </div>


          <div className="card_botton1" id='power' onClick={onSwitch}>
            {
              !sdk.deviceData.control || sdk.deviceData.control === 'pause' ?
                (<SvgIcon name={'icon-curtains-total-unlock-colorful'} color="#FFFFF" width={180} height={180}/>) :
                (''/*<img className='open_img' src={require('../../img_icon/curtains-total-paused-colorful.png')}/>*/)
            }

            {/* <SvgIcon name={sdk.deviceData.control === 'pause'&&'icon-curtains-total-paused-colorful'||'icon-curtains-total-unlock-colorful'} color="#000000" width={180} height={180}/>    */}
          </div>

          {/* <div className="card_botton">
                        <SvgIcon className="botton_icon" name={'icon-curtains-close-colorful'} color="#FFFFF" width={240} height={200}/>
                        <div className="card_font2">
                            关闭
                        </div>
                    </div> */}
          <div className={classNames("card_botton", sdk.deviceData.control === 'close' && "button_select2")}
               onClick={() => openLeave(100)}>
            <SvgIcon
              name={sdk.deviceData.control === 'close' && 'icon-curtains-close-unlock-colorful' || 'icon-curtains-close-colorful'}
              color="#FFFFF" width={86.6} height={28.5}/>
            <div className={classNames("card_font2", sdk.deviceData.control === 'close' && "font_select")}>
              关闭
            </div>
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

export default Colorful_body;
