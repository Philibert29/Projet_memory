import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReviewMode from "./ReviewMode";
import "./ReviewPage.css";

const ReviewPage: React.FC = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const navigate = useNavigate();

  if (!themeId) {
    return (
      <div className="review-page">
        <p>❌ Thème introuvable.</p>
        <button onClick={() => navigate("/")}>Retour à l'accueil</button>
      </div>
    );
  }

  return (
    <div className="review-page">
      <h2>🧠 Session de Révision</h2>
      <ReviewMode themeId={themeId} />
      <div style={{ marginTop: "1rem" }}>
        <button onClick={() => navigate("/")}>⬅️ Retour aux thèmes</button>
      </div>
    </div>
  );
};

export default ReviewPage;
