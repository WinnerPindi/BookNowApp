import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import BookingLogo from "../assets/lit.png";
import { useState } from "react";

// Mise à jour pour inclure les routes sous forme d'objets contenant le nom et le chemin
const ROUTES = [
  { name: "Accueil", path: "/" },
  { name: "Logement", path: "/logement" }, // Vous devez ajouter cette route dans vos <Routes> si ce n'est pas déjà fait
  { name: "Mes Reservations", path: "/reservations" }, // Ajoutez cette route également
  { name: "Connexion", path: "/login" },
];

export function Nav() {
  const [isMobileMenuShown, setIsMobileMenuShown] = useState(false);

  return (
    <nav className="flex flex-wrap justify-between items-center">
      {/* Logo et Nom de l'application */}
      <Link to="/" className="flex">
        <img src={BookingLogo} className="h-10 w-10" alt="Booking Logo"/>
        <h1 className="p-2 text-xl font-bold">BookNow</h1>
      </Link>
      {/* Burger Button */}
      <button onClick={() => setIsMobileMenuShown(!isMobileMenuShown)} className="lg:hidden rounded-lg hover:bg-gray-100 p-2 focus:ring-2 focus:ring-gray-200">
        <RxHamburgerMenu size={25} />
      </button>
      {/* Menu */}
      <div className={`${!isMobileMenuShown && "hidden"} w-full lg:w-auto lg:block`}>
        <ul className="lg:space-x-8 flex flex-col lg:flex-row bg-gray-50 lg:bg-transparent text-lg border border-gray-100 lg:border-none rounded-lg p-4">
          {ROUTES.map((route) => (
            <li key={route.name} className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${route.path === "/" ? "bg-amber-700 text-white lg:bg-transparent lg:text-amber-700" : ""}`}>
              <Link to={route.path} className="block">
                {route.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

