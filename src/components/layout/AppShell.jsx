import "./AppShell.css"
import Header from "./Header/Header.jsx";
import BottomNav from "./BottomNav/BottomNav.jsx";
import { Outlet } from "react-router-dom";
import InstallButton from "../../pwa/installButton.jsx";
import UpdateToast from "../../pwa/UpdateToast.jsx";

function AppShell() {
  return (
    <div className="app-shell">
      <Header />
      <UpdateToast />
      <main>
        <Outlet />
      </main>
      <InstallButton />
      <BottomNav />
    </div>
  );
}

export default AppShell;
