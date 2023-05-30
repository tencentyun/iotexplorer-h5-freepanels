// import '@src/panels/SpotlightsV4/panel-qualityWhite/app.tsx';
import render from '@custom/Render';
import App from '@src/panels/SpotlightsV4/panel-qualityWhite/Common';
import '@theme/panel-qualityWhite';
import '@src/panels/SpotlightsV4/panel-qualityWhite/app.less';

render(App, { isModuleTimer: true, isModal: true, isPopUp: false ,productType:'downlight'});
