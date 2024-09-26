import i18next from 'i18next';
import zhResources from './zh/resources.json';
import enResources from './en/resources.json';

import md5 from 'md5';
import { parseUrl } from '@src/libs/utillib';

import enUS from 'antd-mobile/es/locales/en-US';
import { setDefaultConfig } from 'antd-mobile';

const resources = {
  zh: {
    translation: zhResources,
  },
  en: {
    translation: enResources,
  },
};

i18next
  .init({
    resources,
    lng: 'zh',
    fallbackLng: 'zh',
    debug: true,
  });

let cachedLang: string | null = null;

const initializeLanguage = () => {
  const { query } = parseUrl(window.location);
  const { lang } = query;
  setDefaultConfig({
    locale: enUS,
  });
  i18n.changeLanguage('en');
  if (lang && lang !== cachedLang) {
    setDefaultConfig({
      locale: enUS,
    });
    i18n.changeLanguage(lang);
    cachedLang = lang;
  }
};

export const t = (text: string, variable?: { [key: string]: unknown }) => {
  if (cachedLang === null) {
    initializeLanguage();
  }

  const { t: translation } = i18n;
  const words = md5(text);
  return translation(words, variable);
};

export const i18n = i18next;

