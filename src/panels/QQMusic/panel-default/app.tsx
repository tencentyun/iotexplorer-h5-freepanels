import 'antd-mobile/bundle/style.css';

import React from 'react';
import ReactDOM from 'react-dom';

import { QQMusic } from './QQMusic';

function App() {
  return (
    <QQMusic />
  )
}

ReactDOM.render(<App />, document.getElementById('app'));
