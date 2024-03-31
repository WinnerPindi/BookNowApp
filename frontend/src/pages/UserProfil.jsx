import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"; 

function UserProfile() {
  const { userDetails } = useSelector((state) => state.authSlice.user);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="mt-12 text-4xl text-center mb-10">Infos Personnelles</h1>
      <div className="bg-white rounded-lg overflow-hidden shadow-lg mb-5 p-5 flex flex-col gap-4">
        <div>
          <h3 className="text-xl">Nom</h3>
          <p className="mt-2 text-gray-500">{userDetails.lastname}</p>
        </div>
        <div className="mt-4 border-b"></div>
        
        <div className="mt-5">
          <h3 className="text-xl">Prénom</h3>
          <p className="mt-2 text-gray-500">{userDetails.firstname}</p>
        </div>
        <div className="mt-4 border-b"></div>
        
        <div className="mt-5">
          <h3 className="text-xl">Email</h3>
          <p className="mt-2 text-gray-500">{userDetails.email}</p>
        </div>
        <div className="mt-4 border-b"></div>
        
        <div className="mt-5 text-center">
          <Link to="/edituser/:id">
            <button className="px-4 py-2 bg-primary text-white rounded hover:bg-amber-700 transition duration-150">
              Modifier le profil
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
