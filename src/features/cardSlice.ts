import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store/store";
import { addCardToDB, deleteCardFromDB, getCardsFromDB, updateCardInDB, updateCardReviewInDB } from "../services/bddCRUD";

export interface Card {
  id: string;
  themeId: string;
  front: string;
  back: string;
  level: number;
  nextReviewDate: string; 
}

interface CardState {
  cards: Card[];
}

const initialState: CardState = {
  cards: [],
};

const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setCards: (state, action: PayloadAction<Card[]>) => {
      state.cards = action.payload;
    },
    addCard: (state, action: PayloadAction<Card>) => {
      state.cards.push(action.payload);
    },
    removeCard: (state, action: PayloadAction<string>) => {
      state.cards = state.cards.filter((card) => card.id !== action.payload);
    },
    setUpdatedCard: (state, action: PayloadAction<Card>) => { 
      const index = state.cards.findIndex((card) => card.id === action.payload.id);
      if (index !== -1) state.cards[index] = action.payload;
    },
    updateCardLevel: (state, action: PayloadAction<{ id: string; level: number; nextReviewDate: string }>) => {
      const card = state.cards.find((c) => c.id === action.payload.id);
      if (card) {
        card.level = action.payload.level;
        card.nextReviewDate = action.payload.nextReviewDate;
      }
    },
  },
  },
);

export const { setCards, addCard, removeCard, setUpdatedCard, updateCardLevel } = cardSlice.actions;


export const fetchCards = (themeId: string) => async (dispatch: AppDispatch) => {
  console.log(`Récupération des cartes du thème ${themeId}`);
  const storedCards = await getCardsFromDB(themeId);
  dispatch(setCards(storedCards));
};


export const addNewCard = (themeId: string, front: string, back: string) => async (dispatch: AppDispatch) => {
  console.log(`Ajout d'une carte au thème ${themeId}`);
  const newCard: Card = { 
    id: crypto.randomUUID(), 
    themeId, 
    front, 
    back, 
    level: 1, 
    nextReviewDate: new Date().toISOString()
};

  await addCardToDB(themeId, front, back, newCard);
  dispatch(fetchCards(themeId));
};



export const deleteCard = (id: string, themeId: string) => async (dispatch: AppDispatch) => {
  await deleteCardFromDB(id);
  dispatch(fetchCards(themeId));
};


export const updateCard = (id: string, front: string, back: string, themeId: string) => async (dispatch: AppDispatch) => {
  await updateCardInDB(id, front, back);
  dispatch(fetchCards(themeId));
};

export const updateCardReview = (id: string, success: boolean) => 
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const card = state.cards.cards.find((card) => card.id === id);

    if (!card) return;

    const newLevel = success ? Math.min(7, card.level + 1) : Math.max(1, card.level - 2);
    const nextReviewDate = calculateNextReviewDate(newLevel);

    dispatch(updateCardLevel({
      id,
      level: newLevel,
      nextReviewDate,
    }));

    await updateCardReviewInDB(id, { level: newLevel, nextReviewDate });
};

function calculateNextReviewDate(level: number): string {
  const now = new Date();
  const intervals = [1, 2, 4, 7, 15, 30, 60]; 
  now.setDate(now.getDate() + intervals[level - 1]);
  return now.toISOString();
}

export const selectCardsForReview = (state: RootState) => {
  const today = new Date();
  return state.cards.cards.filter((card) => new Date(card.nextReviewDate) <= today);
};

export const selectCards = (state: RootState) => state.cards.cards;
export default cardSlice.reducer;
