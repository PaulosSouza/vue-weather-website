<template>
  <main class="container relative text-white">
    <!-- Input and Search of Location-->
    <div class="relative mb-8 pt-4">
      <input
        v-model="searchQuery"
        @input="getSearchResults"
        aria-label="search-city-and-state"
        type="text"
        :placeholder="$t('placeholder')"
        class="w-full border-b bg-transparent px-1 py-2 focus:border-weather-primary focus:shadow-[0px_1px_0_0_#004e71] focus:outline-none"
      />

      <ul
        class="absolute top-[66px] w-full bg-weather-secondary px-1 py-2 text-white shadow-md"
        v-if="mapboxSearchResults"
      >
        <p v-if="searchError">{{ $t('error.notFound') }}</p>

        <p v-if="!searchError && !mapboxSearchResults.length">
          {{ $t('error.noMatch') }}
        </p>

        <template v-else>
          <li
            ref="liElements"
            v-for="searchResult in mapboxSearchResults"
            :key="searchResult.id"
            class="cursor-pointer py-2"
            @click="previewCity(searchResult.place_name, searchResult.geometry)"
            @keyup="previewCity(searchResult.place_name, searchResult.geometry)"
          >
            {{ searchResult.place_name }}
          </li>
        </template>
      </ul>
    </div>

    <!-- City List-->
    <div class="flex flex-col gap-4">
      <Suspense>
        <CityList />

        <template #fallback>
          <CityCardSkeleton />
        </template>
      </Suspense>
    </div>
  </main>
</template>

<script setup lang="ts">
import CityCardSkeleton from '@/components/CityCardSkeleton.vue';
import CityList from '@/components/CityList.vue';
import axios from 'axios';
import { onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';

interface Geometry {
  coordinates: [number, number];
}

interface Geocoding {
  id: string;
  place_name: string;
  geometry: Geometry;
}

interface Response {
  features: Geocoding[];
}

const router = useRouter();

const searchQuery = ref('');
const searchError = ref(false);

const liElements = ref<HTMLLIElement[] | null>(null);

const queryTimeout = ref<undefined | number>(undefined);
const mapboxSearchResults = ref<Geocoding[] | null>(null);

function getSearchResults() {
  clearTimeout(queryTimeout.value);

  queryTimeout.value = setTimeout(async () => {
    if (!searchQuery.value) {
      mapboxSearchResults.value = null;
      return;
    }

    try {
      const { data } = await axios.get<Response>(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${
          searchQuery.value
        }.json?access_token=${import.meta.env.VITE_MAPBOX_API_KEY}&types=place`
      );

      mapboxSearchResults.value = data.features;
    } catch {
      searchError.value = true;
    }
  }, 300);
}

function previewCity(placeName: string, geometry: Geometry) {
  const [city, state] = placeName.split(',');

  const [lat, lng] = geometry.coordinates;

  const stateFormatted = state.replaceAll(' ', '');

  router.push({
    name: 'cityView',
    params: {
      city,
      state: stateFormatted,
    },
    query: {
      lat,
      lng,
      preview: 'true',
    },
  });
}

onMounted(() => {
  document.addEventListener('click', () => {
    mapboxSearchResults.value = null;
  });
});

onUnmounted(() => {
  document.removeEventListener('click', () => {});
});
</script>
