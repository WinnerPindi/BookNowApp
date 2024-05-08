import { Link, useNavigate, useLocation } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import BookingLogo from "../assets/lit.png";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slice/authSlice";

export function Nav() {
  const [isMobileMenuShown, setIsMobileMenuShown] = useState(false);
  const { user } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="p-5 fixed top-0 left-0 w-full z-10 bg-white border-b border-gray-200">
      <nav className="flex flex-wrap justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src={BookingLogo} alt="Booking Logo" className="h-10 w-10" />
          <h1 className="p-2 text-xl font-bold">BookNow</h1>
        </Link>
        <button
          onClick={() => setIsMobileMenuShown(!isMobileMenuShown)}
          className="lg:hidden rounded-lg hover:bg-gray-100 p-2 focus:ring-2 focus:ring-gray-200"
        >
          <RxHamburgerMenu size={25} />
        </button>
        <div
          className={`${
            !isMobileMenuShown && "hidden"
          } w-full lg:w-auto lg:block`}
        >
          <ul className="lg:space-x-8 flex flex-col lg:flex-row bg-gray-50 lg:bg-transparent text-lg rounded-lg border border-gray-100 lg:border-none p-4">
            <li className="px-3 py-2 hover:bg-gray-100">
              <Link
                to="/"
                className={`block ${
                  location.pathname === "/" && "text-amber-700 font-bold"
                }`}
              >
                Accueil
              </Link>
              <div
                className={`${
                  location.pathname === "/" ? "bg-amber-700" : "bg-transparent"
                } h-1 w-full`}
              ></div>
            </li>
            <li className="px-3 py-2 hover:bg-gray-100">
              <Link
                to="/bookings"
                className={`block ${
                  location.pathname === "/bookings" && "text-amber-700 font-bold"
                }`}
              >
                Mes Réservations
              </Link>
              <div
                className={`${
                  location.pathname === "/bookings" ? "bg-amber-700" : "bg-transparent"
                } h-1 w-full`}
              ></div>
            </li>
            {user?.userDetails ? (
              <>
                <li className="px-3 py-2 hover:bg-gray-100">
                  <Link
                    to={`/userprofil/${user.userDetails._id}`}
                    className={`block ${
                      location.pathname.startsWith("/userprofil") &&
                      "text-amber-700 font-bold"
                    }`}
                  >
                    {user.userDetails.lastname}
                  </Link>
                  <div
                    className={`${
                      location.pathname.startsWith("/userprofil")
                        ? "bg-amber-700"
                        : "bg-transparent"
                    } h-1 w-full`}
                  ></div>
                </li>
                <li className="px-3 py-2 hover:bg-gray-100">
                  <button onClick={handleLogout} className="block text-left w-full">
                    Déconnexion
                  </button>
                  <div className="bg-transparent h-1 w-full"></div>
                </li>
              </>
            ) : (
              <li className="px-3 py-2 hover:bg-gray-100">
                <Link
                  to="/login"
                  className={`block ${
                    location.pathname === "/login" && "text-amber-700 font-bold"
                  }`}
                >
                  Connexion
                </Link>
                <div
                  className={`${
                    location.pathname === "/login" ? "bg-amber-700" : "bg-transparent"
                  } h-1 w-full`}
                ></div>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </nav>
  );
}
