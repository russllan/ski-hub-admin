import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import AuthPage from "./pages/auth/AuthPage";
import "./index.css";
import NavBar from "./components/navbar/NavBar";
import PrivateRoute from "./components/providers/PrivateRoute";
import Equipment from "./pages/equipment/Equipment";

function App() {
  const location = useLocation();

  return (
    <div className="flex gap-7">
      {location.pathname !== "/auth" && <NavBar />}
      <Routes>
        <Route path="/auth" Component={AuthPage} />
        <Route
          path="/adminHome"
          element={<PrivateRoute element={<HomePage />} />}
        />
        <Route
          path="/equipment"
          element={<PrivateRoute element={<Equipment />} />}
        />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </div>
  );
}

export default App;
