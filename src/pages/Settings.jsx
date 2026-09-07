/** @type {NextPage} */
import { useEffect, useState } from "react";
import { useUiStore } from "../store/useUiStore";
import "../styles/Settings.css";
import { FaChevronRight } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa";

function SectionLabel({ children }) {
  return (
    <>
      <h2 className="setting-label-section">{children}</h2>
    </>
  );
}

function SettingRow({ title, subtitle, right, onClick, children }) {
  return (
    <div>
      {!children ? (
        <button className="settingRow" onClick={onClick}>
          <div>
            <p className="settingRow-title"> {title} </p>
            <p className="settingRow-subtitle"> {subtitle} </p>
          </div>
          {right}
        </button>
      ) : (
        children
      )}
    </div>
  );
}

const Settings = () => {
  const [notifsOn, setNotifsOn] = useState(true);
  const { theme, setTheme } = useUiStore();
  const [time, setTime] = useState("07:00");
  const [editingTime, setEditingTime] = useState(false);


  const onTheme = () => {
    setTheme("dark")
    console.log("je fonctionne...", theme);
    
  };

  return (
    <div>
      {/* Daily notif*/}

      <SectionLabel>Notificaitons</SectionLabel>
      <div className="setting-section">
        <SettingRow
          title="Daily Notification"
          subtitle="get your quote every day"
          right={
            <input
              type="checkbox"
              className="setting-checkbox"
              onChange={() => setNotifsOn((v) => !v)}
              checked={notifsOn}
            />
          }
        />

        <hr className="setting-hr" />

        {/* Time of notif */}

        <SettingRow
          title="Time of notification"
          right={
            <p
              style={{
                color: "var(--color-text-secondary)",
                display: "flex",
                alignItems: "center",
                gap: ".5rem",
              }}
            >
              {notifsOn ? time : "-- : --"}
              {editingTime && notifsOn ? <FaChevronDown /> : <FaChevronRight />}
            </p>
          }
          onClick={() => setEditingTime((v) => !v)}
        />

        {notifsOn && editingTime && (
          <SettingRow>
            {" "}
            <p className="setting-time-zone">
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </p>
          </SettingRow>
        )}
      </div>

      {/* Theme */}

      <SectionLabel> Theme</SectionLabel>
      <div className="setting-section">
        <SettingRow
          title="Change
           theme"
          subtitle=""
          right={
            <p style={{ color: "var(--color-text-secondary)" }}>
              {theme} <FaChevronRight />
            </p>
          }
          onClick={()=> setTheme(theme === "light" ? "dark" : "light")}
        />
      </div>

      {/* About */}

      <SectionLabel>About</SectionLabel>
      <div className="setting-section">
        <SettingRow
          title="Running offline"
          subtitle="data are available"
          right={
            <input
              type="radio"
              value=""
              readOnly
              checked
              className="setting-radio"
            />
          }
        />

        <hr className="setting-hr" />

        <SettingRow
          title="About Qotdia"
          subtitle="version 1.0.0"
          right={<FaChevronRight />}
        />

        <hr className="setting-hr" />

        <SettingRow title="Legal Mentions" right={<FaChevronRight />} />
      </div>
    </div>
  );
};

export default Settings;

// import { useState } from "react";
// import { LuChevronRight, LuInfo } from "react-icons/lu";

// // ---- Design tokens (palette DailyQuote) ----
// const colors = {
//   primary: "#6C5CE7",
//   primaryLight: "#A29BFE",
//   secondary: "#00B894",
//   darkNeutral: "#2D3436",
//   midNeutral: "#636E72",
//   lightNeutral: "#F5F6FA",
// };

// // ---- Toggle switch stylé (réutilisable) ----
// function Toggle({ checked, onChange, ariaLabel }) {
//   return (
//     <label
//       style={{ width: 44, height: 26 }}
//       className="relative inline-block cursor-pointer shrink-0"
//     >
//       <input
//         type="checkbox"
//         checked={checked}
//         onChange={onChange}
//         aria-label={ariaLabel}
//         className="peer sr-only"
//       />
//       <span
//         style={{ backgroundColor: checked ? colors.primary : "#E0E0E6" }}
//         className="absolute inset-0 rounded-full transition-colors duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2"
//       />
//       <span
//         style={{
//           transform: checked ? "translateX(18px)" : "translateX(2px)",
//           top: 2,
//         }}
//         className="absolute h-[22px] w-[22px] rounded-full bg-white shadow-md transition-transform duration-200"
//       />
//     </label>
//   );
// }

// // ---- Ligne de réglage générique ----
// function SettingRow({ title, subtitle, right, onClick }) {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className="flex w-full items-center justify-between gap-4 py-3.5 text-left"
//       style={{ cursor: onClick ? "pointer" : "default" }}
//     >
//       <div className="min-w-0">
//         <p style={{ color: colors.darkNeutral }} className="text-[15px] font-medium">
//           {title}
//         </p>
//         {subtitle && (
//           <p style={{ color: colors.midNeutral }} className="text-[13px] mt-0.5">
//             {subtitle}
//           </p>
//         )}
//       </div>
//       {right}
//     </button>
//   );
// }

// function SectionLabel({ children }) {
//   return (
//     <h2
//       style={{ color: colors.midNeutral }}
//       className="text-[13px] font-semibold mb-1 mt-6 first:mt-0"
//     >
//       {children}
//     </h2>
//   );
// }

// export default function Settings() {
//   const [notifsOn, setNotifsOn] = useState(true);
//   const [heure, setHeure] = useState("08:00");
//   const [editingHeure, setEditingHeure] = useState(false);
//   const [theme, setTheme] = useState("clair");
//   const [langue, setLangue] = useState("Français");
//   const [horsLigne, setHorsLigne] = useState(true);

//   const themes = [
//     { id: "clair", label: "Clair" },
//     { id: "sombre", label: "Sombre" },
//     { id: "systeme", label: "Système" },
//   ];

//   return (
//     <div
//       style={{ fontFamily: "Poppins, sans-serif", backgroundColor: "#FFFFFF" }}
//       className="mx-auto w-full max-w-[360px] px-5 py-5 rounded-[28px] border border-black/5"
//     >
//       <h1 style={{ color: colors.darkNeutral }} className="text-lg font-semibold mb-4">
//         Réglages
//       </h1>

//       {/* Notifications */}
//       <SectionLabel>Notifications</SectionLabel>
//       <div className="divide-y divide-black/5">
//         <SettingRow
//           title="Notifications quotidiennes"
//           subtitle="Recevez votre citation chaque jour"
//           right={
//             <Toggle
//               checked={notifsOn}
//               onChange={() => setNotifsOn((v) => !v)}
//               ariaLabel="Activer les notifications quotidiennes"
//             />
//           }
//         />

//         <SettingRow
//           title="Heure de notification"
//           onClick={() => notifsOn && setEditingHeure((v) => !v)}
//           right={
//             <span className="flex items-center gap-1" style={{ color: colors.midNeutral }}>
//               <span className="text-[14px]">{heure}</span>
//               <LuChevronRight size={16} />
//             </span>
//           }
//         />
//         {editingHeure && notifsOn && (
//           <div className="pb-3 pt-1">
//             <input
//               type="time"
//               value={heure}
//               onChange={(e) => setHeure(e.target.value)}
//               style={{
//                 borderColor: colors.primaryLight,
//                 color: colors.darkNeutral,
//               }}
//               className="w-full rounded-xl border px-3 py-2 text-[14px] outline-none focus:ring-2"
//             />
//           </div>
//         )}
//       </div>

//       {/* Thème */}
//       <SectionLabel>Thème</SectionLabel>
//       <div className="flex gap-2 py-2">
//         {themes.map((t) => {
//           const active = theme === t.id;
//           return (
//             <button
//               key={t.id}
//               onClick={() => setTheme(t.id)}
//               style={{
//                 borderColor: active ? colors.primary : "#E0E0E6",
//                 color: active ? colors.primary : colors.midNeutral,
//                 backgroundColor: active ? "rgba(108,92,231,0.08)" : "transparent",
//               }}
//               className="flex-1 rounded-xl border px-3 py-2 text-[13px] font-medium transition-colors"
//             >
//               {t.label}
//             </button>
//           );
//         })}
//       </div>

//       {/* Langue */}
//       <SectionLabel>Langue</SectionLabel>
//       <div className="divide-y divide-black/5">
//         <SettingRow
//           title="Langue de l'application"
//           right={
//             <span className="flex items-center gap-1" style={{ color: colors.midNeutral }}>
//               <span className="text-[14px]">{langue}</span>
//               <LuChevronRight size={16} />
//             </span>
//           }
//           onClick={() => setLangue((l) => (l === "Français" ? "English" : "Français"))}
//         />
//       </div>

//       {/* Autres */}
//       <SectionLabel>Autres</SectionLabel>
//       <div className="divide-y divide-black/5">
//         <SettingRow
//           title="Fonctionnalité hors ligne"
//           subtitle={horsLigne ? "Les données sont disponibles" : "Indisponible"}
//           right={
//             <Toggle
//               checked={horsLigne}
//               onChange={() => setHorsLigne((v) => !v)}
//               ariaLabel="Activer le mode hors ligne"
//             />
//           }
//         />
//         <SettingRow
//           title="À propos de DailyQuote"
//           subtitle="Version 1.0.0"
//           right={<LuInfo size={18} color={colors.midNeutral} />}
//           onClick={() => {}}
//         />
//       </div>
//     </div>
//   );
// }
