import React from 'react';

export function Layout(props) {
  const { width = 300, height = 300, children = [], grid, position } = { ...props };
  const [row, column] = grid.split('*');
  return (
        <div className="wrapper" style={{ width, height, gridTemplateColumns: `repeat(${column}, 1fr)`, gridTemplateRows: `repeat(${row}, 1fr)` }}>
            {position.map((item, index) => (
                    <div className="item" style={{
                      gridColumn: item.column,
                      gridRow: item.row,
                    }}>{children[index]}</div>
            ))}
        </div>
  );
}
