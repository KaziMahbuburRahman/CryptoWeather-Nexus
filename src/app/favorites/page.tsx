import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Favorites - CryptoWeather Nexus",
  description: "View your favorite cryptocurrencies and weather locations",
};

export default function FavoritesPage() {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-900">Your Favorites</h2>

      {/* Cryptocurrencies Section */}
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Starred Cryptocurrencies
        </h3>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500">No starred cryptocurrencies yet.</p>
        </div>
      </section>

      {/* Weather Locations Section */}
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Starred Weather Locations
        </h3>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500">No starred weather locations yet.</p>
        </div>
      </section>
    </div>
  );
}
