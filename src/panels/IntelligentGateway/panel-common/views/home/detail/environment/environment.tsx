import React from 'react';
import classNames from 'classnames';
import './environment.less';
import Gateways from './gateways/gateways';
import { useHistory } from 'react-router';

const Environment = () => {
  const history = useHistory();
  const handleGetGateway = () => history.push('/getGateway');
  return (
    <article className={classNames('environment')}>
      <div className="title">已添加的设备 ▼</div>
      <Gateways />
      <div className="add" onClick={handleGetGateway}>添加子设备</div>
    </article>
  );
};

export default Environment;
