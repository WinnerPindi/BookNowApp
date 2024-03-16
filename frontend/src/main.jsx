import "@fontsource-variable/nunito-sans";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { Accueil } from "./pages/Accueil.jsx";
import { Login } from "./pages/Login.jsx";
import { SingUp } from "./pages/SignUp.jsx";
import { Provider } from "react-redux";
import store from "./redux/store/index.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<Accueil />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SingUp />} />
          </Route>
        </Routes>
      </Provider>
      <ToastContainer/>
    </BrowserRouter>
  </React.StrictMode>
);
