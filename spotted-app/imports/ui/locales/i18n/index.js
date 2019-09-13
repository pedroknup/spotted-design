import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { pt, en } from './locales';

const options = {
  interpolation: {
    escapeValue: false // not needed for react!!
  },

  debug: true,

  // lng: 'en',

  resources: {
    pt: {
      common: pt['pt-BR']
    },
    en: {
      common: en.en
    }
  },

  fallbackLng: 'en',

  ns: ['common'],

  defaultNS: 'common',

  react: {
    wait: false,
    bindI18n: 'languageChanged loaded',
    bindStore: 'added removed',
    nsMode: 'default'
  }
};


const customDetector = {
  type: 'languageDetector',
  async: true, // If this is set to true, your detect function receives a callback function that you should call with your language, useful to retrieve your language stored in AsyncStorage for example
  init: function(services, detectorOptions, i18nextOptions) {
    /* use services and options */
  },
  detect: function(callback) {
    // You'll receive a callback if you passed async true
    /* return detected language */
    // callback('de'); if you used the async flag
    return 'en';
  },
  cacheUserLanguage: function(lng) {
    /* cache language */
  }
};

i18n
  .use(customDetector)
  .init(options)
  .changeLanguage('en', (err, t) => {
    if (err) return console.log('something went wrong loading', err);
  });

export default i18n;
