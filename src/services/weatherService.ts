import { WeatherData } from "@/types/weather";
import api from "./api";

export const weatherService = {
  async getWeather(location: string): Promise<WeatherData> {
    const response = await api.get(
      `/weather?location=${encodeURIComponent(location)}`
    );
    const data = response.data;
    return {
      city: location,
      temperature: data.temperature,
      humidity: data.humidity,
      conditions: data.condition,
      icon: data.icon || "01d",
      windSpeed: data.windSpeed || 0,
      feelsLike: data.feelsLike || data.temperature,
    };
  },

  async getForecast(location: string): Promise<WeatherData[]> {
    const response = await api.get(
      `/weather/forecast?location=${encodeURIComponent(location)}`
    );
    return response.data.map((data: any) => ({
      city: location,
      temperature: data.temperature,
      humidity: data.humidity,
      conditions: data.condition,
      icon: data.icon || "01d",
      windSpeed: data.windSpeed || 0,
      feelsLike: data.feelsLike || data.temperature,
    }));
  },
};
