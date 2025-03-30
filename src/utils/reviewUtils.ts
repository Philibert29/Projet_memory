import { Card } from "../features/cardSlice";


const levelDelays = [0, 1, 2, 4, 7, 15, 30, 60];

export function shouldReview(card: Card, today = new Date()): boolean {
  const delay = levelDelays[card.level];
  const lastReviewDate = new Date(card.nextReviewDate);
  return today >= lastReviewDate;
}

export function getCardsToReview(cards: Card[]): Card[] {
  const today = new Date();
  return cards.filter((card) => shouldReview(card, today));
}
