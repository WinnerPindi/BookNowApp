// Imports nécessaires depuis react-router-dom et react-redux
import { Link, useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import BookingLogo from "../assets/lit.png"; // Assurez-vous que le chemin d'accès est correct
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slice/authSlice"; // Remplacez "./authSlice" par le chemin d'accès réel à votre authSlice

export function Nav() {
  const [isMobileMenuShown, setIsMobileMenuShown] = useState(false);
  const { user } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // Déclenchez l'action de déconnexion
    navigate("/"); // Redirigez vers la page de connexion après la déconnexion
  };

  return (
    <nav className="p-5 fixed top-0 left-0 w-full z-10 bg-white ">
      <nav className="flex flex-wrap justify-between items-center">
        <Link to="/" className="flex">
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
          <ul className="lg:space-x-8 flex flex-col lg:flex-row bg-gray-50 lg:bg-transparent text-lg border border-gray-100 lg:border-none rounded-lg p-4">
            <li className="px-3 py-2 cursor-pointer hover:bg-gray-100 bg-amber-700 text-white lg:bg-transparent lg:text-amber-700">
              <Link to="/" className="block">
                Accueil
              </Link>
            </li>

            <li className="px-3 py-2 cursor-pointer hover:bg-gray-100">
              <Link to="/bookings" className="block">
                Mes Réservations
              </Link>
            </li>
            {user?.userDetails ? (
              <>
                <li className="px-3 py-2 cursor-pointer hover:bg-gray-100">
                  <Link
                    to={`/userprofil/${user.userDetails._id}`}
                    className="block"
                  >
                    {user.userDetails.lastname}
                  </Link>
                </li>
                <li className="px-3 py-2 cursor-pointer hover:bg-gray-100">
                  <button
                    onClick={handleLogout}
                    className="block text-left w-full"
                  >
                    Déconnexion
                  </button>
                </li>
              </>
            ) : (
              <li className="px-3 py-2 cursor-pointer hover:bg-gray-100">
                <Link to="/login" className="block">
                  Connexion
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
      </nav>
  );
}
