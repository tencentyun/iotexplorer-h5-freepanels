/*
 * @Author: wrq
 * @Date: 2021-10-04 15:31:51
 * @Description: 基于 antd-mobile api 封装的column
 */
import React from 'react';
import { animated } from '@react-spring/web';
import {
  PickerColumnItem,
  PickerValue
} from 'antd-mobile/es/components/picker-view';

interface Props {
  column: PickerColumnItem[];
  value: PickerValue;
  onSelect: (value: PickerValue) => void;
}

export function Column(props: Props) {
  const { column } = props;

  return React.createElement(
    'div',
    Object.assign(
      {
        className: 'custom-picker-column'
      }
      // bind()
    ),
    React.createElement(
      animated.div,
      {
        style: {
          // y: y
          y: 0
        },
        className: 'custom-picker-column-wheel'
      },
      column.map(function (item, index) {
        console.log(item, 'item ======');
        function handleClick() {
          // draggingRef.current = false;
          // scrollSelect(index);
        }

        return React.createElement(
          'div',
          {
            key: item.value,
            className: 'custom-picker-column-item',
            onClick: handleClick
          },
          React.createElement(
            'div',
            {
              className: 'custom-picker-column-item-label'
            },
            item.label
          )
        );
      })
    )
  );
}
