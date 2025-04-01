import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
}

interface CryptoState {
  data: CryptoData[];
  loading: boolean;
  error: string | null;
}

const initialState: CryptoState = {
  data: [],
  loading: false,
  error: null,
};

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    setCryptoData: (state, action: PayloadAction<CryptoData[]>) => {
      state.data = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setCryptoData, setLoading, setError } = cryptoSlice.actions;
export default cryptoSlice.reducer;
