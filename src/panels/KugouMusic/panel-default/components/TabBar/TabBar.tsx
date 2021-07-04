import React from 'react';
import { Link } from 'react-router-dom';
import './TabBar.less';

export const TabBar = ({ tabs }) => {
  return (
    <div className="tabBar">
      {
        tabs.map((item, index) => {
          if (item.notShowTab) {
            return null;
          }
          return <Link className="link" key={index} to={item.path}>{item.name}</Link>;
        })
      }
    </div>
  );
};
