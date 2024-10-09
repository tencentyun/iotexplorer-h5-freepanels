import render from '@custom/Render';
import App from '@src/panels/WirelessSwitchOneV4/Common/Common';
import '@theme/panel-qualityWhite';
import '@src/panels/WirelessSwitchOneV4/panel-qualityWhite/app.less';
import { t } from '@locales';
render(App, { switchNum: 3, sceneBtnModeDesc: [t('单击时'), t('双击时'), t('长按时')] });
