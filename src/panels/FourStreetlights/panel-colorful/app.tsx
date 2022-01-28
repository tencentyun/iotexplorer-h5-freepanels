import ReactDOM from 'react-dom';
import { App } from '../panel-common/app';
import { withTheme } from '@libs/theme';

ReactDOM.render(withTheme(<App />, 'colorful'), document.getElementById('app'));
