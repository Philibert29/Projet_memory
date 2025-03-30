import dbPromise from "./bdd";
import { Card } from "../features/cardSlice";

export async function addThemeToDB(name: string) {
  const db = await dbPromise;
  const id = crypto.randomUUID();
  await db.add("themes", { id, name });
  console.log(`Thème ajouté avec ID: ${id}`);
  return id;
}


export async function getThemesFromDB() {
  const db = await dbPromise;
  const themes = await db.getAll("themes");
  console.log("Thèmes récupérés :", themes);
  return themes;
}


export async function deleteTheme(id: string) {
  const db = await dbPromise;
  await db.delete("themes", id);
  await deleteCardsByTheme(id);
  console.log(`Thème supprimé avec ID: ${id}`);
}


export async function addCardToDB(themeId: string, front: string, back: string, card: Card) {
  const db = await dbPromise;
  await db.add("cards", card); // On enregistre directement l'objet card
  console.log(`Carte ajoutée avec ID: ${card.id} dans le thème ${themeId}`);
  return card.id;
}



export async function getCardsFromDB(themeId: string) {
  const db = await dbPromise;
  const cards = await db.getAllFromIndex("cards", "themeId", themeId);
  console.log(`Cartes récupérées pour le thème ${themeId}:`, cards);
  return cards;
}



export async function updateCardInDB(id: string, front: string, back: string) {
  const db = await dbPromise;
  await db.put("cards", { id, front, back });
  console.log(`Carte mise à jour: ${id}`);
}


export async function deleteCardFromDB(id: string) {
  const db = await dbPromise;
  await db.delete("cards", id);
  console.log(`Carte supprimée avec ID: ${id}`);
}


export async function deleteCardsByTheme(themeId: string) {
  const db = await dbPromise;
  const cards = await getCardsFromDB(themeId);
  for (const card of cards) {
    await db.delete("cards", card.id);
  }
  console.log(`Toutes les cartes du thème ${themeId} ont été supprimées.`);
}


export async function updateCardReviewInDB(id: string, updates: Partial<Card>) {
  const db = await dbPromise;
  const card = await db.get("cards", id);
  if (card) {
    await db.put("cards", { ...card, ...updates });
    console.log(`Carte mise à jour: ${id}`);
  }
}


export async function exportThemeToJSON(themeId: string) {
  const cards = await getCardsFromDB(themeId);
  const dataStr = JSON.stringify(cards, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `theme-${themeId}.json`;
  link.click();
}


export async function importThemeFromJSON(file: File) {
  const text = await file.text();
  const cards: Card[] = JSON.parse(text);
  const db = await dbPromise;

  for (const card of cards) {

    const newId = crypto.randomUUID();
    await db.add("cards", { ...card, id: newId });
  }

  alert("Thème importé avec succès !");
}


