import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import BookingLogo from "../assets/lit.png";
import { useState } from "react";
import { useSelector } from "react-redux";

export function Nav() {
  const [isMobileMenuShown, setIsMobileMenuShown] = useState(false);
  const { user } = useSelector((state) => state.authSlice);

  return (
    <nav className="flex flex-wrap justify-between items-center">
      {/* Logo et Nom de l'application */}
      <Link to="/" className="flex">
        <img src={BookingLogo} className="h-10 w-10" alt="Booking Logo" />
        <h1 className="p-2 text-xl font-bold">BookNow</h1>
      </Link>
      {/* Burger Button */}
      <button
        onClick={() => setIsMobileMenuShown(!isMobileMenuShown)}
        className="lg:hidden rounded-lg hover:bg-gray-100 p-2 focus:ring-2 focus:ring-gray-200"
      >
        <RxHamburgerMenu size={25} />
      </button>
      {/* Menu */}
      <div
        className={`${
          !isMobileMenuShown && "hidden"
        } w-full lg:w-auto lg:block`}
      >
        <ul className="lg:space-x-8 flex flex-col lg:flex-row bg-gray-50 lg:bg-transparent text-lg border border-gray-100 lg:border-none rounded-lg p-4">
          {/* Ici, les routes sont séparées individuellement en utilisant des balises <li> et <Link> */}
          <li className="px-3 py-2 cursor-pointer hover:bg-gray-100 bg-amber-700 text-white lg:bg-transparent lg:text-amber-700">
            <Link to="/" className="block">
              Accueil
            </Link>
          </li>
          <li className="px-3 py-2 cursor-pointer hover:bg-gray-100">
            <Link to="/logement" className="block">
              Logement
            </Link>
          </li>
          <li className="px-3 py-2 cursor-pointer hover:bg-gray-100">
            <Link to="/reservations" className="block">
              Mes Reservations
            </Link>
          </li>
          {/* Condition pour afficher le nom de l'utilisateur ou le lien de connexion */}
          {user?.userDetails ? (
            <li className="px-3 py-2 cursor-pointer hover:bg-gray-100">
              <Link
                to={`/userprofil/${user.userDetails._id}`}
                className="block"
              >
                {user.userDetails.lastname}
              </Link>
            </li>
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
  );
}
