import React from 'react';
import { useHistory } from 'react-router';
import classNames from 'classnames';
import './power.less';
import addIcon from '../../../icons/normal/add.svg';

export function Power() {
  const history = useHistory();
  const handleGetGateway = () => history.push('/getGateway');
  return (
    <article className={classNames('power-tools-bar')}>
      <button
        id={'power'}
        className={classNames('btn-power-switch')}
        onClick={handleGetGateway}
      >
        <img className="img" src={addIcon} alt="" />
      </button>
    </article>
  );
}
