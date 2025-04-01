import cryptoReducer from "@/features/crypto/cryptoSlice";
import newsReducer from "@/features/news/newsSlice";
import weatherReducer from "@/features/weather/weatherSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    crypto: cryptoReducer,
    news: newsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
