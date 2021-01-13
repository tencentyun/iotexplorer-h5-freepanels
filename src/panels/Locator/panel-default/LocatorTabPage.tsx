import React from 'react';
import classNames from 'classnames';
import { useIpx } from '@hooks/useIpx';
import { LocatorPanelFooter } from './LocatorPanelFooter';
import { LocatorPanelTab } from './types';

import './LocatorTabPage.less';

interface LocatorTabPageProps {
  children?: React.ReactNode | React.ReactNodeArray;
  activeTab?: LocatorPanelTab;
  switchTab?: (tab: LocatorPanelTab) => void;
  visible?: boolean;
}

export function LocatorTabPage({
  children,
  activeTab,
  switchTab,
  visible = true,
}: LocatorTabPageProps) {
  const ipx = useIpx();
  
  return switchTab ? (
    <div className={classNames('locator-tab-page clearfix', { ipx, hide: !visible })}>
      {children}
      <LocatorPanelFooter
        activeTab={activeTab as LocatorPanelTab}
        switchTab={switchTab as (tab: LocatorPanelTab) => void}
      />
    </div>
  ) : (
    <div className={classNames('locator-tab-page clearfix hide-footer', { ipx })}>
      {children}
    </div>
  );
}
