import React, { useEffect, useMemo } from 'react';
import {
  Route as ReactRouterRoute,
  Redirect,
  Switch,
  useHistory,
} from 'react-router-dom';
import { LocatorPanelTab, MapViewType } from './types';
import { LocatorTabPage } from './LocatorTabPage';
import { LocatorSubPage } from './LocatorSubPage';
import { MapTab } from './components/MapTab';
import { FenceTab } from './components/FenceTab';
import {
  DetailTab,
  DeviceLocationHistoryList,
  DeviceEventList,
  PositioningModeSelect,
} from './components/DetailTab';

function Route({
  title,
  ...props
}: {
  title?: string;
} & ReactRouterRoute) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);
  
  return <ReactRouterRoute {...props} />;
}

export function LocatorPanel() {
  const history = useHistory();
  const switchTab = (tab: LocatorPanelTab) => {
    history.replace(`/${tab}`);
  };

  const originalTitle = useMemo(() => document.title, []);

  return (
    <>
      {/* 地图组件常驻，只切换 display */}
      <ReactRouterRoute
        path="/map/:view(history|fence)?"
        children={({ match }) => {
          const useMapView = Boolean(match && match.params.view);
          const tabParams = useMapView ? {} : {
            switchTab,
            activeTab: LocatorPanelTab.Map,
          };
          return (
            <LocatorTabPage visible={!!match} {...tabParams}>
              <MapTab view={match ? match.params.view : MapViewType.DeviceCurrent} />
            </LocatorTabPage>
          );
        }}
      />

      <Switch>
        <Redirect exact from="/" to="/map" />

        {/* 用于设定页面标题 */}
        <Route path="/map" title={originalTitle} />

        <Route
          path="/fence"
          title={originalTitle}
          render={() => (
            <LocatorTabPage switchTab={switchTab} activeTab={LocatorPanelTab.Fence}>
              <FenceTab />
            </LocatorTabPage>
          )}
        />

        <Route
          path="/detail"
          title={originalTitle}
          render={() => (
            <LocatorTabPage switchTab={switchTab} activeTab={LocatorPanelTab.Detail}>
              <DetailTab />
            </LocatorTabPage>
          )}
          exact
        />

        <Route
          path="/detail/history-list"
          title="历史轨迹"
          render={() => (
            <LocatorSubPage>
              <DeviceLocationHistoryList />
            </LocatorSubPage>
          )}
        />

        <Route
          path="/detail/event-list"
          title="告警记录"
          render={() => (
            <LocatorSubPage>
              <DeviceEventList />
            </LocatorSubPage>
          )}
        />

        <Route
          path="/detail/positioning-mode"
          title="定位模式"
          render={() => (
            <LocatorSubPage>
              <PositioningModeSelect />
            </LocatorSubPage>
          )}
        />
      </Switch>
    </>
  );

  
}
