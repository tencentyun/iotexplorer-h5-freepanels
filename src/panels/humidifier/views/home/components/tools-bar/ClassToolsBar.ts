/**
 * @Description:
 * @Author: RuiXue
 * @Date: 2021-09-21 15:31:55
 * @LastEditors:
 * @LastEditTime:
 */
import { ToolsBarConfig } from '@/products/humidifier/views/home/components/tools-bar/ClassToolBar';
// @ts-ignore
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';

export default class ClassToolsBar {
  static TOOLS_BAR_CONFIG: Array<ToolsBarConfig> = [
    {
      isActive: true,
      name: 'work_mode',
      label: '超声波',
      icon: 'ultrasound',
      size: 84,
      path: '/',
      callback: () => {}
    },
    {
      isActive: false,
      name: 'gear',
      label: '风档',
      icon: 'gear',
      size: 78,
      path: '/',
      callback: () => {
        console.log('click');
        sdk
          .getDeviceStatus({
            deviceId: sdk.deviceId
          })
          .then((res: any) => {
            console.log('>>>>>', res);
          });
      }
    },
    {
      isActive: false,
      name: 'more',
      label: '更多',
      icon: 'more',
      size: 74,
      path: '/more',
      callback: () => {
        console.log('ok122221');
      }
    }
  ];
}
