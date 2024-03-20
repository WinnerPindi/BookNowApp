import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"; 

function UserProfil() {
  const { userDetails } = useSelector((state) => state.authSlice.user);

  return (
    <div>
      <h1 className="mt-11 text-4xl">Infos Personnelles</h1>
        <div className="mt-11">
          <h3 className="text-xl">Nom</h3>
          <p className="mt-2 text-gray-500">{userDetails.lastname}</p>
          <div className="mt-4 border"></div>
        </div>
        <div className="mt-5">
          <h3 className="text-xl">Prénom</h3>
          <p className="mt-2 text-gray-500">{userDetails.firstname}</p>
          <div className="mt-4 border"></div>
        </div>
        <div className="mt-5">
          <h3 className="text-xl">Email</h3>
          <p className="mt-2 text-gray-500">{userDetails.email}</p>
          <div className="mt-4 border"></div>
        </div>
        <div className="mt-5">
          <Link to="/edit-profile">
            <button className="px-4 py-2 bg-primary text-white rounded hover:bg-amber-700 transition duration-150">
              Modifier le profil
            </button>
          </Link>
        </div>
    </div>
  );
}

export default UserProfil;
