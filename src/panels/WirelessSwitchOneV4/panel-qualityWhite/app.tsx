import render from '@custom/Render';
import App from '../Common/Common';
import '@theme/panel-qualityWhite';
import './app.less';
import { t } from '@locales';
render(App, { switchNum: 1, sceneBtnModeDesc: [t('单击时'), t('双击时'), t('长按时')] });
