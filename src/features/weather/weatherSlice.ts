import { WeatherData, WeatherState } from "@/types/weather";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: WeatherState = {
  data: [],
  loading: false,
  error: null,
  favorites: [],
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setWeatherData: (state, action: PayloadAction<WeatherData[]>) => {
      state.data = action.payload.map((weather) => ({
        ...weather,
        isFavorite: state.favorites.includes(weather.city),
      }));
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const city = action.payload;
      if (state.favorites.includes(city)) {
        state.favorites = state.favorites.filter((fav) => fav !== city);
      } else {
        state.favorites.push(city);
      }
      state.data = state.data.map((weather) => ({
        ...weather,
        isFavorite: state.favorites.includes(weather.city),
      }));
    },
  },
});

export const { setWeatherData, setLoading, setError, toggleFavorite } =
  weatherSlice.actions;
export default weatherSlice.reducer;
