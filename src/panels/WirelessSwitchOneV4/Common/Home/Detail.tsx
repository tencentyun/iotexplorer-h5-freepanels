import React, { useEffect } from 'react';
import classNames from 'classnames';
import { SceneSetting } from '@custom/Scene';
import { Icon } from '@custom/Icon';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { noop } from '@utillib';

export const Detail = (props) => {
  const {
    deviceData = {},
    doControlDeviceData = noop,
    templateMap = {},
    history: { PATH, push },
    index = 1,
    switchNum = 1,
  } = { ...props };
  useEffect(() => {
    props.deviceData.switch_names = Object.values(templateMap.switch_type_1?.define?.mapping || {}) || ['单击', '双击', '长按'];
  }, []);

  return (
    <div className={'wireless-switch-detail'}>
      {/* <div className={classNames('wireless-top', switchNum > 1 ? 'margin-30' : '')}>*/}
      {/*  <div className='switch-area'>*/}
      {/*    <div className='switch-bg'*/}
      {/*         onClick={() => doControlDeviceData(`switch_${index}`, !deviceData?.[`switch_${index}`])}>*/}
      {/*      <div className='switch-bg-1'>*/}
      {/*        <div className={classNames('switch-status', !!deviceData?.[`switch_${index}`] ? 'on' : '')}></div>*/}
      {/*        <Icon name='light'></Icon>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  <div className='operation-list'>*/}
      {/*    <div className='operation-1'></div>*/}
      {/*    /!* <div className="operation-2" onClick={() => push('/source')}>*/}
      {/*       <Battery*/}
      {/*        value={deviceData?.battery || 0}*/}
      {/*        isShowPercent={true}*/}
      {/*        isShowTip={false}*/}
      {/*        color='brown'*/}
      {/*      />*/}
      {/*    </div> *!/*/}
      {/*  </div>*/}
      {/* </div>*/}
      <div className='wireless-bottom'>
        <p className='desc'>您可以将开关绑定具体的场景，一键执行设备控制</p>
        <SceneSetting
          {...props}
          sdk={sdk}
          isPush={true}
          currentIndex={index}
          isBackHome={true}
          deviceConfigData={deviceData}
          doDeviceConfigData={doControlDeviceData}
          sceneBtnModeProperty={`switch_type_${index}`}
        />
      </div>
    </div>
  );
};
