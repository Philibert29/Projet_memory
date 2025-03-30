import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCards, selectCards, addNewCard, deleteCard } from "../features/cardSlice";
import { AppDispatch, RootState } from "../store/store";
import "./CardList.css";

interface CardListProps {
  themeId: string;
}

const CardList: React.FC<CardListProps> = ({ themeId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const cards = useSelector((state: RootState) => selectCards(state).filter((card) => card.themeId === themeId));

  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  useEffect(() => {
    if (themeId) {
      console.log("Chargement des cartes du thème :", themeId);
      dispatch(fetchCards(themeId)); 
    }
  }, [dispatch, themeId]);

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (front.trim() === "" || back.trim() === "") return;
    console.log("Ajout d’une nouvelle carte au thème :", themeId);
    dispatch(addNewCard(themeId, front, back));
    setFront("");
    setBack("");
    setTimeout(() => dispatch(fetchCards(themeId)), 500);
  };

  return (
    <div className="card-container">
      <h3>📌 Cartes du thème</h3>

      <form className="card-form" onSubmit={handleAddCard}>
        <input type="text" placeholder="Face avant" value={front} onChange={(e) => setFront(e.target.value)} />
        <input type="text" placeholder="Face arrière" value={back} onChange={(e) => setBack(e.target.value)} />
        <button type="submit">➕ Ajouter</button>
      </form>

      <div className="card-list">
        {cards.length > 0 ? (
            <ul className="card-list">
                {cards.map((card) => (
                   <li key={card.id} className="card">
                     <div className="card-content">
                        <span>{card.front} - {card.back}</span>
                        <button className="delete-btn" onClick={() => dispatch(deleteCard(card.id, themeId))}>🗑️</button>
                     </div>
                   </li>
                 ))}
            </ul>
            ) :
        (
          <p>Aucune carte pour ce thème.</p>
        )}
      </div>
    </div>
    
  );
};

export default CardList;
