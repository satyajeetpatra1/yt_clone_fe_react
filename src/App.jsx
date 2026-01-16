import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MobileBottomNav from "./components/MobileBottomNav";

function App() {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex flex-1 w-full">
        <Sidebar />
        <Outlet />
      </div>

      <MobileBottomNav />
    </div>
  );
}

export default App;
