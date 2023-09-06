import React from 'react';
import ReactDOM from 'react-dom';
import '@custom/Theme';

const render = (App, props = {}) => {
  ReactDOM.render(<App {...props}/>, document.getElementById('app'));
};

export default render;
