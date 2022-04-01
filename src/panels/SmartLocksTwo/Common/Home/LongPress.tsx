import { useCallback, useRef, useState } from 'react';

const useLongPress = (
  onLongPress: (arg0: any) => void,
  onClick: () => any,
  stopLongPress: () => any,
  { shouldPreventDefault = true, delay = 300 } = {},
) => {
  const [longPressTriggered, setLongPressTriggered] = useState(false);
  const timeout: any = useRef();
  const target: any = useRef();

  const start = useCallback(
    (event) => {
      if (shouldPreventDefault && event.target) {
        event.target.addEventListener('touchend', preventDefault, {
          passive: false,
        });
        target.current = event.target;
      }
      timeout.current = setTimeout(() => {
        onLongPress(event);
        setLongPressTriggered(true);
      }, delay);
    },
    [onLongPress, delay, shouldPreventDefault],
  );

  const clear = useCallback(
    (event, shouldTriggerClick = true) => {
      timeout.current && clearTimeout(timeout.current);
      shouldTriggerClick && !longPressTriggered && onClick();
      if (longPressTriggered) {
        stopLongPress();
      }
      setLongPressTriggered(false);

      if (shouldPreventDefault && target.current) {
        target.current.removeEventListener('touchend', preventDefault);
      }
    },
    [shouldPreventDefault, onClick, longPressTriggered, stopLongPress],
  );

  return {
    onTouchStart: (e: any) => start(e),
    onTouchEnd: (e: any) => clear(e),
  };
};

const isTouchEvent = (event: any) => 'touches' in event;

const preventDefault = (event: { touches: string | any[]; preventDefault: () => void; }) => {
  if (!isTouchEvent(event)) return;

  if (event.touches.length < 2 && event.preventDefault) {
    event.preventDefault();
  }
};

export default useLongPress;
