/** @type {NextPage} */
import { useState } from "react";
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
