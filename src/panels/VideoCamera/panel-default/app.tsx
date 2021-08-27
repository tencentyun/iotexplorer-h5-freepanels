import React from "react";
import {
  HashRouter,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { useDeviceInfo } from "@hooks/useDeviceInfo";
import { CameraPanel } from "./CameraPanel";
import { entryWrap } from "@src/entryWrap";
import { EventDetail } from "./EventDetail";
import { StatusTip } from "@components/StatusTip";

function App() {
  const [{ deviceInfo, statusTip }] = useDeviceInfo();

  return statusTip ? <StatusTip {...statusTip} fillContainer/> : (
    <HashRouter>
      <Switch>
        <Route
          path="/list"
          render={() => (
            <CameraPanel/>
          )}
        />
        <Route
          path="/detail"
          render={(item) => (
            <EventDetail item={item} deviceInfo={deviceInfo}/>
          )}
        />
        <Redirect from="/" to="/list"/>
      </Switch>
    </HashRouter>
  );
}

entryWrap(App);
