import React, {useState} from 'react';
import './dark_foot.less';
import classNames from 'classnames';
import {SvgIcon} from '@components/common/icon';
import Options_Work from '../../home-normal/work_model/work_model';
import Options_Motor from '../../home-normal/motor/motor';
import {useHistory} from 'react-router-dom';

export function Dark_foot() {
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
  return (
    <article id={'dark_foot'} className={classNames('dark_foot')}>
      <div className="dark_foot_card">

        {/* <div className="foot_card"> */}
        <div className="card_box"
             onClick={onCurtain}
        >
          <SvgIcon className="card_icon" name={'icon-curtains-motor-reverse-unlock-dark'} color="#FFFFF"/>
          <div className="card_font">
            电机反向
          </div>
        </div>
        {/* </div> */}

        {/* <div className="foot_card"> */}
        <div className="card_box"
             onClick={onWork}
        >
          <SvgIcon className="card_icon" name={'icon-curtains-morning-mode-unlock-dark'} color="#FFFFF"/>
          <div className="card_font">
            早安模式
          </div>
        </div>
        {/* </div> */}

        {/* <div className="foot_card"> */}
        <div className="card_box"
             onClick={onCurtainWork}
        >
          <div className="box_icon">
            <SvgIcon name={'icon-curtains-more-dark'} color="#FFFFF" width={98} height={32}/>
          </div>
          <div className="card_font1">
            更多
          </div>
        </div>
      </div>
      {/* </div> */}

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

export default Dark_foot;
