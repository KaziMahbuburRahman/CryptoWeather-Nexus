import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WeatherState {
  temperature: number | null;
  condition: string | null;
  location: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  temperature: null,
  condition: null,
  location: null,
  loading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setWeatherData: (
      state,
      action: PayloadAction<{
        temperature: number;
        condition: string;
        location: string;
      }>
    ) => {
      state.temperature = action.payload.temperature;
      state.condition = action.payload.condition;
      state.location = action.payload.location;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setWeatherData, setLoading, setError } = weatherSlice.actions;
export default weatherSlice.reducer;
