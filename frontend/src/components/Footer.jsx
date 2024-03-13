import { AiFillInstagram } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";
export function Footer() {
  return (
    <div className="flex justify-between mt-20 p-10 bg-primary text-white">
      <div className="">
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
