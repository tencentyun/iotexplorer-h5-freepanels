import React from 'react';
import './curtain_more.less';
import classNames from 'classnames';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { SvgIcon } from '@components/common/icon';
import {Cell, Switch} from '@components/base';
import { useHistory } from 'react-router-dom';
import {getThemeType} from '@libs/theme';
import {toggleBooleanByNumber} from '@libs/utillib';
import {apiControlDeviceData} from '@hooks/useDeviceData';

export function CurtainMore () {

  const history = useHistory();

  // 默认云端定时
  const onCurtainTimer=()=>{
    history.push('/timer')
  }
  const themeType = getThemeType();

  return (
        <article id={'curtain_more'} className={classNames('curtain_more')}>
            <div className="product-setting">
                <Cell
                className="_color_white_"
                title="云端定时"
                onClick={onCurtainTimer}
                //   isLink={false}
                //   value= "布防中"
                valueStyle="gray"
                prefixIcon={<SvgIcon name={'icon-curtains-cloud-timing-'+themeType} width={60} height={60}/>}
                size="medium"
                />

                <Cell
                className="_color_white_  "
                title="自启动开关"
                isLink={false}
                value= {
                    <Switch
                        name={''}
                        theme={themeType}
                        checked={toggleBooleanByNumber(
                          sdk.deviceData.auto_power ? sdk.deviceData.auto_power : 0
                        )}
                        onChange={(value: boolean) => {
                          apiControlDeviceData({ auto_power: value ? 1 : 0 });
                        }}
                    />
                }
                valueStyle="gray"
                prefixIcon={
                  (themeType == 'dark')?
                  (
                    {/*<img src={require('../../views/home/img_icon/curtains-self-start-switch-dark.png')} />*/}
                    // <SvgIcon name={'icon-curtains-self-start-switch-'+themeType} width={60} height={60}/>
                    ):
                    (<SvgIcon name={'icon-curtains-self-start-switch-'+themeType} width={60} height={60}/>
                  )
                }
                size="medium"
                />
            </div>
        </article>
  );
};

export default CurtainMore;


