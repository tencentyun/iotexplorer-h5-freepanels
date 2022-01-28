/**
 * 通用路由跳转按钮
 */
import React from 'react';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import { SvgIcon } from '@components/common';
import { Row, Col } from '@components/layout';
import { StyledProps, ThemeType } from '@libs/global';
import './style.less';

const DEFAULT_COL_COUNT = 3;

export interface RouteListProps extends StyledProps {
  options: RouteItemProps[];
  // 布局方式
  layout: 'grid' | 'list';
  // grid 模式下每列展示的个数
  col?: number;
  theme?: ThemeType;
  // 是否为路由模式，路由模式需要传入path
  route?: boolean;
  onClick?: any;
}

export interface RouteItemProps {
  name: string;
  title: string;
  iconName: string;
  // 跳转路由的地址，没有则不跳转
  path?: string;
}

// 根据每列显示个数转换为二维数组
function formatOptions(options: RouteItemProps[], col: number): [][] {
  const arr: [][] = [];
  const len: number = options.length;
  // 行数
  const row: number = Math.floor(len / col);

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      const item: RouteItemProps = options[col * i + j];

      arr[i] = arr[i] || [];
      if (item) {
        arr[i].push(item);
      }
    }
  }

  return arr;
}

export function RouteList(props: RouteListProps) {
  const history = useHistory();
  const { col = DEFAULT_COL_COUNT, layout = 'grid', options } = props;
  const colSpan = layout === 'grid' ? Math.floor(12 / col) : 12;

  const onClick = (item: RouteItemProps) => {
    // 路由模式
    if (props.route) {
      item.path && history.push(item.path);
    } else {
      props.onClick && props.onClick(item);
    }
  };

  const listItem = (meta: RouteItemProps) => (
    <Col
      span={colSpan}
      className="route-list-item"
      key={meta.name}
      onClick={() => onClick(meta)}
    >
      <SvgIcon name={meta.iconName} />
      <span>{meta.title}</span>
    </Col>
  );

  const renderRow = (options: RouteItemProps[], col: number) => {
    if (layout === 'grid') {
      const formatDatas = formatOptions(options, col);

      return formatDatas.map((row, index) => (
        <Row key={index}>{row.map(listItem)}</Row>
      ));
    } else {
      return options.map((row, index) => (
        <Row key={index}>{listItem(row)}</Row>
      ));
    }
  };

  return (
    <div
      className={classNames(
        '_component_business_route-list_',
        `layout_type_${layout}`,
        props.className
      )}
    >
      {renderRow(options, col)}
    </div>
  );
}
