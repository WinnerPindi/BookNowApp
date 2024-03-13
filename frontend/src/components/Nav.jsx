import { RxHamburgerMenu } from "react-icons/rx";
import BookingLogo from "../assets/lit.png";
import { useState } from "react";

const ROUTES = ["Accueil", "Logement","Mes Reservations", "Connexion"];
export function Nav() {
  const [isMobileMenuShown, setIsMobileMenuShown] = useState(false);
  return (
    <nav className="flex flex-wrap justify-between items-center">
      {/* Logo et Nom de l'application */}
      <a className="flex" href="#">
        <img src={BookingLogo} className="h-10 w-10" />
        <h1 className="p-2 text-xl font-bold ">BookNow</h1>
      </a>
      {/*Burger Button */}
      <button onClick={()=> setIsMobileMenuShown(!isMobileMenuShown)} className="lg:hidden rounded-lg hover:bg-gray-100 p-2 focus:ring-2 focus:ring-gray-200 ">
        <RxHamburgerMenu size={25} />
      </button>

      {/*Burger Button */}
      <div className={`${!isMobileMenuShown && "hidden"} w-full lg:w-auto lg:block`}>
        <ul className="lg:space-x-8 flex  flex-col lg:flex-row bg-gray-50 lg:bg-transparent text-lg border border-gray-100 lg:border-none rounded-lg p-4">
          {ROUTES.map((route, i) => {
            return (
              <li
              className={`px-3 py-2 cursor-pointer ${i === 0 ? "bg-amber-700 text-white lg:bg-transparent lg:text-amber-700 " : "hover:bg-gray-100"}`}
              key={route}
              >
                {route}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
