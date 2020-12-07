import React from 'react';
import * as icons from './icons';
import { FooterBtnConfig, PageFooter } from "@components/PageFooter";
import { LocatorPanelTab } from './types';

interface LocatorPanelFooterProps {
  activeTab: LocatorPanelTab;
  switchTab: (tab: LocatorPanelTab) => void;
}

export function LocatorPanelFooter({
  activeTab,
  switchTab,
}: LocatorPanelFooterProps) {
  const getBtnConfig = (): FooterBtnConfig[] => {
    const configMap: {
      map: FooterBtnConfig;
      fence: FooterBtnConfig;
      detail: FooterBtnConfig;
    } = {
      map: {
        text: '地图',
        actived: activeTab === LocatorPanelTab.Map,
        icon: activeTab === LocatorPanelTab.Map ? icons.iconMapTabActive : icons.iconMapTab,
        onClick: () => {
          switchTab(LocatorPanelTab.Map);
        },
      },
      fence: {
        text: '围栏',
        actived: activeTab === LocatorPanelTab.Fence,
        icon: activeTab === LocatorPanelTab.Fence ? icons.iconFenceTabActive : icons.iconFenceTab,
        onClick: () => {
          switchTab(LocatorPanelTab.Fence);
        },
      },
      detail: {
        text: '更多',
        actived: activeTab === LocatorPanelTab.Detail,
        icon: activeTab === LocatorPanelTab.Detail ? icons.iconDetailTabActive : icons.iconDetailTab,
        onClick: () => {
          switchTab(LocatorPanelTab.Detail);
        },
      },
    };

    return [configMap.map, configMap.fence, configMap.detail];
  };
  
  return (
    <PageFooter
      footerConfig={getBtnConfig()}
    />
  );
}