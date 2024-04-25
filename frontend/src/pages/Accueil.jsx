import BackgroundImage from "../assets/Bg-lit.jpg";
import { SearchBarre } from "../components/SearchBarre";
import { Card } from "../components/Card";
import { APPART } from "../constant";
import { AppartGrid } from "../components/AppartGrid";
import { HomeBanner } from "../components/HomeBanner";
import { Footer } from "../components/Footer";
import { useEffect, useState } from "react";
import { fetchRooms } from "../services/roomService";

export function Accueil() {

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const getRoomsData = async () => {
      try {
        const roomsData = await fetchRooms();
        setRooms(roomsData);
      } catch (error) {
        console.error("Erreur lors de la récupération des données des chambres: ", error);
      }
    };

    getRoomsData();
  }, []);
  return (
    <div className="pt-16">
      <HomeBanner/>
      <SearchBarre />
      <div className="pt-10 text-4xl font-extrabold text-center">NOS CHAMBRES</div>
      <AppartGrid items={rooms}/>
      <Footer/>
    </div>
  );
}
