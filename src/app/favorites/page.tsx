"use client";

import CryptoSection from "@/components/CryptoSection";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function FavoritesPage() {
  const [favoriteCryptos, setFavoriteCryptos] = useState<Array<{id: string, name: string, symbol: string}>>([]);
  const weatherFavorites = useSelector(
    (state: RootState) => state.weather.favorites
  );
  const weatherData = useSelector((state: RootState) => state.weather.data);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCryptos = localStorage.getItem('cryptoFavorites');
      const cryptoIds = savedCryptos ? JSON.parse(savedCryptos) : [];
      
      // For now just using default mapping, in production you'd want to fetch full crypto details
      const cryptoDetails = cryptoIds.map((id: string) => {
        switch(id) {
          case 'bitcoin':
            return { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' };
          case 'ethereum':
            return { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' };
          case 'cardano':
            return { id: 'cardano', name: 'Cardano', symbol: 'ADA' };
          default:
            return { id, name: id, symbol: id.toUpperCase() };
        }
      });
      
      setFavoriteCryptos(cryptoDetails);
    }
  }, []);

  const favoriteWeatherLocations = weatherData.filter(
    (weather) => weather.isFavorite
  );

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-900">Your Favorites</h2>

      {/* Cryptocurrencies Section */}
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Starred Cryptocurrencies
        </h3>
        <CryptoSection cryptos={favoriteCryptos} />
      </section>

      {/* Weather Locations Section */}
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Starred Weather Locations
        </h3>
        <div className="grid gap-4">
          {favoriteWeatherLocations.length > 0 ? (
            favoriteWeatherLocations.map((weather) => (
              <motion.div
                key={weather.city}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">
                      {weather.city}
                    </h4>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {weather.temperature}°C
                    </p>
                    <p className="text-gray-600 mt-1">{weather.conditions}</p>
                  </div>
                  <img
                    src={`http://openweathermap.org/img/w/${weather.icon}.png`}
                    alt={weather.conditions}
                    className="w-16 h-16"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-gray-600">
                  <div>
                    <p>Humidity: {weather.humidity}%</p>
                    <p>Wind: {weather.windSpeed} km/h</p>
                  </div>
                  <div>
                    <p>Feels like: {weather.feelsLike}°C</p>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="card bg-gray-50 p-6">
              <p className="text-gray-500">No starred weather locations yet.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
