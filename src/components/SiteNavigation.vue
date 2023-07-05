<template>
  <header class="sticky top-0 bg-weather-primary shadow-lg">
    <nav
      id="navbar"
      class="container relative flex flex-col items-center gap-4 py-6 text-white sm:flex-row"
    >
      <RouterLink :to="{ name: 'home' }">
        <div class="flex flex-1 items-center gap-3">
          <i class="fa-solid fa-sun text-2xl"></i>
          <p class="text-2xl">{{ $t('title') }}</p>
        </div>
      </RouterLink>

      <div class="flex flex-1 justify-end gap-3">
        <i
          class="fa-solid fa-circle-info cursor-pointer text-xl duration-150 hover:text-weather-secondary"
          @click="toggleModal()"
          @keypress="toggleModal()"
        ></i>

        <i
          class="fa-solid fa-plus cursor-pointer text-xl duration-150 hover:text-weather-secondary"
          @click="addCity"
          @keypress="addCity"
          v-if="route.query.preview"
        ></i>

        <LanguageSwitcher />
      </div>

      <BaseModal @close-modal="toggleModal()" :modal-active="modalActive">
        <div class="text-black">
          <h1 class="mb-1 text-2xl">About:</h1>
          <p class="mb-4">
            The Local Weather allows you to track the current and future weather
            of cities of your choosing.
          </p>
          <h2 class="text-2xl">How it works:</h2>
          <ol class="mb-4 list-inside list-decimal">
            <li>
              Search for your city by entering the name into the search bar.
            </li>
            <li>
              Select a city within the results, this will take you to the
              current weather for your selection.
            </li>
            <li>
              Track the city by clicking on the "+" icon in the top right. This
              will save the city to view at a later time on the home page.
            </li>
          </ol>

          <h2 class="text-2xl">Removing a city</h2>
          <p>
            If you no longer wish to track a city, simply select the city within
            the home page. At the bottom of the page, there will be am option to
            delete the city.
          </p>
        </div>
      </BaseModal>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { v4 as uuidV4 } from 'uuid';
import { ref } from 'vue';
import { type Location } from '@/interfaces/Location';
import { useToggle } from '@vueuse/core';
import LanguageSwitcher from './LanguageSwitcher.vue';
import BaseModal from './BaseModal.vue';

const router = useRouter();
const route = useRoute();

const [modalActive, toggleModal] = useToggle(false);
const savedLocations = ref<Location[]>([]);

function addCity() {
  const savedLocationsFromLocalStorage = localStorage.getItem('savedLocations');

  if (savedLocationsFromLocalStorage) {
    savedLocations.value = JSON.parse(
      savedLocationsFromLocalStorage
    ) as Location[];
  }

  const location = {
    id: uuidV4(),
    state: route.params.state as string,
    city: route.params.city as string,
    coords: {
      lat: route.query.lat as unknown as number,
      lng: route.query.lng as unknown as number,
    },
  };

  savedLocations.value.push(location);
  localStorage.setItem('savedLocations', JSON.stringify(savedLocations.value));

  const query = { ...route.query };
  query.id = location.id;
  delete query.preview;

  router.replace({ query });
}
</script>
