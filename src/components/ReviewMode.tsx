import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCardReview, fetchCards } from "../features/cardSlice";
import { AppDispatch, RootState } from "../store/store";
import { motion, AnimatePresence } from "framer-motion";

const ReviewMode: React.FC<{ themeId: string }> = ({ themeId }) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCards(themeId));
  }, [dispatch, themeId]);

  const cards = useSelector((state: RootState) =>
    state.cards.cards.filter((card) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const reviewDate = new Date(card.nextReviewDate);
      reviewDate.setHours(0, 0, 0, 0);

      return (
        card.themeId === themeId &&
        (card.level === 1 || (card.level > 1 && reviewDate <= today))
      );
    })
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [reverseSide, setReverseSide] = useState(false);
  const [firstSideSuccess, setFirstSideSuccess] = useState<boolean | null>(null);

  if (!cards || cards.length === 0) {
    return <p>Aucune carte à réviser pour aujourd’hui ! 🎉</p>;
  }

  const currentCard = cards?.[currentIndex];
  if (!currentCard) return null;

  const handleReview = (success: boolean) => {
    if (!reverseSide) {
      setFirstSideSuccess(success);
      setShowAnswer(false);
      setReverseSide(true);
    } else {
      const finalSuccess = Boolean(firstSideSuccess && success);
      dispatch(updateCardReview(currentCard.id, finalSuccess) as any);
      
      setShowAnswer(false);
      setReverseSide(false);
      setFirstSideSuccess(null);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  if (currentIndex >= cards.length) {
    return <p>Révision terminée ! ✅</p>;
  }

  return (
    <div className="review-mode">
      <h3>📖 Révision ({currentIndex + 1}/{cards.length})</h3>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentCard.id}-${reverseSide ? "back" : "front"}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.3 }}
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            margin: "1rem auto",
            width: "300px",
            cursor: "pointer",
          }}
          onClick={() => setShowAnswer(true)}
        >
          {showAnswer ? (
            <p><strong>{reverseSide ? currentCard.front : currentCard.back}</strong></p>
          ) : (
            <p>???</p>
          )}
        </motion.div>
      </AnimatePresence>

      {!showAnswer && (
        <button onClick={() => setShowAnswer(true)}>Afficher la réponse</button>
      )}

      {showAnswer && (
        <div>
          <button onClick={() => handleReview(true)}>✅ Correct</button>
          <button onClick={() => handleReview(false)}>❌ Incorrect</button>
        </div>
      )}
    </div>
  );
};

export default ReviewMode;
