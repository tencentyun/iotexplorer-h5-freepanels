import React from 'react';
import classNames from 'classnames';
import { useIpx } from '@hooks/useIpx';

import './LocatorSubPage.less';

export function LocatorSubPage({
  children,
}) {
  const ipx = useIpx();
  
  return (
    <div className={classNames('locator-sub-page clearfix', { ipx })}>
      {children}
    </div>
  );
}
