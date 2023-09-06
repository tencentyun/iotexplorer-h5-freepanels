import React, { useEffect, useRef, useState } from 'react';
import { Icon } from '@custom/Icon';
import { Cell } from '@custom/Cell';
import { Modal } from '@custom/Modal';
import { Btn as Button, BtnGroup } from '@custom/Btn';
import { Dropdown } from '@custom/DropDown';
import { DropdownRef } from 'antd-mobile/es/components/dropdown';
import { Battery } from '@custom/Battery';
import { ElectricStatisticsPanel } from '@src/panels/WirelessSwitchOneV4/Common/Source';
import { Loading } from '@custom/Loading';
import { Toast } from 'antd-mobile';
import { useSwitchNameMap } from '@src/panels/SwitchV3/hooks/useSwitchNameMap';
import { iconSwitchGreen, iconSwitchRed } from '../Icon';

export const SWITCH_NAME_MAP = 'SWITCH_NAME_MAP';

export const Detail = ({
  deviceData,
  doControlDeviceData,
  updateDeviceData,
  switchNum,
  history: { PATH, push },
  sdk,
}) => {
  const [switchNameEditModalVisible, setSwitchNameEditModalVisible] = useState(false);

  const { data: switchNameMap = {}, isLoading, mutate: mutateSwitchNameMap } = useSwitchNameMap({ switchNum, sdk });

  const inputSwitchNameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log('switchNameMap=', switchNameMap, switchNum);
  }, [switchNameMap, switchNum]);

  const [selectSwitchProperty, setSelectSwitchProperty] = useState('switch_1');
  const dropdownRefName = useRef<DropdownRef>(null);

  const saveSwitchName = async () => {
    setSwitchNameEditModalVisible(false);
    const nameVal = inputSwitchNameRef.current?.value || '';
    // @ts-ignore
    inputSwitchNameRef.current?.value = '';
    if (nameVal.length >= 10 || nameVal.length === 0) {
      Toast.show({ content: '名字不合法', icon: 'fail' });
      return;
    }
    Toast.show({ content: '保存中...', icon: 'loading' });
    await sdk.requestTokenApi('AppSetDeviceConfig', {
      DeviceId: sdk.deviceId,
      DeviceKey: SWITCH_NAME_MAP,
      DeviceValue: JSON.stringify({
        ...switchNameMap,
        [selectSwitchProperty]: nameVal,
      }),
    });
    await mutateSwitchNameMap();
    Toast.show({ content: '保存成功', icon: 'success' });
  };

  // Todo 电量统计mock数据（后续去掉）
  useEffect(() => {
    updateDeviceData({
      cur_ele: 20,
      cur_current: 5,
      cur_voltage: 220,
      cur_power: 0.7,
    });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={`detail action action-${switchNum}`}>
      {/* 左上角编辑icon */}
      <div className='operator'>
        <div className='operator-btn editor' onClick={() => setSwitchNameEditModalVisible(true)}>
          <Icon className='operator-icon' name='editor' size='large' />
        </div>
        <div className='operator-btn setting'></div>
      </div>

      {/* 全开/全关区域 */}
      {switchNum > 1 && (
        <div className='switch-cell'>
          <div className='switch-cell-item' onClick={() => {
            const deviceData = {};
            Object.keys(switchNameMap).forEach(key => deviceData[key] = 1);
            doControlDeviceData(deviceData);
          }}>
            <img className='icon' src={iconSwitchGreen} alt='' />
            <div className='text'>全开</div>
          </div>

          <div className='switch-cell-item' onClick={() => {
            const deviceData = {};
            Object.keys(switchNameMap).forEach(key => deviceData[key] = 0);
            doControlDeviceData(deviceData);
          }}>
            <img className='icon' src={iconSwitchRed} alt='' />
            <div className='text'>全关</div>
          </div>
        </div>
      )}

      {/* 电量统计 */}
      <div
        className='electric-statistics-panel-wrap'
        onClick={() => push('/source')}
      >
        <Cell
          isLink={false}
          showArrow={true}
          prefixIcon={
            <Battery
              value={deviceData?.battery || 0}
              isShowPercent={false}
              isShowTip={false}
              color='brown'
            />
          }
          title={'电量统计'}
          className='electric-statistics-panel-header'
        ></Cell>
        <ElectricStatisticsPanel deviceData={deviceData} />
      </div>

      <div className='environment'>
        <Cell
          prefixIcon={<Icon name='mode'></Icon>}
          title={'智能场景'}
          onClick={() => {
            sdk.goScenePage({ type: 'default' });
          }}
          className='mode-btn'
        />
        <Cell
          prefixIcon={<Icon name='mode'></Icon>}
          title={'功能设置'}
          onClick={() => {
            push(PATH.MORE_SETTING, { switchNum: 8 });
          }}
          className='mode-btn'
        />
      </div>

      {/* 修改开关名称弹窗 */}
      <div className='custom-modal'>
        <Modal
          visible={switchNameEditModalVisible}
          className='edit-name-modal'
          title={(
            <div className='cus-module-title'>
              <span>修改开关名称</span>
              <div className='selector'>
                <Dropdown className='custom-dropdown' ref={dropdownRefName}>
                  <Dropdown.Item
                    className='dropdown-items'
                    key='selector'
                    title={switchNameMap[selectSwitchProperty]}
                  >
                    {Object.values(switchNameMap).map((name, index) => (
                      <div className='item' key={name} onClick={() => {
                        setSelectSwitchProperty(`switch_${index + 1}`);
                        dropdownRefName.current?.close();
                      }}>
                        <div className='dw-check-item'>
                          <span>{name}</span>
                          {selectSwitchProperty.includes(`${index + 1}`) && (
                            <span><Icon className='operator-icon' name='drop-checked' size='small' /></span>
                          )}
                        </div>
                      </div>
                    ))}
                  </Dropdown.Item>
                </Dropdown>
              </div>
            </div>
          )}
        >

          <input
            ref={inputSwitchNameRef}
            autoFocus
            className='edit-name-modal-input'
            placeholder='请输入开关名称'
            maxLength={10}
          />
          <div className='modal-footer'>
            <BtnGroup
              layout='flex'
            >
              <Button
                className='btn-cancel'
                onClick={() => {
                  setSwitchNameEditModalVisible(false);
                }}
              >
                取消
              </Button>
              <Button
                className='btn-save'
                onClick={saveSwitchName}
              >
                确定
              </Button>

            </BtnGroup>
          </div>
        </Modal>
      </div>
    </div>
  );
};
