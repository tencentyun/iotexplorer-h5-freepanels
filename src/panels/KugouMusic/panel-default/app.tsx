import React from 'react';
import { entryWrap } from '@src/entryWrap';
import { HashRouter, Route } from 'react-router-dom';
import './style.less';
import { IndexPage } from './IndexPage/IndexPage';
import { KugouIndex } from './KugouPage/KugouIndex';

// 看怎么处理 / 会显示路由有问题
if (!window.location.hash) {
  window.location.hash = '/index';
}

function App() {
  return (
    <HashRouter>
      <div className="kugou-warp">
        <Route path={'/index'} component={IndexPage}/>
        <Route path={'/kugou'} component={KugouIndex}/>
      </div>
    </HashRouter>
  );
}

entryWrap(App);
