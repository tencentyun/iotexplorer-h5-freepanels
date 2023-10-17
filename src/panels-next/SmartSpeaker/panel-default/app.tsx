import React from 'react';
import { panelEntry } from '@src/panels-next/PanelWrap';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { SleepMode } from './SleepMode/SleepMode';
import { Home } from './Home/Home';
import { MoreSetting } from './MoreSetting/MoreSetting';
import { VoiceControl } from './VoiceControl/VoiceControl';
import './app.less';
import { VoiceCommandList } from './VoiceControl/VoiceCommandList/VoiceCommandList';

function App() {
  return (
    <div className='panel-smart-speaker page-smart-speaker__default'>
      <HashRouter>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/more-setting'>
            <MoreSetting />
          </Route>
          <Route exact path='/sleep-mode'>
            <SleepMode />
          </Route>
          <Route exact path='/voice-control'>
            <VoiceControl />
          </Route>
          <Route exact path='/voice-control/command-list'>
            <VoiceCommandList />
          </Route>
          <Route path='*'>
            404 Not Found
          </Route>
        </Switch>
      </HashRouter>
    </div>
  );
}

panelEntry(App);
