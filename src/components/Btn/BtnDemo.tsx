import React from 'react';
import { iconHomeSetting } from '@icons/common';
import { Btn } from './Btn';
import { BtnGroup, ConfirmBtnGroup } from './BtnGroup';

export function BtnDemo({
}) {
  return (
    <div style={{ backgroundColor: '#fff' }}>
      <div>Btn demo</div>

      <Btn
        type='cancel'
      >
        cancel
      </Btn>
      <Btn
        type='cancel'
        disabled
      >
        cancel disabled
      </Btn>
      <Btn
        type='primary'
      >
        primary
      </Btn>
      <Btn
        type='primary'
        reverse
        icon={iconHomeSetting}
      >
        primary reverse
      </Btn>
      <Btn
        type='primary'
        transparent
      >
        primary transparent
      </Btn>
      <Btn
        type='danger'
      >
        danger
      </Btn>
      <Btn
        type='danger'
        reverse
      >
        danger reverse
      </Btn>
      <Btn
        type='danger'
        transparent
      >
        danger transparent
      </Btn>
      <Btn
        type='primary'
        disabled
      >
        primary disabled
      </Btn>
      <Btn
        type='primary'
        disabled
        reverse
      >
        primary reverse disabled
      </Btn>
      <Btn
        type='primary'
        disabled
        transparent
      >
        primary transparent disabled
      </Btn>
      <Btn
        type='danger'
        disabled
      >
        danger disabled
      </Btn>
      <Btn
        type='danger'
        disabled
        reverse
      >
        danger reverse disabled
      </Btn>
      <Btn
        type='danger'
        disabled
        transparent
      >
        danger transparent disabled
      </Btn>

      <div>BtnGroup demo</div>

      <BtnGroup
        style={{ margin: '60rpx' }}
      >
        <Btn type='cancel'>
          取消
        </Btn>
        <Btn type='primary'>
          确定
        </Btn>
      </BtnGroup>

      <BtnGroup
        layout='vertical'
      >
        <Btn type='cancel'>
          取消
        </Btn>
        <Btn type='primary'>
          确定
        </Btn>
      </BtnGroup>

      <div>ConfirmBtnGroup demo</div>

      <ConfirmBtnGroup
        confirmText='确定'
        cancelText='取消'
      />
    </div>
  );
}
