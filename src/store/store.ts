import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/themeSlice";
import cardReducer from "../features/cardSlice"; 

export const store = configureStore({
  reducer: {
    themes: themeReducer,
    cards: cardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
