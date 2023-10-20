import React, { useRef, useState } from 'react';
import './Home.less';
import {
  iconArrowRight,
  iconDropdownArrow,
  iconEdit,
  iconLight,
  iconPowerSwitchClose,
  iconPowerSwitchOpen,
  iconSettingScene,
  iconThreeDot,
} from '@src/panels-next/ZeroFireSwitch/panel-qualityWhite/assets';
import classnames from 'classnames';
import { useHistory } from 'react-router-dom';
import { h5PanelSdk } from '@src/panels-next/h5PanelSdk';
import { SWITCH_NAME_MAP, useSwitchNameMap, useSwitchNum } from '@src/panels-next/ZeroFireSwitch/hooks';
import { useDeviceStore } from '@src/panels-next/PanelWrap';
import { noop } from '@utillib';
import { px2vw } from '@libs/utils';
import { Input, Modal, Toast } from 'antd-mobile';

function SwitchRectangleBtn({
  name,
  powerSwitch,
  onClick = noop,
}) {
  return (
    <div className='comp-switch-btn' onClick={onClick}>
      <div className='switch-btn-container card'>
        <img className='icon-light' src={iconLight} />
        <div
          className={classnames('switch-status-dot', {
            open: !!powerSwitch,
          })}
        />
        <div className='switch-name'>{name}</div>
      </div>
    </div>
  );
}

function EditSwitchNameModal({
  visible,
  onClose,
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const {
    data: switchNameMap = {},
    mutate: mutateSwitchNameMap,
  } = useSwitchNameMap();
  const [curSwitchKey, setCurSwitchKey] = useState('switch_1');
  const inputSwitchNameRef = useRef<any>(null);
  const switchNum = useSwitchNum();

  const onCloseModal = () => {
    onClose();
    setShowDropdown(false);
  };

  const saveSwitchName = async () => {
    setShowDropdown(false);
    onCloseModal();
    const nameVal = inputSwitchNameRef.current.nativeElement.value || '';
    if (!nameVal) return;
    inputSwitchNameRef.current.value = '';
    if (nameVal.length > 10) {
      Toast.show({ content: '开关名称最长10个字', icon: 'fail' });
      return;
    }
    Toast.show({ content: '保存中...', icon: 'loading' });
    await h5PanelSdk.requestTokenApi('AppSetDeviceConfig', {
      DeviceId: h5PanelSdk.deviceId,
      DeviceKey: SWITCH_NAME_MAP,
      DeviceValue: JSON.stringify({
        ...switchNameMap,
        [curSwitchKey]: nameVal,
      }),
    });
    await mutateSwitchNameMap();
    Toast.show({ content: '保存成功', icon: 'success' });
  };

  return (
    <Modal
      visible={visible}
      className={'modal-editSwitchName'}
      closeOnMaskClick={true}
      destroyOnClose={true}
      // @ts-ignore
      style={{ '--min-width': px2vw(343) }}
      title={(
        <div className='modal-editSwitchName__title'>
          <div className='modal-title'>修改开关名称</div>
          <div className='dropdown'>
            <div
              className='dropdown-title'
              onClick={() => {
                if (switchNum <= 1) return;
                setShowDropdown(!showDropdown);
              }}
            >
              <span>{switchNameMap[curSwitchKey]}</span>
              {switchNum > 1 && <img src={iconDropdownArrow} alt='' />}
            </div>
            <div className='dropdown-list' style={{ visibility: showDropdown ? 'visible' : 'hidden' }}>
              {Object.entries(switchNameMap)
                .map(([switchKey, switchName]) => (
                  <div
                    key={switchKey}
                    className='dropdown-list-item'
                    onClick={() => {
                      setCurSwitchKey(switchKey);
                      setShowDropdown(false);
                    }}
                  >
                    {switchName}
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
      actions={[
        {
          key: '1',
          primary: true,
          text: '确定',
          style: {
            // @ts-ignore
            '--color': '#30414D',
            fontSize: 'var(--adm-font-size-8)',
          },
          onClick: saveSwitchName,
        },
      ]}
      content={(
        <div
          className='modal-editSwitchName__content'
          style={{ height: px2vw(120) }}
          onClick={() => setShowDropdown(false)}
        >
          <Input ref={inputSwitchNameRef} placeholder='请输入开关名称' maxLength={10} />
        </div>
      )}
      onClose={onCloseModal}
    />
  );
}

export function Home() {
  const history = useHistory();
  const { deviceData, controlDeviceData } = useDeviceStore();

  const switchNum = useSwitchNum();
  const { switchNameMap } = useSwitchNameMap();

  const [showEditSwitchModal, setShowEditSwitchModal] = useState(false);

  const openAllSwitch = () => {
    const deviceData = {};
    Object.keys(switchNameMap)
      .forEach(key => deviceData[key] = 1);
    controlDeviceData(deviceData);
  };

  const closeAllSwitch = () => {
    const deviceData = {};
    Object.keys(switchNameMap)
      .forEach(key => deviceData[key] = 0);
    controlDeviceData(deviceData);
  };

  return (
    <div className='page-home'>
      <EditSwitchNameModal
        visible={showEditSwitchModal}
        onClose={() => setShowEditSwitchModal(false)}
      />
      {/* 最上面编辑/设置 */}
      <div className='view-header-setting'>
        <img className='icon-edit' src={iconEdit} onClick={() => setShowEditSwitchModal(true)} />
        <img
          className='icon-threeDot'
          src={iconThreeDot}
          onClick={() => h5PanelSdk.goDeviceDetailPage()}
        />
      </div>

      {/* 多个大开关按钮 */}
      <div className={classnames('view-big-btn', `switch-num-${switchNum}`)}>
        {Object.entries(switchNameMap)
          .map(([switchKey, switchName]) => (
            <SwitchRectangleBtn
              key={switchKey}
              name={switchName}
              powerSwitch={deviceData[switchKey]}
              onClick={() => {
                controlDeviceData({
                  [switchKey]: !deviceData[switchKey] ? 1 : 0,
                });
              }}
            />
          ))}
      </div>

      {/* 全开全关 */}
      {switchNum > 1 && (
        <div className='view-all-control'>
          <div className='switch-btn card' onClick={openAllSwitch}>
            <img className='icon-powerSwitch' src={iconPowerSwitchOpen} alt='' />
            <div className='switch-control-name'>全开</div>
          </div>
          <div className='switch-btn card' onClick={closeAllSwitch}>
            <img className='icon-powerSwitch' src={iconPowerSwitchClose} alt='' />
            <div className='switch-control-name'>全关</div>
          </div>
        </div>
      )}

      {/* 一些设置入口 */}
      <div
        className='view-setting card'
        onClick={() => {
          window.h5PanelSdk.goScenePage({ type: 'default' });
        }}
      >
        <img className='setting-icon' src={iconSettingScene} alt='' />
        <div className='setting-title'>智能场景</div>
        <img className='icon-arrowRight' src={iconArrowRight} alt='' />
      </div>

      <div
        className='view-setting card'
        onClick={() => {
          history.push('/more-setting');
        }}
      >
        <img className='icon-setting-scene' src={iconSettingScene} alt='' />
        <div className='setting-title'>功能设置</div>
        <img className='icon-arrowRight' src={iconArrowRight} alt='' />
      </div>
    </div>
  );
}
