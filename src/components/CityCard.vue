<template>
  <div
    class="flex cursor-pointer rounded-md bg-weather-secondary px-3 py-6 shadow-md"
  >
    <div class="flex flex-1 flex-col">
      <h2 class="text-3xl">{{ location.city }}</h2>
      <h3>{{ location.state }}</h3>
    </div>

    <div class="flex flex-col gap-2">
      <p class="self-end text-3xl">
        {{ Math.round(location.weather.main.temp) }}&deg;
      </p>
      <div class="flex gap-2">
        <span class="text-xs">
          H:
          {{ Math.round(location.weather.main.temp_max) }}
        </span>
        <span class="text-xs">
          L:
          {{ Math.round(location.weather.main.temp_min) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { WeatherLocation } from '@/interfaces/Location';

interface Props {
  location: WeatherLocation;
}

defineProps<Props>();
</script>
