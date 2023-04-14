import React, { FC } from 'react';

type GridProps = {
    columns: number;
};

const Grid: FC<GridProps> = ({ children, columns }) => {
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gridGap: 10,
                // maxWidth: '800px',
                // margin: '100px auto',
            }}
        >
            {children}
        </div>
    );
};

export default Grid;
