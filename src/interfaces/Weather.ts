export interface Weather {
  dt: number;
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  main: {
    temp: number;
    feels_like: number;
    temp_max: number;
    temp_min: number;
  };
}

export interface ForecastHourly {
  cod: string;
  message: number;
  cnt: number;
  list: Weather[];
}
