import render from '@custom/Render';
import App from './Common';
import '@theme/panel-qualityWhite';
import './app.less';

render(App, {
  isModuleTimer: true,
  isModal: true,
  isPopUp: false,
  sceneLength: 4,
  sceneBtnModeProperty: 'mode_swtch_4',
  sceneBtnModeDesc: ['场景按键1', '场景按键2', '场景按键3', '场景按键4dev'],
});
