import { RootState } from "@/store";

const STORAGE_KEY = "cryptoweather-favorites";

export const loadFavoritesFromStorage = () => {
  if (typeof window === "undefined") return null;

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;

  try {
    return JSON.parse(stored);
  } catch (error) {
    console.error("Error loading favorites from storage:", error);
    return null;
  }
};

export const saveFavoritesToStorage = (state: RootState) => {
  if (typeof window === "undefined") return;

  try {
    const favorites = {
      crypto: state.crypto.favorites,
      weather: state.weather.favorites,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error("Error saving favorites to storage:", error);
  }
};
