import { Routes, Route } from "react-router-dom";
import AppShell from "../components/layout/AppShell";
import Home from "../pages/Home";
import Explorer from "../pages/Explorer";
import Settings from "../pages/Settings";
import Favorites from "../pages/Favorites";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Home />} />
        <Route path="/explorer" element={<Explorer />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
