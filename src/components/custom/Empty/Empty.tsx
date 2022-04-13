import React from 'react';
import { Icon } from '@custom/Icon';
export function Empty({ children }) {
  return (
    <div className="cus-empty">
      {children ? children : <Icon name="empty" className="empty" />}
    </div>
  );
}
