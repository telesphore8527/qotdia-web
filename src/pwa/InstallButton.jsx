import useInstallPrompt from "./useInstallPrompt";

export default function InstallButton() {
  const { canInstall, showIOSHint, install } = useInstallPrompt();

  if (canInstall) {
    return (
      <button className="pwa-install" onClick={install}>
        <div className="pwa-install-logo"> <img src="/logo.png" alt="pwa-install-logo" /> </div>
        <b>Install Qotdia</b>
      </button>
    );
  }
  if (showIOSHint) {
    return (
      <p className="pwa-hint">
        To install: tap Share, then "Add to Home Screen".
      </p>
    );
  }
  return null;
}