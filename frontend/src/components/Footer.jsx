import { AiFillInstagram, AiFillLinkedin } from "react-icons/ai"; // Importation optimisée

export function Footer() {
  return (
    // Utilisation de w-full pour garantir que le div occupe toute la largeur
    <div className="w-full flex justify-between items-center mt-20 p-10 bg-primary text-white">
      <div>
        <p className="font-extrabold text-xl">
          BookNow@2024. All Rights Reserved.
        </p>
      </div>
      <div>
        <p className="font-extrabold">Website developed by Winner Pindi</p>
        <div className="flex">
          <a href="https://www.instagram.com/winner_p78/">
            <AiFillInstagram size="30" />
          </a>
          <a href="https://www.linkedin.com/in/winner-pindi-768400235/">
            <AiFillLinkedin size="30" />
          </a>
        </div>
      </div>
    </div>
  );
}
