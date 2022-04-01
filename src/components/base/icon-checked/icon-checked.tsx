/**
 * @Description:
 * @Author: RuiXue
 * @Date: 2021/10/4 20:12
 * @LastEditors:
 * @LastEditTime:
 */

import React, { Component, Requireable } from 'react';
import PropTypes from 'prop-types';
import { SvgIcon } from '@components/common/icon';
import classNames from 'classnames';
import './icon-checked.less';

class IconChecked extends Component {
  static propTypes: { isChecked: Requireable<boolean> };
  render() {
    const { isChecked }: any = this.props || false;
    return (
      <section className={classNames('icon-check-bg', isChecked && 'checked')}>
        <SvgIcon
          className={classNames(isChecked ? 'icon-selected' : 'icon-unselected')}
          name={isChecked ? 'icon-common-selected' : 'icon-common-unselected'}
        />
      </section>
    );
  }
}

IconChecked.propTypes = {
  isChecked: PropTypes.bool,
};

export default IconChecked;
