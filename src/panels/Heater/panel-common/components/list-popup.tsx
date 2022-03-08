import React, { useState, useMemo } from 'react';
import classNames from 'classnames';
import { SvgIcon } from '@components/common/icon';
import { Popup } from 'antd-mobile';
import { StyledProps, ThemeType } from '@libs/global';
import { getThemeType } from '@libs/theme';
import './list-popup.less';

export type SelectType = {
  Radio: 'radio';
  Multiple: 'multiple';
};

export interface Option {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface ListPopupProps extends StyledProps {
  name?: string;
  title?: string;
  visible?: boolean;
  value?: string[];
  type?: SelectType['Radio'] | SelectType['Multiple'];
  options: Option[];
  theme?: ThemeType;
  layoutType?: string; //'middle'
  onCancel?: () => void;
  onConfirm?: (checked: string[]) => void;
}

export function ListPopup(props: ListPopupProps) {
  const themeType = getThemeType();

  const { type = 'radio', options, value, theme = themeType } = props;
  const [checkList, setCheckList] = useState(['']);

  useMemo(() => {
    const val = value !== undefined ? value : [''];

    setCheckList(val);
  }, [props.visible]);

  const handleConfirm = () => {
    props.onConfirm && props.onConfirm(checkList);
    handleCancel();
  };

  const handleCancel = () => {
    props.onCancel && props.onCancel();
  };

  const handleSelect = (option: Option) => {
    if (option.disabled) return;

    const { value } = option;
    if (type === 'radio') {
      // 单选模式
      setCheckList([value]);
    } else {
      // 多选模式
      const index = checkList.indexOf(value);
      const checked = checkList.filter(t => t !== '');

      if (index > -1) {
        checked.splice(index, 1);
      } else {
        checked.push(value);
      }
      setCheckList(checked);
    }
  };

  const themeColor: any = {
    normal: { 
      selected: {
        color: '#000000'
      },
      unselected: {
        color: '#9CAAB5'
      }
    },
    blueWhite: {
      selected: {
        color: '#2885FE'
      },
      unselected: {
        color: '#9CAAB5'
      }
    },
    dark: {
      selected: {
        gradientId: props.name + '-icon',
        startColor: '#00F0FF',
        endColor: '#704DF0',
        x1: '11.8644068%',
        y1: '18.182147%',
        x2: '104.602754%',
        y2: '88.2505064%'
      },
      unselected: {
        color: '#9CAAB5'
      }
    },
    colorful: {
      selected: {
        color: '#ED2F26'
      },
      unselected: {
        color: '#9CAAB5'
      }
    },
    morandi: {
      selected: {
        color: '#FFFFFF'
      },
      unselected: {
        color: 'rgba(255, 255, 255, 0.5)'
      }
    }
  };

  const selectItem = (item: Option) => {
    const isSelected = checkList.indexOf(item.value) > -1;

    return (
      <div
        className={classNames('item-block', {
          isDisabled: item.disabled,
          isSelected: isSelected
        })}
        key={item.value}
        onClick={() => handleSelect(item)}
      >
        <div className="item-label">{item.label}</div>
          <SvgIcon
            className={classNames(isSelected ? 'item-icon-selected' : 'item-icon-unselected')}
            name={isSelected ? 'icon-common-selected' : 'icon-common-unselected'}
            {...themeColor[theme][isSelected ? 'selected' : 'unselected']}
          ></SvgIcon>
      </div>
    );
  };

  return (
    <Popup
      className="list-popup"
      visible={props.visible}
      onMaskClick={handleCancel}
    >
      <header>{props.title}</header>
      <main className={classNames(props.layoutType !== 'middle' ? 'block-wrap' : 'block-wrap-middle')}>
        {options.map((option: Option) => selectItem(option))}
      </main>
      <footer>
        <div className="btn cancelBtn" onClick={handleCancel}>
          取消
        </div>
        <div className="btn confirmBtn" onClick={handleConfirm}>
          确定
        </div>
      </footer>
    </Popup>
  );
}
