export interface WeatherData {
  city: string;
  temperature: number;
  humidity: number;
  conditions: string;
  icon: string;
  windSpeed: number;
  feelsLike: number;
  isFavorite?: boolean;
}

export interface WeatherState {
  data: WeatherData[];
  loading: boolean;
  error: string | null;
  favorites: string[];
}
