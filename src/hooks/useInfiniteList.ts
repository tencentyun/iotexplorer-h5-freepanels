import { useEffect, useState } from 'react';

import { StatusTipProps } from '@components/StatusTip';
import { getErrorMsg } from '@utillib';

const initState = {
  list: [],
  context: '',
  loading: true,
  loadFinish: false,
  hasInit: false,
  hasError: false,
  searching: false,
  errorMsg: '',
  total: 0,
};

interface InfiniteListState<T> {
  list: T[];
  context: string;
  loading: boolean;
  loadFinish: boolean;
  hasInit: boolean;
  hasError: boolean;
  searching: boolean;
  errorMsg: string;
  total: number;
}

export const useInfiniteList = <T extends {}>({
  getData,
  dependences = [],
  shouldUpdate = null,
  statusTipOpts = {},
  needReloadByDependences = false,  // 提供这个默认值，用于函数在根据 dependences 自动 reload 而非手动调用的时候传参
}: {
  getData: (props: {
    context?: any;
    [propName: string]: any;
  }) => Promise<{
    context?: any;
    list?: T[];
    loadFinish?: boolean;
    searching?: boolean;
    total?: number;
  }>;
  dependences?: any[];
  shouldUpdate?: any;
  statusTipOpts?: Omit<StatusTipProps, 'status'>;
  needReloadByDependences?: boolean;
}): [InfiniteListState<T>, {
  loadMore: () => Promise<any>;
  reload: (params?: {
    doNotResetView?: boolean;
    [propName: string]: any;
  }) => void;
  statusTip: StatusTipProps | null;
}] => {
  const [state, setState] = useState<InfiniteListState<T>>(initState);

  const fetchData = async ({
    reset = false,
    ...props
  } = {}) => {
    let nextState;

    if (!reset) {
      if (state.loadFinish) {
        console.log('updateData, but loadFinish');
        return;
      }

      nextState = {
        ...state,
        hasError: false,
        errorMsg: '',
        loading: true,
      };

      setState(nextState);
    } else {
      nextState = {
        ...state,
        context: '',
        list: [],
      };
    }

    try {
      const {
        context, list = [], loadFinish, searching, total,
      } = await getData({
        context: nextState.context,
        ...props,
      });

      setState({
        ...nextState,
        context,
        errorMsg: '',
        loading: false,
        hasInit: true,
        hasError: false,
        loadFinish,
        list: [...nextState.list, ...list],
        searching,
        total,
      });
    } catch (err) {
      console.error(err);
      setState({
        ...nextState,
        hasError: true,
        errorMsg: getErrorMsg(err),
        loading: false,
        hasInit: true,
      });
    }
  };

  const reset = () => {
    setState({
      ...initState,
    });
  };

  const getStatusTipProp = (): StatusTipProps | null => {
    const {
      // empty
      onAdd,
      emptyType,
      emptyIconType,
      emptyMessage = '暂无数据', // empty-add
      emptyAddBtnText,

      // error
      errorTitle,
      errorMessage,
      retryText = '点击重试',

      // common
      fillContainer,
      style,
      className,
    } = statusTipOpts || {};

    if (state.hasError) {
      return {
        status: 'error',
        errorTitle,
        errorMessage: state.errorMsg || errorMessage,
        onRetry: fetchData,
        retryText,
        fillContainer,
        style,
        className,
      };
    }

    if (state.hasInit && !state.loading && !state.list.length) {
      return {
        status: 'empty',
        emptyMessage,
        emptyIconType,
        emptyType,
        emptyAddBtnText,
        onAdd,
        fillContainer,
        style,
        className,
      };
    }

    return null;
  };

  useEffect(() => {
    // 判断依赖是否都有值
    // 特殊情况依赖中有值为空也要更新的，那就利用shouldUpdate去控制
    if (
      !dependences.length
      || dependences.every(item => !!item)
      || (typeof shouldUpdate === 'function' && shouldUpdate(dependences))
    ) {
    // 根据依赖去更新值的情况有些是需要relaod的，所以传入reset参数
      fetchData({ reset: needReloadByDependences });
    }
  }, [...dependences]);

  return [state, {
    loadMore: () => fetchData(),
    reload: ({
      doNotResetView = true,
      ...props
    } = {}) => {
      if (!doNotResetView) {
        reset();
      }

      fetchData({ reset: true, ...props });
    },
    statusTip: getStatusTipProp(),
  }];
};
