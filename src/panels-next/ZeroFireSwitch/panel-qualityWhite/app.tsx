import React from 'react';
import './app.less';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Home } from './Home/Home';
import { panelEntry } from '@src/panels-next/PanelWrap';
import { MoreSetting } from './MoreSetting/MoreSetting';
import { BrightnessSetting } from './BrightnessSetting';

function App() {
  return (
    <div className='panel-zeroFileSwitch qualityWhite'>
      <HashRouter>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/more-setting'>
            <MoreSetting />
          </Route>
          <Route exact path='/brightness-setting'>
            <BrightnessSetting />
          </Route>
        </Switch>
      </HashRouter>
    </div>
  );
}

panelEntry(App);
