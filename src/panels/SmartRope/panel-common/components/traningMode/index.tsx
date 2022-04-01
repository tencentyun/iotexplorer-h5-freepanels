/*
 * @Author: wrq
 * @Date: 2021-09-20 14:58:10
 * @Description: 首页训练模式
 */
import React from 'react';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import { StyledProps } from '@libs/global';
import { onControlDevice } from '@hooks/useDeviceData';
import { Block } from '@components/layout';
import { Hoverable } from '@components/common';
import { SvgIcon } from '@components/common/icon';
import { getThemeType } from '@libs/theme';
import { SkinProps } from '../../skinProps';
import './style.less';

interface ModeProps {
  id: string;
  name: string;
  title: string;
}

const trainingConfig: ModeProps[] = [
  {
    id: 'free_jump',
    name: 'free_jump',
    title: '自由跳',
  },
  {
    id: 'countdown_number',
    name: 'countdown_number',
    title: '计数跳',
  },
  {
    id: 'countdown_time',
    name: 'countdown_time',
    title: '计时跳',
  },
];

export interface TraningModeProps extends StyledProps {
  // 布局模式 grid 宫格 list 列表
  layoutMode?: 'grid' | 'list';
}

export function TrainingMode({ layoutMode = 'grid' }: TraningModeProps) {
  const history = useHistory();

  const onClickItem = function (meta: ModeProps) {
    onControlDevice('mode', meta.name);
    history.push({
      pathname: '/training',
      state: { mode: meta.name },
    });
  };

  const itemIcon = (name: string) => {
    const themeType = getThemeType();
    const CurrentSkinProps: any = SkinProps[themeType];
    switch (name) {
      case 'free_jump':
        return <SvgIcon className="item-icon" name="icon-training-free" {...CurrentSkinProps.free}/>;
      case 'countdown_number':
        return <SvgIcon className="item-icon" name="icon-training-count" {...CurrentSkinProps.count}/>;
      case 'countdown_time':
        return <SvgIcon className="item-icon" name="icon-training-time" {...CurrentSkinProps.time}/>;
      default:
        return null;
    }
  };

  const renderPropertyItem = (templateConfig: ModeProps) => (
      <Block
        className={classNames(
          'training-mode-item',
          `item_${templateConfig.name}`,
        )}
        onClick={() => onClickItem(templateConfig)}
      >
        <Hoverable>
          <div className="item-inner">
            {itemIcon(templateConfig.name)}
            <p className="item-test">{templateConfig.title}</p>
          </div>
        </Hoverable>
      </Block>
  );

  return (
    <div
      className={classNames(
        'training-mode',
        `training-mode_layout_${layoutMode}`,
      )}
    >
      {trainingConfig.map(item => (
        renderPropertyItem(item)
      ))}
    </div>
  );
}
