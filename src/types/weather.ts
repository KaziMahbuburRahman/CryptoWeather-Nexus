export interface WeatherData {
  temperature: number;
  condition: string;
  location: string;
}

export interface WeatherState {
  data: WeatherData[];
  loading: boolean;
  error: string | null;
}
