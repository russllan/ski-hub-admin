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
import CreateBase from "./pages/createBase";
import ToursPage from "./pages/tours";
import CreateTour from "./pages/createTour";
import BasesPayments from "./pages/basesPayments";
import BookedProductPage from "./pages/bookedtour";
import BookedToursPage from "./pages/bookedTours";

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
          path="/bookedtour"
          element={<PrivateRoute element={<PagesContainer><BookedProductPage /></PagesContainer>} />}
        />
         <Route
          path="/bookedTours"
          element={<PrivateRoute element={<PagesContainer><BookedToursPage /></PagesContainer>} />}
        />
        <Route
          path="/adminHome/create"
          element={<PrivateRoute element={<PagesContainer><CreateBase /></PagesContainer>} />}
        />
        <Route
          path="/equipment"
          element={<PrivateRoute element={<PagesContainer><Equipment /></PagesContainer>} />}
        />
        <Route
          path="/tour"
          element={<PrivateRoute element={<PagesContainer><ToursPage /></PagesContainer>} />}
        />
        <Route
          path="/tour/create"
          element={<PrivateRoute element={<PagesContainer><CreateTour /></PagesContainer>} />}
        />
        <Route
          path="/addnewadmin"
          element={<PagesContainer><AddNewAdmin /></PagesContainer>}
        />
        <Route
          path="/basespayments"
          element={<PagesContainer><BasesPayments /></PagesContainer>}
        />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
