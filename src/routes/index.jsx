import { Routes, Route } from "react-router-dom";
import AppShell from "../components/layout/AppShell";
import Home from "../pages/Home";
import Explore from "../pages/Explore";
import Settings from "../pages/Settings";
import Favorites from "../pages/Favorites";
import About from "../pages/legals/About"
import PrivacyPolicy from "../pages/legals/PrivacyPolicy"
import TermsOfService from "../pages/legals/TermsOfService"

function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/settings" element={<Settings />} />

        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
