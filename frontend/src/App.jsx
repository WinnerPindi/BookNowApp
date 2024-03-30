import { Outlet } from "react-router-dom";
import {Nav} from "./components/Nav";
import {Footer} from "./components/Footer";
function App() {
  
  return (
    <div className="p-10 xl:px-24">
      <Nav/>

      <Outlet/>

    </div>
  );
}

export default App
