/**
 *  小程序路由模块
 *  @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/ui-navigate.html
 */
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import _ from '@underscore';
import { appendParams } from '@utillib';

export default {
  /**
   * 页面跳转
   *
   * 默认在当前页面至上跳转
   *
   * 如传redirect=true,则关闭当前页面跳转
   * 如传relaunch=true,则关闭所有页面并跳转
   *
   * @param url
   * @param [waitForResponse]
   * @param [redirect]
   * @param [relaunch]
   * @param [replace] alias for redirect
   * @param [data]
   * @return {*}
   */
  async go(url: string, {
    redirect = false,
    relaunch = false,
    replace,
    // 如果需要等待响应，需要自行在目标页面onUnload 时trigger回调
    waitForResponse,
    ...data
  }: {
    redirect?: boolean;
    relaunch?: boolean;
    replace?: boolean;
    // 如果需要等待响应，需要自行在目标页面onUnload 时trigger回调
    waitForResponse?: boolean;
    [propName: string]: any;
  } = {}) {
    if (typeof replace !== 'undefined') {
      redirect = replace;
    }

    if (data) {
      url = appendParams(url, data);
    }

    if (url.indexOf('/pages/Index/Index') > -1) {
      await sdk.callMpApi('reLaunch', { url });
    } else if (redirect) {
      await sdk.callMpApi('redirectTo', { url });
    } else if (relaunch) {
      await sdk.callMpApi('reLaunch', { url });
    } else {
      await sdk.callMpApi('navigateTo', { url });
    }
  },

  replace(url, data = {}) {
    return this.go(url, { redirect: true, ...data });
  },

  relaunch(url, data = {}) {
    return this.go(url, { relaunch: true, ...data });
  },

  async back(delta: number | { reload?: boolean; params?: any } = 1, { reload = false }: { reload?: boolean } = {}) {
    console.log('back params', delta, reload);

    if (typeof delta !== 'number' && _.isPlainObject(delta)) {
      reload = <boolean>delta.reload;
      delta = 1;
    }

    if (reload) {
      sdk.reloadAfterUnmount();
    }

    sdk.callMpApi('navigateBack', { delta: <number>delta });
  },
};
