import ThemeList from "./components/ThemeList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ReviewPage from "./components/ReviewPage";

function App() {
  return (
    <Router>
      <div>
        <h1>Projet Memory</h1>
        <Routes>
          <Route path="/" element={<ThemeList />} />
          <Route path="/review/:themeId" element={<ReviewPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
