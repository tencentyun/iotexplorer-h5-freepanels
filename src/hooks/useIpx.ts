import { useMemo } from 'react';
import { isFullScreen } from '@utillib';

export const useIpx = (): boolean => useMemo(() => isFullScreen(), []);
