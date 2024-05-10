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
import UserProfil from "./pages/UserProfil.jsx";
import { UserProfileEdit } from "./pages/UserProfileEdit.jsx";
import RoomDetails from "./pages/RoomDetails.jsx";
import UserBookings from "./pages/UserBookings.jsx";
import CreateBooking from "./pages/CreateBooking.jsx"
import AddUserReview from "./pages/AddUserReview.jsx";
import { SearchPage } from "./pages/SearchPage.jsx";
import BookingHistory from "./pages/BookingHistory.jsx";
import UpdateBooking from "./pages/UpdateBooking.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<Accueil />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SingUp />} />
            <Route path="/userprofil/:id" element={<UserProfil />} />
            <Route path="/edituser/:id" element={<UserProfileEdit/>} />
            <Route path="/rooms/:id" element={<RoomDetails/>} />
            <Route path="/create-booking" element={<CreateBooking/>} />
            <Route path="/bookings" element={<UserBookings/>} />
            <Route path="/update-booking" element={<UpdateBooking/>} />
            <Route path="/history" element={<BookingHistory/>}/>
            <Route path="/reviews/new/:roomId" element={<AddUserReview/>} />
            <Route path="/search" element={<SearchPage/>} />
          </Route>
        </Routes>
      </Provider>
      <ToastContainer/>
    </BrowserRouter>
  </React.StrictMode>
);
