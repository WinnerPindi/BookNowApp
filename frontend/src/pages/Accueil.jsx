import BackgroundImage from "../assets/Bg-lit.jpg";
import { SearchBarre } from "../components/SearchBarre";
import { Card } from "../components/Card";
import { APPART } from "../constant";
import { AppartGrid } from "../components/AppartGrid";
import { HomeBanner } from "../components/HomeBanner";
import { Footer } from "../components/Footer";

export function Accueil() {
  return (
    <div >
      <HomeBanner/>
      <SearchBarre />
      <AppartGrid items={APPART}/>
      <Footer/>
    </div>
  );
}
