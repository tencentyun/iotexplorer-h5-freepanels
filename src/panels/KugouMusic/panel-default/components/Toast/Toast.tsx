import React from 'react';
import ReactDOM from 'react-dom';
import './Toash.less';

const Toast = ({ content }) => (
  <div className="d-toast">{content}</div>
);

let timer = 0;

export default {
  open(content: string): void {
    if (timer) return;
    const div = document.createElement('div');
    document.body.appendChild(div);
    ReactDOM.render(<Toast content={content}/>, div);
    timer = window.setTimeout(() => {
      ReactDOM.unmountComponentAtNode(div);
      document.body.removeChild(div);
      timer = 0;
    }, 2000);
  },
};
