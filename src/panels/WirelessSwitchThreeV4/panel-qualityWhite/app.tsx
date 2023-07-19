import render from '@custom/Render';
import App from '@src/panels/WirelessSwitchOneV4/Common/Common';
import '@theme/panel-qualityWhite';
import '@src/panels/WirelessSwitchOneV4/panel-qualityWhite/app.less';
render(App, {switchNum: 3,groupNames:["单击时","双击时","长按时"]});
