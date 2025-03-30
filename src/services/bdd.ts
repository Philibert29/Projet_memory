import { openDB } from "idb";

const dbPromise = openDB("ProjetMemoryDB", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("themes")) {
      db.createObjectStore("themes", { keyPath: "id" });
    }
    if (!db.objectStoreNames.contains("cards")) {
      const store = db.createObjectStore("cards", { keyPath: "id", autoIncrement: true });
      store.createIndex("themeId", "themeId", { unique: false });
    }
  },
});

export default dbPromise;
