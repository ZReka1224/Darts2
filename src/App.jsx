import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { DartsListPage } from "./pages/DartsListPage";
import { DartsSinglePage } from "./pages/DartsSinglePage";
import "./App.css";

export function App() {
  return (
    <BrowserRouter>
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Dartsozók
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/new-darts" className="nav-link">
                Új dartsozó
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<DartsListPage />} />
       <Route path="/darts/:dartsId" element={<DartsSinglePage />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;