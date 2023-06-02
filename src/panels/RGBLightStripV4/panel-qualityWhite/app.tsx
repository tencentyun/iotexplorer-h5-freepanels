import render from '@custom/Render';
import App from '@src/panels/LightsV4/panel-qualityWhite/Common';
import '@theme/panel-qualityWhite';
import '@src/panels/LightsV4/panel-qualityWhite/app.less';

render(App, { isModuleTimer: true, isModal: true, isPopUp: false,productType:'cw-light' });
