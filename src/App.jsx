import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import AuthPage from "./pages/auth/AuthPage";
import "./index.css";
import NavBar from "./components/navbar/NavBar";
import PrivateRoute from "./components/providers/PrivateRoute";
import Equipment from "./pages/equipment/Equipment";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify"
import AddNewAdmin from "./pages/addNewAdmin";
import PagesContainer from "./components/PagesContainer";

function App() {
  const location = useLocation();

  return (
    <div className="flex ">
      {location.pathname !== "/auth" && <NavBar />}
      <Routes>
        <Route path="/auth" Component={AuthPage} />
        <Route
          path="/adminHome"
          element={<PrivateRoute element={<PagesContainer><HomePage /></PagesContainer>} />}
        />
        <Route
          path="/equipment"
          element={<PrivateRoute element={<PagesContainer><Equipment /></PagesContainer>} />}
        />
        <Route
          path="/addnewadmin"
          element={<PagesContainer><AddNewAdmin /></PagesContainer>}
        />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
