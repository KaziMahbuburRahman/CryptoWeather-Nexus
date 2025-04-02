import { Metadata } from "next";
import FavoritesPage from "./page";

export const metadata: Metadata = {
  title: "Favorites - CryptoWeather Nexus",
  description: "View your favorite cryptocurrencies and weather locations",
};

export default function FavoritesLayout() {
  return <FavoritesPage />;
}
