import React, { useState } from 'react';
import { DoControlDeviceData } from '@hooks/useDeviceInfo';
import * as wxlib from '@wxlib';
import { themeColorMap } from '@constants';
import { SectionList } from "@components/SectionList";
import './FilterReset.less';

export function FilterReset({
    doControlDeviceData,
}: {
    doControlDeviceData: DoControlDeviceData,
}) {

    const doReset = async () => {
        try {
            const isConfirm = await wxlib.tips.confirm('确定要复位滤芯吗？', '', {
                confirmText: '确认',
                confirmColor: themeColorMap.primary,
            });

            if (!isConfirm) {
                return;
            }

            wxlib.tips.showLoading('提交中');
            await doControlDeviceData('reset_filter', 1);
            wxlib.tips.hideLoading();
            wxlib.tips.showSuccess('保存成功')
        } catch (err) {
            wxlib.tips.showError(err);
        }
    };


    return (
        <>
            <div className="filter-reset-page clearfix">
                <SectionList>
                    <SectionList.Item
                        label={'滤芯复位'}
                        onClick={doReset}
                    >
                    </SectionList.Item>
                </SectionList>
            </div>
        </>
    );
}
