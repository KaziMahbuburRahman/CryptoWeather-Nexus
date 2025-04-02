import { CryptoData, CryptoState } from "@/types/crypto";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CryptoState = {
  data: [],
  loading: false,
  error: null,
  favorites: [],
};

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    setCryptoData: (state, action: PayloadAction<CryptoData[]>) => {
      state.data = action.payload.map((crypto) => ({
        ...crypto,
        isFavorite: state.favorites.includes(crypto.id),
      }));
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter((fav) => fav !== id);
      } else {
        state.favorites.push(id);
      }
      state.data = state.data.map((crypto) => ({
        ...crypto,
        isFavorite: state.favorites.includes(crypto.id),
      }));
    },
  },
});

export const { setCryptoData, setLoading, setError, toggleFavorite } =
  cryptoSlice.actions;
export default cryptoSlice.reducer;
