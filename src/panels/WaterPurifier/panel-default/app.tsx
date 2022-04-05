import ReactDOM from 'react-dom';
import { App } from '../panel-common/app';
import { withTheme } from '@libs/theme';

// eslint-disable-next-line react/react-in-jsx-scope
ReactDOM.render(withTheme(<App />, 'normal'), document.getElementById('app'));
