import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { addNewTheme, fetchThemes } from "../features/themeSlice";
import CardList from "./CardList";
import ReviewMode from "../components/ReviewMode";
import "./ThemeList.css";
import { useNavigate } from "react-router-dom";
import { scheduleDailyNotification } from "../services/notification";
import { exportThemeToJSON, importThemeFromJSON } from "../services/bddCRUD";


const ThemeList: React.FC = () => {
  const themes = useSelector((state: RootState) => state.themes.themes);
  const dispatch = useDispatch<AppDispatch>();
  const [themeName, setThemeName] = useState("");
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [reviewThemeId, setReviewThemeId] = useState<string | null>(null);
  const navigate = useNavigate();
  const [notificationHour, setNotificationHour] = useState<string>("20");
  const [notificationMinute, setNotificationMinute] = useState<string>("00");
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    dispatch(fetchThemes());
  }, [dispatch]);

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        console.log("Notification permission:", permission);
      });
    }
  }, []);
  
  useEffect(() => {
    const enabled = localStorage.getItem("notificationsEnabled");
    const hour = localStorage.getItem("notificationHour");
    const minute = localStorage.getItem("notificationMinute");
  
    if (enabled === "true" && hour && minute) {
      setNotificationsEnabled(true);
      setNotificationHour(hour);
      setNotificationMinute(minute);
      if (Notification.permission === "granted") {
        scheduleDailyNotification(parseInt(hour), parseInt(minute));
      }
    }
  }, []);

  const handleEnableNotification = () => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          saveAndScheduleNotification();
        } else {
          alert("Notifications refusées !");
        }
      });
    } else {
      saveAndScheduleNotification();
    }
  };
  
  const saveAndScheduleNotification = () => {
    localStorage.setItem("notificationsEnabled", "true");
    localStorage.setItem("notificationHour", notificationHour);
    localStorage.setItem("notificationMinute", notificationMinute);
    setNotificationsEnabled(true);
    scheduleDailyNotification(parseInt(notificationHour), parseInt(notificationMinute));
  };
  
  const handleDisableNotification = () => {
    localStorage.setItem("notificationsEnabled", "false");
    setNotificationsEnabled(false);
    alert("Notification désactivée !");
  };
  

  const handleAddTheme = () => {
    if (themeName.trim() !== "") {
      dispatch(addNewTheme(themeName));
      setThemeName("");
    }
  };

  return (
    <div className="container">
      <h2>📚 Thèmes de Révision</h2>

      <div className="theme-list">
        <input
          type="text"
          value={themeName}
          onChange={(e) => setThemeName(e.target.value)}
          placeholder="Nom du thème"
        />
        <button onClick={handleAddTheme}>➕ Ajouter</button>
      </div>

      <ul className="theme-buttons">
        {themes.map((theme) => (
          <li key={theme.id}>
            <button onClick={() => setSelectedTheme(theme.id)}>
              {theme.name}
            </button>
            <button
              className="review-button"
              onClick={() => navigate(`/review/${theme.id}`)}
            >
              🧠 Réviser
            </button>
            <button onClick={() => exportThemeToJSON(theme.id)}>📤 Exporter</button>

          </li>
        ))}
      </ul>

      
      <div className="notification-settings">
        <h4>🔔 Rappel quotidien</h4>
          <label>Heure :</label>
            <input
              type="number"
              min="0"
              max="23"
              value={notificationHour}
              onChange={(e) => setNotificationHour(e.target.value)}
            />
          <label>Minutes :</label>
            <input
              type="number"
              min="0"
              max="59"
              value={notificationMinute}
              onChange={(e) => setNotificationMinute(e.target.value)}
            />
        {!notificationsEnabled ? (
        <button onClick={handleEnableNotification}>Activer le rappel</button>
        ) : (
        <button onClick={handleDisableNotification}>Désactiver le rappel</button>
        )}
        </div>
        <input
          type="file"
          accept=".json"
          onChange={(e) => {
          if (e.target.files?.[0]) {
          importThemeFromJSON(e.target.files[0]);
          }
        }}
        />



      {selectedTheme && (
        <div>
          <CardList themeId={selectedTheme} />
        </div>
      )}

      {reviewThemeId && (
        <div className="review-container">
          <ReviewMode themeId={reviewThemeId} />
          <button onClick={() => setReviewThemeId(null)}>❌ Fermer</button>
        </div>
      )}
    </div>
  );
};

export default ThemeList;
