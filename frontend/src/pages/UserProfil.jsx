import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import axios from "axios";

function UserProfile() {
  const { userDetails } = useSelector((state) => state.authSlice.user);
  const [userById, setUserById] = useState(null);
  const fileInputRef = useRef(null);
  const token = userDetails?.token;

  const handleFileInputClick = () => {
    fileInputRef.current.click(); // Déclenche l'input type file quand l'icône est cliquée
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profileImage", file);

      try {
        const response = await axios.put(
          `http://localhost:8800/api/users/profileImage/${userDetails._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Image uploaded successfully:", response.data);
        // Mise à jour de l'état local ou global pour refléter la nouvelle image de profil
        uploadUser();
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const uploadUser = async (event) => {
    try {
      const response = await axios.get(
        `http://localhost:8800/api/users/${userDetails._id}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("User uploaded successfully:", response.data);
      setUserById(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    (async () => {
      await uploadUser();
    })();
  }, []);
  
  console.log(token);

  return (
    <>{userById && ( 
      <div className="pt-16 max-w-4xl mx-auto">
        <h1 className="mt-12 text-4xl text-center mb-10">Infos Personnelles</h1>
        <div className="bg-white rounded-lg overflow-hidden shadow-lg mb-5 p-5 flex flex-col gap-4">
          <div className="flex justify-center relative">
            <img
              src={`http://localhost:8800/${userById.profileImage}`}
              alt="Photo de profil"
              className="h-32 w-32 rounded-full object-cover"
            />
            <FaCamera
              className="absolute bottom-0 right-0 cursor-pointer text-xl text-primary"
              onClick={handleFileInputClick}
            />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
              accept="image/*"
            />
          </div>
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
            <Link to={`/edituser/${userDetails._id}`}>
              <button className="px-4 py-2 bg-primary text-white rounded hover:bg-amber-700 transition duration-150">
                Modifier le profil
              </button>
            </Link>
          </div>
        </div>
      </div>
      )}
    </>
  );
}

export default UserProfile;
