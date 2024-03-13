import "@fontsource-variable/nunito-sans";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { Accueil } from "./pages/Accueil.jsx";
import { Login } from "./pages/Login.jsx";
import { SingUp } from "./pages/SignUp.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}>
          <Route path="/" element={<Accueil/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SingUp/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
