import { createI18n } from 'vue-i18n';
import pt from '../locales/pt.json';
import en from '../locales/en.json';

export default createI18n({
  locale: import.meta.env.VITE_DEFAULT_LOCALE,
  fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
  legacy: false,
  messages: {
    pt,
    en,
  },
});
