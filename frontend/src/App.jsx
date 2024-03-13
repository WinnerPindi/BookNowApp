import { Outlet } from "react-router-dom";
import {Nav} from "./components/Nav"
function App() {
  
  return (
    <div className="p-10 xl:px-24">
      <Nav/>
      
      <Outlet/>
    </div>
  );
}

export default App
