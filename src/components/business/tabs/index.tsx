/*
 * @Author: wrq
 * @Date: 2021-09-26 21:28:43
 * @Description: tab导航
 */
import React from 'react';
import classNames from 'classnames';
import { TabPane, TabPaneProps } from './tab-pane';
import { StyledProps } from '@libs/global';
import { Block } from '../../layout';
import './style.less';

export interface TabsProps extends StyledProps {
  children?: React.ReactNode[] | React.ReactNode;
  // 当前激活的tab
  activeKey?: number | string;
  activeColor?: string;
  inActiveColor?: string;
  // top，bottom
  position?: string;
  onChange?: any;
}

export function Tabs(props: TabsProps) {
  const { children } = props;

  const handleChange = (key: any) => {
    props.onChange && props.onChange(key);
  };

  if (!children) {
    return null;
  }

  const tabs: React.ReactNode[] = Array.isArray(children)
    ? children
    : [children];
  const activeKey = props.activeKey || children[0].key;

  const tabItem = () => tabs.map((tab: any) => {
    const isActive = tab.key === activeKey;
    const { title, icon }: TabPaneProps = tab.props;
    const iconNode = icon ? <span className="tabs-icon">{icon}</span> : null;

    return (
        <div
          className={classNames('tabs-item', {
            is_active: isActive,
          })}
          key={tab.key}
          onClick={() => handleChange(tab.key)}
        >
          {iconNode}
          <span className="tabs-title">{title}</span>
        </div>
    );
  });

  const pane = tabs.filter((t: any) => t.key === activeKey);

  return (
    <div className={classNames('component_business_tabs', props.className)}>
      {props.position === 'top'
        && <Block className="tabs" padding={'70px 66px'}>
          {tabItem()}
        </Block>
      }

      <div className="tabs-content">{pane[0]}</div>

      {props.position === 'bottom'
        && <Block className="tabs bottom-tabs" padding={'70px 66px'}>
          {tabItem()}
        </Block>
      }
    </div>
  );
}

Tabs.TabPane = TabPane;
