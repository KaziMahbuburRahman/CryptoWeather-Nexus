"use client";

import {
  setWeatherData,
  toggleFavorite,
} from "@/features/weather/weatherSlice";
import { RootState } from "@/store";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const cities = ["New York", "London", "Tokyo"];

export default function WeatherSection() {
  const dispatch = useDispatch();
  const weatherData = useSelector((state: RootState) => state.weather.data);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const weatherPromises = cities.map(async (city) => {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}&units=metric`
          );
          if (!response.ok) {
            throw new Error(`Failed to fetch weather for ${city}`);
          }
          const data = await response.json();
          return {
            city,
            temperature: Math.round(data.main.temp),
            humidity: data.main.humidity,
            conditions: data.weather[0].main,
            icon: data.weather[0].icon,
            windSpeed: Math.round(data.wind.speed),
            feelsLike: Math.round(data.main.feels_like),
          };
        });

        const data = await Promise.all(weatherPromises);
        dispatch(setWeatherData(data));
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch weather data");
        setLoading(false);
      }
    };

    fetchWeatherData();
    const interval = setInterval(fetchWeatherData, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, [dispatch]);

  const handleToggleFavorite = (city: string) => {
    dispatch(toggleFavorite(city));
  };

  if (loading) return <div className="card animate-pulse h-64"></div>;
  if (error)
    return <div className="card bg-red-50 text-red-500 p-4">{error}</div>;

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-900">Weather Updates</h2>
      <div className="grid gap-4">
        {weatherData.map((data, index) => (
          <motion.div
            key={data.city}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-medium text-gray-900">
                    {data.city}
                  </h3>
                  <button
                    onClick={() => handleToggleFavorite(data.city)}
                    className="text-yellow-500 hover:text-yellow-600 transition-colors"
                  >
                    {data.isFavorite ? "★" : "☆"}
                  </button>
                </div>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {data.temperature}°C
                </p>
                <p className="text-gray-600 mt-1">{data.conditions}</p>
              </div>
              <img
                src={`http://openweathermap.org/img/w/${data.icon}.png`}
                alt={data.conditions}
                className="w-16 h-16"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-gray-600">
              <div>
                <p>Humidity: {data.humidity}%</p>
                <p>Wind: {data.windSpeed} km/h</p>
              </div>
              <div>
                <p>Feels like: {data.feelsLike}°C</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
