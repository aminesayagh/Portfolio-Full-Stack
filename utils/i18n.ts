// src/i18n.js

import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';

i18n
  .use(Backend) // lazy loads translations from /public/locales
  .use(LanguageDetector) // detect user language
  .use(resourcesToBackend((language, namespace, callback) => {
    import(`../public/locales/${language}/${namespace}.json`)
      .then((resources) => {
        callback(null, resources)
      })
      .catch((error) => {
        callback(error, null)
      })
  }))
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    ns: ['common'],
    debug: false,
    supportedLngs: ['fr', 'en'],
    detection: {
      order: ['queryString', 'cookie'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;