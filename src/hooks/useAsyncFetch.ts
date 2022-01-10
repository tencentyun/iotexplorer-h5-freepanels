import { useReducer, useRef, useEffect, Dispatch } from 'react';
import _ from '@underscore';
import { getErrorMsg } from '@utillib';
import { StatusTipProps } from '@components/StatusTip';

export enum AsyncFetchAction {
  Start,
  Success,
  Fail,
  Retry,
  Reset,
  Update,
}

export const defaultAsyncDataState = {
  data: null,
  loading: true,
  hasError: false,
  hasInit: false,
  errorMsg: '',
  defaultErrorMsg: '',
  permissionError: false,
  error: null,
};

export interface UseAsyncFetchState<T> {
  data: T;
  loading: boolean;
  hasError: boolean;
  hasInit: boolean;
  errorMsg: string;
  defaultErrorMsg: string;
  permissionError: boolean;
  error: any;
}

interface getStatusTipPropsOptions extends Omit<StatusTipProps, 'status'> {
  ignoreEmpty?: boolean;
}

export const getStatusTipProps = (state: any, opts: getStatusTipPropsOptions = {}): StatusTipProps | null => {
  const {
    ignoreEmpty,

    // empty
    onAdd,
    emptyType,
    emptyIconType,
    emptyMessage = '暂无数据', // empty-add
    emptyAddBtnText,

    // error
    errorTitle,
    errorMessage,
    onRetry,
    retryText = '点击重试',

    // common
    fillContainer,
    style,
    className,
  } = opts || {};

  const {
    hasError, errorMsg, loading, hasInit, data, error,
  } = state;

  if (hasError) {
    return {
      status: 'error',
      errorTitle,
      errorMessage: errorMessage || errorMsg,
      onRetry: error && error.permissionError ? null : onRetry,
      retryText,
      style,
      className,
      fillContainer,
    };
  } if (loading || !hasInit) {
    return {
      status: 'loading',
      style,
      className,
      fillContainer,
    };
  } if (hasInit && !loading) {
    let isEmptyData = false;

    if (!ignoreEmpty) {
      if (data) {
        if (_.isPlainObject(data) && _.isEmpty(data)) {
          isEmptyData = true;
        } else if (_.isArray(data) && !data.length) {
          isEmptyData = true;
        }
      } else if (!data) {
        isEmptyData = true;
      }
    }

    if (isEmptyData) {
      return {
        fillContainer,
        status: 'empty',
        emptyIconType,
        emptyMessage,
        emptyType, // empty-add
        emptyAddBtnText,
        onAdd,
        style,
        className,
      };
    }
  }

  return null;
};

declare type Reducer<T> = (state: UseAsyncFetchState<T>, action: ReducerAction<AsyncFetchAction>) => UseAsyncFetchState<T>;

export function reducer<T>(state: UseAsyncFetchState<T>, action: ReducerAction<AsyncFetchAction>): UseAsyncFetchState<T> {
  const { type, payload } = action;

  // console.log('action => ', action.type, payload);
  // console.log('prev state => ', state);

  const nextState = (() => {
    switch (type) {
      case AsyncFetchAction.Start:
        return {
          ...state,
          loading: true,
          hasError: false,
          errorMsg: '',
          error: null,
          permissionError: false,
        };
      case AsyncFetchAction.Success: {
        const { data } = payload;

        return {
          ...state,
          data,
          loading: false,
          hasInit: true,
          hasError: false,
          errorMsg: '',
          error: null,
          permissionError: false,
        };
      }
      case AsyncFetchAction.Fail: {
        const { error } = payload;

        return {
          ...state,
          loading: false,
          hasInit: true,
          hasError: true,
          errorMsg: getErrorMsg(error, { defaultMsg: state.defaultErrorMsg }),
          permissionError: error.permissionError,
          error,
        };
      }
      case AsyncFetchAction.Retry:
        break;
      case AsyncFetchAction.Reset:
        break;
      case AsyncFetchAction.Update:
        return {
          ...state,
          data: {
            ...state.data,
            ...payload.data,
          },
        };
    }

    return state;
  })();

  // console.log('next state => ', nextState);

  return nextState as UseAsyncFetchState<T>;
}

export function initAsyncFetchState<T>(initData: T = {} as T): UseAsyncFetchState<T> {
  return Object.assign({}, defaultAsyncDataState, { data: initData });
}

export interface useAsyncFetchProps<T> {
  initData?: T;
  fetch: (props?: any) => Promise<T>;
  statusTipOpts?: getStatusTipPropsOptions;
  ignoreEmpty?: boolean;
  shouldUpdate?: (dependences: any[]) => boolean;
  onUnmount?: any;
}

export function useAsyncFetch<T>({
  initData = {} as T,
  fetch,
  statusTipOpts,
  ignoreEmpty,
  shouldUpdate,
  onUnmount,
}: useAsyncFetchProps<T>, dependences: any[] = []): [
  UseAsyncFetchState<T>,
  {
    dispatch: Dispatch<{ type: AsyncFetchAction; payload?: any }>;
    updateAsyncFetch: (params?: {
      showLoading?: boolean;
      [propName: string]: any;
    }) => Promise<void>;
    statusTip: StatusTipProps | null;
    updateManually: (data: Partial<T>) => void;
    updateError: (error: any) => void;
  }
] {
  const isFetchingRef = useRef(true);
  const [state, dispatch] = useReducer<Reducer<T>, T>(reducer, initData, initAsyncFetchState);

  const doGetData = async ({
    isRetrying = false,
    showLoading = true,
    ...props
  }: {
    isRetrying?: boolean;
    showLoading?: boolean;
    [propName: string]: any;
  } = {}) => {
    isFetchingRef.current = true;

    if (showLoading) {
      dispatch({ type: AsyncFetchAction.Start });
    }

    try {
      const data = await fetch({
        ...props,
      });

      dispatch({
        type: AsyncFetchAction.Success,
        payload: { data },
      });
    } catch (error) {
      console.error('async fetch error', error, error.stack);

      dispatch({
        type: AsyncFetchAction.Fail,
        payload: { error },
      });
    } finally {
      isFetchingRef.current = false;
    }
  };

  useEffect(() => {
    // 判断依赖是否都有值
    if (!dependences.length
      || dependences.every(item => !!item)
      || (typeof shouldUpdate === 'function' && shouldUpdate(dependences))
    ) {
      doGetData();

      if (typeof onUnmount === 'function') {
        return onUnmount as any;
      }
    }
  }, [...dependences]);

  const statusTip = getStatusTipProps(state, {
    onRetry: doGetData,
    ...statusTipOpts,
    ignoreEmpty,
  });

  return [state, {
    dispatch,
    // 默认是无感刷新
    updateAsyncFetch: ({
      showLoading = false,
      ...props
    } = {}) => {
      if (isFetchingRef.current) {
        console.log('isFetching, no need to reload');
        return Promise.reject();
      }

      return doGetData({
        showLoading,
        ...props,
      });
    },
    statusTip,
    updateManually: data => dispatch({
      type: AsyncFetchAction.Update,
      payload: { data },
    }),
    updateError: error => dispatch({
      type: AsyncFetchAction.Fail,
      payload: { error },
    }),
  }];
}
