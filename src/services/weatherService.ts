import api from "./api";

export interface WeatherData {
  temperature: number;
  condition: string;
  location: string;
}

export const weatherService = {
  async getWeather(location: string): Promise<WeatherData> {
    const response = await api.get(
      `/weather?location=${encodeURIComponent(location)}`
    );
    return response.data;
  },

  async getForecast(location: string): Promise<WeatherData[]> {
    const response = await api.get(
      `/weather/forecast?location=${encodeURIComponent(location)}`
    );
    return response.data;
  },
};
