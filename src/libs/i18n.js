import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';


i18n
  .use(initReactI18next)
  .init({
    resources: {
      zh: {
        translation: {
          h1: '室内空气 优',
        },
      },
      en: {
        translation: {
          h1: 'Indoor Air Quality',
        },
      },
    },
    // appid: 'kt31mstnolpgj6ff', // 应用id，用于访问CDN线上配置的标识符
    // ns: ['default'], // 命名空间
    // defaultNS: ['default'], // 默认命名空间
    lng: 'zh',
    fallbackLng: ['zh'],
    // resources: allData,
    // preload: ['en'], // 预加载的语言
    partialBundledLanguages: false, // 部分从sdk传入，部分从connector获取
    debug: true, // 开启调试,
    // backend:{},
    // cache:{}
  })
  .then((t) => {
    console.log('初始化webSDKCore完成,用时:\n');
    console.timeEnd('webSDKCoreInit');
    console.log('当前resource数据：', webSDKCore.services.resourceStore.toJSON());

    // webSDKCore.changeLanguage("zh");
  })
  .catch(e => {
    console.warn('初始化webSDKCore失败 ====>', e);
  }).finally(() => {
    console.log('初始化webSDKCore完成，无论成功或失败');
  });
