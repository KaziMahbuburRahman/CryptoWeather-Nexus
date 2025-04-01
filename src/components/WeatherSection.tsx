"use client";

import { WeatherData } from "@/types/weather";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const cities = ["New York", "London", "Tokyo"];

export default function WeatherSection() {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // TODO: Replace with actual API call
        const mockData: WeatherData[] = cities.map((city) => ({
          city,
          temperature: Math.round(Math.random() * 30),
          humidity: Math.round(Math.random() * 100),
          conditions: "Sunny",
          icon: "01d",
          windSpeed: Math.round(Math.random() * 20),
          feelsLike: Math.round(Math.random() * 30),
        }));
        setWeatherData(mockData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch weather data");
        setLoading(false);
      }
    };

    fetchWeatherData();
    const interval = setInterval(fetchWeatherData, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

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
                <h3 className="text-lg font-medium text-gray-900">
                  {data.city}
                </h3>
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
