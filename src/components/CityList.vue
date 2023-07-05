<template>
  <div v-for="location in savedLocations" :key="location.id">
    <CityCard :location="location" @click="goToCityView(location)" />
  </div>

  <p v-if="!savedLocations.length">
    {{ $t('noLocations') }}
  </p>
</template>

<script setup lang="ts">
import type { WeatherLocation } from '@/interfaces/Location';
import type { Weather } from '@/interfaces/Weather';
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import CityCard from './CityCard.vue';

const savedLocations = ref<WeatherLocation[]>([]);
const router = useRouter();

async function getCities() {
  const locationsFromStorage = localStorage.getItem('savedLocations');

  if (!locationsFromStorage) {
    return;
  }

  const locationsParsed = JSON.parse(locationsFromStorage) as WeatherLocation[];
  savedLocations.value = locationsParsed;

  const weatherRequests = locationsParsed.map(async (location) => {
    return axios.get<Weather>(
      `https://api.openweathermap.org/data/2.5/weather?lat=${
        location.coords.lat
      }&lon=${location.coords.lng}&appid=${
        import.meta.env.VITE_OPEN_WEATHER_API_KEY
      }&units=imperial`
    );
  });

  const weatherData = await Promise.all(weatherRequests);

  // eslint-disable-next-line no-promise-executor-return
  await new Promise((res) => setTimeout(res, 1000));

  weatherData.forEach((weatherResponse, index) => {
    savedLocations.value[index].weather = weatherResponse.data;
  });
}

function goToCityView(location: WeatherLocation) {
  const { id, state, city, coords } = location;
  router.push({
    name: 'cityView',
    params: {
      state,
      city,
    },
    query: {
      id,
      lat: coords.lat,
      lng: coords.lng,
    },
  });
}

await getCities();
</script>
