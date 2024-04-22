import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { useState } from "react";
import { format } from "date-fns";

export function SearchBarre() {
  const [openDate, setOpenDate] = useState(false);

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  return (
    <div className="-mt-20 relative flex justify-center">
      {/* Conteneur avec position relative pour permettre un positionnement absolu du DateRange par rapport à lui */}
      <div className="relative border border-gray-300 p-10 rounded-lg bg-white">
        <div className="flex space-x-10">
          {/* La destination */}
          <div className="flex flex-col space-y-1">
            <label htmlFor="inputId" className="text-lg font-semibold">
              Prix ?
            </label>
            <input
              type="text"
              placeholder="Quel prix ?"
              className="cursor-pointer border-none outline-none"
            />
          </div>
          <div className="border border-l border-gray-500"></div>

          {/* Départ et Arrivé */}
          <div className="flex flex-col cursor-pointer">
            <label htmlFor="inputId" className="  text-lg font-semibold">
              Arrivé et Départ
            </label>
            <span
              onClick={() => setOpenDate(!openDate)}
              className="mt-3 text-gray-400"
            >{`Du ${format(date[0].startDate, "MM/dd/yyyy")} À ${format(
              date[0].endDate,
              "MM/dd/yyyy"
            )}`}</span>

            {openDate && (
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={date}
                className="absolute top-full left-1/2 mt-2 -translate-x-1/2" // Utilisez top-full pour le positionner juste en dessous du conteneur et mt-2 pour ajouter une marge en haut
              />
            )}
          </div>
          <div className="border border-l border-gray-500"></div>

          {/* Le nombre de personne  */}
          <div className="cursor-pointer">
            <label htmlFor="inputId" className="text-lg font-semibold">
              Qui ?
            </label>
            <input
              type="text"
              placeholder="Combien de personne ?"
              className="cursor-pointer border-none outline-none"
            />
          </div>

          {/* Boutton de recherche */}
          <button className="bg-primary text-white p-5 rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
