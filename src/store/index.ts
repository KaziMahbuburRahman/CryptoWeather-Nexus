import cryptoReducer from "@/features/crypto/cryptoSlice";
import newsReducer from "@/features/news/newsSlice";
import weatherReducer from "@/features/weather/weatherSlice";
import {
  loadFavoritesFromStorage,
  saveFavoritesToStorage,
} from "@/utils/localStorage";
import { configureStore } from "@reduxjs/toolkit";

// Load initial favorites from localStorage
const storedFavorites = loadFavoritesFromStorage();

// Create the store with persisted favorites
export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    crypto: cryptoReducer,
    news: newsReducer,
  },
  preloadedState: storedFavorites
    ? {
        crypto: {
          data: [],
          loading: false,
          error: null,
          favorites: storedFavorites.crypto,
        },
        weather: {
          data: [],
          loading: false,
          error: null,
          favorites: storedFavorites.weather,
        },
      }
    : undefined,
});

// Subscribe to store changes to save favorites
store.subscribe(() => {
  saveFavoritesToStorage(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
