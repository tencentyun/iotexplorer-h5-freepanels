import React from 'react';
import { Icon } from '@custom/Icon';

/**
 * 加载中动画
 */
export const Spin = ({ loading, children, name }) => {

    return (<div className="cus-spin">

        {
            loading ?
                <div className='cus-spin-inner center'>
                    <div className='spin-icon'>
                        <Icon name={name || "loading-spin"}></Icon>
                    </div>
                </div>
                : null
        }
        
        {children}

    </div >
    );
}