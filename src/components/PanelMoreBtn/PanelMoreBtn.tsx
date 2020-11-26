import React from 'react';
import classNames from 'classnames';
import { RawBtn } from '@components/Btn';
import { iconMore, iconMoreWhite } from '@icons/common';
import * as wxlib from '@wxlib';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import './PanelMoreBtn.less';

export interface PanelMoreBtnProps extends StyledProps {
	deviceId?: string;
	isShareDevice?: boolean;
	theme: 'dark' | 'white';
	onClick?: any;
}

export function PanelMoreBtn({
	className,
	style,
	deviceId,
	isShareDevice,
	theme,
	onClick = () => sdk.goDeviceDetailPage(),
}: PanelMoreBtnProps) {
	return (
		<RawBtn
			className={classNames('panel-more-btn', className)}
			onClick={() => {
				if (typeof onClick === 'function') {
					onClick();
					return;
				}

				wxlib.router.go('/pages/Device/DeviceDetail/DeviceDetail', {
					deviceId,
					isShareDevice,
				});
			}}
			style={style}
		>
			<img
				className='more-btn-icon'
				src={theme === 'dark' ? iconMoreWhite : iconMore}
			/>
		</RawBtn>
	);
}


