import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store/store";
import { addThemeToDB, getThemesFromDB } from "../services/bddCRUD";

interface Theme {
  id: string;
  name: string;
}

interface ThemeState {
  themes: Theme[];
}

const initialState: ThemeState = {
  themes: [],
};

const themeSlice = createSlice({
  name: "themes",
  initialState,
  reducers: {
    setThemes: (state, action: PayloadAction<Theme[]>) => {
      state.themes = action.payload;
    },
    addTheme: (state, action: PayloadAction<Theme>) => {
      state.themes.push(action.payload);
    },
  },
});

export const { setThemes, addTheme } = themeSlice.actions;

export const fetchThemes = () => async (dispatch: AppDispatch) => {
  const storedThemes = await getThemesFromDB();
  dispatch(setThemes(storedThemes));
};

export const addNewTheme = (name: string) => async (dispatch: AppDispatch) => {
  const newTheme = { id: crypto.randomUUID(), name };
  await addThemeToDB(name);
  dispatch(addTheme(newTheme));
};

export const selectThemes = (state: RootState) => state.themes.themes;

export default themeSlice.reducer;
