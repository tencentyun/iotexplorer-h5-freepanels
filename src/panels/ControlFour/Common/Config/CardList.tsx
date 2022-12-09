import React from 'react';
import GridDnD from '@custom/GridDnD';

const dataSource = [{
  id: 1,
  content: '1231'
}, {
  id: 2,
  content: '1232'
}, {
  id: 3,
  content: '1233'
}, {
  id: 4,
  content: '1234'
}, {
  id: 5,
  content: '1235'
}, {
  id: 6,
  content: '1236',
  disabled: true
}]

export function CardList() {
  return (
    <div className="card-list">
      <GridDnD dataSource={dataSource} onChange={(items) => { console.log(items) }} />
    </div>
  );
}
