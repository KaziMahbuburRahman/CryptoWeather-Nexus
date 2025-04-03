import {
  setError,
  setLoading,
  setWeatherData,
} from "@/features/weather/weatherSlice";
import { weatherService } from "@/services";
import { WeatherData } from "@/types/weather";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const useWeather = (location: string) => {
  const dispatch = useDispatch();
  const [data, setData] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        dispatch(setLoading(true));
        const weatherData = await weatherService.getWeather(location);
        dispatch(setWeatherData([weatherData]));
        setData(weatherData);
      } catch (err) {
        const error =
          err instanceof Error ? err.message : "Failed to fetch weather data";
        dispatch(setError(error));
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (location) {
      fetchWeather();
    }
  }, [location, dispatch]);

  return { data };
};
