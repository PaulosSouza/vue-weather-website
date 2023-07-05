/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OPEN_WEATHER_API_KEY: string;
  readonly VITE_MAPBOX_API_KEY: string;
  readonly VITE_DEFAULT_LOCALE: string;
  readonly VITE_FALLBACK_LOCALE: string;
  readonly VITE_SUPPORTED_LANGUAGES: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
