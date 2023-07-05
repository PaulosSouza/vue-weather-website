<template>
  <div class="flex flex-1 flex-col items-center">
    <!-- Banner-->
    <div
      v-if="route.query.preview"
      class="w-full bg-weather-secondary p-4 text-center text-white"
    >
      <p>
        {{ $t('cityPreview') }}
      </p>
    </div>

    <!-- Weather Overview-->
    <div class="flex flex-col items-center py-12 text-white">
      <h1 class="mb-2 text-4xl">{{ route.query.city }}</h1>

      <p class="mb-12 text-sm">
        {{
          new Date(weatherData.dt).toLocaleString($t('language'), {
            weekday: 'short',
            day: '2-digit',
            month: 'long',
          })
        }}

        {{
          new Date(weatherData.dt).toLocaleString($t('language'), {
            timeStyle: 'short',
          })
        }}
      </p>

      <p class="mb-8 text-8xl">{{ Math.round(weatherData.main.temp) }} &deg;</p>

      <p>Feels like {{ Math.round(weatherData.main.feels_like) }} &deg;</p>

      <p class="capitalize">
        {{ weatherData.weather[0].description }}
      </p>

      <img
        class="h-auto w-[150px]"
        :src="`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`"
        alt="Weather Icon"
      />
    </div>

    <hr class="w-full border border-white/10" />

    <!-- Hourly Weather -->
    <div class="w-full max-w-screen-md py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4">{{ $t('hourlyWeather') }}</h2>

        <div class="flex gap-10 overflow-x-scroll">
          <div
            v-for="hourData in forecastHourly.list"
            :key="hourData.dt"
            class="flex flex-col items-center gap-4"
          >
            <p class="whitespace-nowrap text-xs">
              {{
                new Date(hourData.dt).toLocaleString($t('language'), {
                  hour: 'numeric',
                })
              }}
            </p>

            <img
              class="h-[50px] w-auto object-cover"
              :src="`http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`"
              alt=""
            />

            <p class="text-xl">{{ Math.round(hourData.main.temp) }}&deg;</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Remove City Button-->
    <div
      class="flex cursor-pointer items-center gap-2 py-12 text-white duration-150 hover:text-red-500"
      @click="removeCity"
      @keypress="removeCity"
      v-if="route.query.id"
    >
      <i class="fa-solid fa-trash"></i>
      <p>Remove City</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { WeatherLocation } from '@/interfaces/Location';
import type { ForecastHourly, Weather } from '@/interfaces/Weather';
import axios from 'axios';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const weatherData = ref<Weather>({} as Weather);
const forecastHourly = ref<ForecastHourly>({} as ForecastHourly);

async function getWeatherData() {
  try {
    const openWeatherResult = await axios.get<Weather>(
      `https://api.openweathermap.org/data/2.5/weather?lat=${
        route.query.lat
      }&lon=${route.query.lng}&appid=${
        import.meta.env.VITE_OPEN_WEATHER_API_KEY
      }&units=imperial`
    );

    return openWeatherResult.data;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
}

async function getForecastHourly() {
  try {
    const forecastWeatherResult = await axios.get<ForecastHourly>(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${
        route.query.lat
      }&lon=${route.query.lng}&appid=${
        import.meta.env.VITE_OPEN_WEATHER_API_KEY
      }&units=imperial`
    );

    return forecastWeatherResult.data;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
}

function removeCity() {
  const locations = JSON.parse(
    localStorage.getItem('savedLocations') ?? ''
  ) as WeatherLocation[];

  const updatedLocations = locations.filter(
    (location) => location.id !== route.query.id
  );

  localStorage.setItem('savedLocations', JSON.stringify(updatedLocations));

  router.push({
    name: 'home',
  });
}

weatherData.value = await getWeatherData();
forecastHourly.value = await getForecastHourly();
</script>
