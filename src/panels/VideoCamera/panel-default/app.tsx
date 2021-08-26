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
function App() {
  const [{ offline, powerOff, deviceInfo }] = useDeviceInfo();

  return (
    <HashRouter>
      <Switch>
        <Route
          path="/list"
          render={() => (
            <CameraPanel></CameraPanel>
          )}
        ></Route>
        <Route
          path="/detail"
          render={(item) => (
            <EventDetail item={item} deviceInfo={deviceInfo}></EventDetail>
          )}
        ></Route>
        <Redirect from="/" to="/list"></Redirect>
      </Switch>
    </HashRouter>
  );
}

entryWrap(App);
