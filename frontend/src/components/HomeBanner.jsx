import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import le CSS de AOS
import BackgroundImage from "../assets/Bg-lit.jpg";

export function HomeBanner() {
  useEffect(() => {
    AOS.init(); // Initialiser AOS
  }, []);

  return (
    <div className="relative mt-12 h-screen">
      <img
        src={BackgroundImage}
        alt="Background"
        className="w-full h-full object-cover absolute z-0 rounded-3xl"
      />
      <div
        className="z-10 text-white text-center absolute w-full"
        style={{ top: "50%", transform: "translateY(-50%)" }}
      >
        <h1 
          className="text-7xl font-bold"
          data-aos="fade-up"  // Applique l'animation AOS
          data-aos-duration="1000"  // Durée de l'animation en ms
        >
          Trouvez votre prochain séjour
        </h1>
        <p 
          className="text-2xl mt-4"
          data-aos="fade-up"  // Applique l'animation AOS à cette élément également
          data-aos-delay="1500"  // Commence cette animation 1500 ms après que l'animation de la page a commencé
          data-aos-duration="1000"
        >
          Explorez des opportunités sur des hôtels et des logements autonome.
        </p>
      </div>
    </div>
  );
}
