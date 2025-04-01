import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

interface NewsState {
  articles: NewsArticle[];
  loading: boolean;
  error: string | null;
}

const initialState: NewsState = {
  articles: [],
  loading: false,
  error: null,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setNewsData: (state, action: PayloadAction<NewsArticle[]>) => {
      state.articles = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setNewsData, setLoading, setError } = newsSlice.actions;
export default newsSlice.reducer;
