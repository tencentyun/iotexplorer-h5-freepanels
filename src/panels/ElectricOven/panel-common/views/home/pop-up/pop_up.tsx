import React from 'react';
import classNames from 'classnames';
import Detail from './detail/detail';

export function PopUp() {
  return (
    <article className={classNames('pop_up')}>
      <Detail/>
    </article>
  );
}

export default PopUp;
