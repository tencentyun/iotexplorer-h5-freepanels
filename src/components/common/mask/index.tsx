/*
 * @Author: wrq
 * @Date: 2021-09-19 22:41:16
 * @Description:
 */
import React, { useEffect, useState } from 'react';
import { ModalProps } from '../../base/modal';
import styled from 'styled-components';

export interface MaskProps extends ModalProps {
  visible?: boolean;
}
export interface MaskWrapperProps {
  zIndex: number;
}

export const MaskWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(45, 48, 54, 0.74);
  z-index: ${(props: MaskWrapperProps) => props.zIndex};
`;

export const withMask = <P extends ModalProps>(
  WrappedComponent: React.ComponentType<P>
) => {
  return function Mask(props: MaskProps) {
    const Z_INDEX = 999;
    const [isVisible, onToggleVisible] = useState(
      typeof props.visible === 'undefined' || props.visible
    );

    useEffect(() => {
      if (typeof props.visible === 'undefined') return;

      onToggleVisible(!!props.visible);
    }, [props.visible]);

    if (!isVisible) {
      return null;
    }

    return (
      <React.Fragment>
        <MaskWrapper className="_component_common_mask_" zIndex={Z_INDEX} />
        <WrappedComponent
          {...(props as P)}
          zIndex={Z_INDEX + 1}
          visible={isVisible}
          onToggleMask={onToggleVisible}
        />
      </React.Fragment>
    );
  };
};
