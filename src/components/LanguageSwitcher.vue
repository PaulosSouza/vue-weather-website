<template>
  <div class="relative">
    <button
      @click="isOpen = !isOpen"
      type="button"
      class="pt-0.5 shadow-sm focus:border-none focus:outline-none focus:ring-indigo-500"
    >
      <component :is="asyncComponent(locale)" width="24px" height="24px" />
    </button>

    <Teleport to="#dropdown-language-switcher">
      <div
        v-if="isOpen"
        class="container absolute left-[536px] right-0 top-[4rem] flex items-center justify-center"
      >
        <div
          class="z-20 h-max w-48 rounded-md bg-white py-2 text-black shadow-lg"
        >
          <a
            class="flex cursor-pointer items-center px-4 py-2 hover:bg-gray-100"
            href="#"
            v-for="supportLocale in supportLocales"
            :key="`locale-${supportLocale}`"
            @click="selectLanguage(supportLocale)"
          >
            <component
              :is="asyncComponent(supportLocale)"
              width="24px"
              height="24px"
              class="mr-2 cursor-pointer"
            />
            <span>{{ $t(`locales.${supportLocale}`) }}</span>
          </a>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { computed, defineAsyncComponent, ref } from 'vue';
import { loadLocaleMessages } from '../i18n';

const isOpen = ref(false);
const { locale } = useI18n();

const supportLocales = import.meta.env.VITE_SUPPORTED_LANGUAGES.split(',');

async function selectLanguage(selectedLocale: string) {
  await loadLocaleMessages(selectedLocale, true);

  locale.value = selectedLocale;
  isOpen.value = false;
}

const asyncComponent = computed(() => (language: string) => {
  const asyncComponentObject = {
    pt: defineAsyncComponent(() => import('@/components/flags/BrazilFlag.vue')),
    en: defineAsyncComponent(() => import('@/components/flags/USAFlag.vue')),
  };

  return asyncComponentObject[language as keyof typeof asyncComponentObject];
});
</script>
