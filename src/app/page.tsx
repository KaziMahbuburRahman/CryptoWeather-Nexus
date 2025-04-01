import CryptoSection from "@/components/CryptoSection";
import LoadingSpinner from "@/components/LoadingSpinner";
import NewsSection from "@/components/NewsSection";
import WeatherSection from "@/components/WeatherSection";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          CryptoWeather Nexus
        </h1>
        <p className="text-gray-600">
          Your comprehensive dashboard for weather and cryptocurrency insights
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Suspense fallback={<LoadingSpinner />}>
          <WeatherSection />
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <CryptoSection />
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <NewsSection />
        </Suspense>
      </div>
    </div>
  );
}
