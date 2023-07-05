/* eslint-disable no-param-reassign */
import { createI18n } from 'vue-i18n';
import { nextTick } from 'vue';
import pt from '@/locales/pt.json';

export const i18n = createI18n({
  locale: import.meta.env.VITE_DEFAULT_LOCALE,
  fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
  globalInjection: true,
  legacy: false,
  messages: {
    pt,
  },
});

export function setI18nLanguage(language: string) {
  i18n.global.locale.value = language as any;
  document.querySelector('html')?.setAttribute('lang', language);
}

export async function loadLocaleMessages(locale: string, setAlready: boolean) {
  const messages = await import(`@/locales/${locale}.json`);

  i18n.global.setLocaleMessage(locale, messages.default);

  if (setAlready) {
    setI18nLanguage(locale);
  }

  return nextTick();
}
