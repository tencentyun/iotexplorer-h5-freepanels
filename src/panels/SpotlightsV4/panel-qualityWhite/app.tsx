
import render from '@custom/Render';
import App from '@src/panels/LightsV4/panel-qualityWhite/Common';
import '@theme/panel-qualityWhite';
import '@src/panels/LightsV4/panel-qualityWhite/app.less';

// 筒灯 双色模式
render(App, { isModuleTimer: true, isModal: true, isPopUp: false , productType:'spotlight',productColorMode:'1'});

