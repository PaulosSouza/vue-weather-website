import type { Weather } from './Weather';

export interface Location {
  id: string;
  state: string;
  city: string;
  coords: {
    lat: number;
    lng: number;
  };
}

export interface WeatherLocation extends Location {
  weather: Weather;
}
