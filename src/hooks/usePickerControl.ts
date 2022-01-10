import { useRef, useState, useEffect } from 'react';

export function usePickerControl<T>({
  onSubmit,
  initValue = [],
}: {
	onSubmit: (value: T[]) => any;
	initValue?: T[] | (() => T[]);
}): [
	{
		value: T[];
	},
	{
		onChange: (value: T[]) => any;
		doSubmit: () => any;
		onScrollChange: () => any;
	}
] {
  const pickingLockRef = useRef(false);
  const [localValue, setLocalValue] = useState<T[]>(initValue);
  // 这里跟小程序不同的点是，如果lazySubmitting反映在UI上，导致组件重绘，会使得picker的滚动被打断
  // 所以这里只加锁和set lazy，但是不反馈到UI
  const lazySubmittingRef = useRef(false);
  const unmountedRef = useRef(false);

  useEffect(() => () => {
    unmountedRef.current = true;
  }, []);

  return [{
    value: localValue,
  }, {
    onChange(value) {
      if (pickingLockRef.current) {
        pickingLockRef.current = false;
      }

      if (lazySubmittingRef.current) {
        onSubmit(value);
      }

      if (!unmountedRef.current) {
        setLocalValue(value);
      }
    },
    doSubmit() {
      if (pickingLockRef.current) {
        lazySubmittingRef.current = true;
      } else {
        onSubmit(localValue);
      }
    },
    onScrollChange() {
      pickingLockRef.current = true;
    },
  }];
}
