import {BrowserRouter, Route, Routes} from "react-router-dom";
import RegisterForm from "./pages/RegisterForm";
import Login from "./pages/Login";
import HomePage from "./pages/user/HomePage";
import Dashboard from "./pages/admin/Dashboard";
import Demmy from "./components/user/Demmy";
import UserLayout from "./Layouts/UserLayout";
import ProtectedRoute from "./utils/ProtectedRoute";
import {useDispatch} from "react-redux";
import axios from "axios";
import {useEffect} from "react";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {setUser} from "./redux/authSlice";
import ProtectedAdmin from "./utils/ProtectedAdmin";
import ProtectedUser from "./utils/ProtectedUser";
import AdminLayout from "./Layouts/AdminLayout";
import AddUser from "./pages/admin/AddUser";
import ViewUserDetails from "./pages/admin/ViewUserDetails";

axios.defaults.withCredentials = true;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<ProtectedUser />}>
            <Route path="/" element={<UserLayout />}>
              <Route index element={<HomePage />} />
              <Route path="/demmy" element={<Demmy />} />
            </Route>
          </Route>
          <Route>
            <Route element={<ProtectedAdmin />}>
              <Route path="/dashboard" element={<AdminLayout/>}>
                <Route index element={<Dashboard />} />
                <Route path="addNew" element={<AddUser/>} />
                <Route path="viewUser/:id" element={<ViewUserDetails/>}/>
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
