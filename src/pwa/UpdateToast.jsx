import { useRegisterSW } from "virtual:pwa-register/react";
import "./pwa.css";

export default function UpdateToast() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(_url, registration) {
      // Vérifie une nouvelle version toutes les heures
      if (registration) {
        setInterval(() => registration.update(), 60 * 60 * 1000);
      }
    },
  });

  if (!needRefresh) return null;

  return (
    <div className="pwa-toast" role="status">
      <span>A new version is available.</span>
      <button onClick={() => updateServiceWorker(true)}>Update</button>
      <button onClick={() => setNeedRefresh(false)}>Later</button>
    </div>
  );
}