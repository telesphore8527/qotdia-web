/** @type {NextPage} */
import { useState } from "react";
import { useUiStore } from "../store/useUiStore";
import "../styles/Settings.css";
import { FaChevronRight } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa";
import {
  LuShieldCheck,
  LuClock8,
  LuBellRing,
  LuSun,
  LuMoon,
  LuBadgeInfo,
  LuGitCommitHorizontal,
  LuLock,
  LuDot,
} from "react-icons/lu";
import { MdGavel } from "react-icons/md";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";

function SectionLabel({ children }) {
  return (
    <>
      <h2 className="setting-label-section">{children}</h2>
    </>
  );
}

export function SettingRow({ logo, title, subtitle, right, onClick, children }) {


  return (
    <div style={{cursor: onClick? "pointer" : "default"}}>
      {!children ? (
        <button className="settingRow" onClick={onClick}>
          <div className="settingRow-left-container">
            <div>{logo ? logo : ""}</div>

            <div>
              <p className="settingRow-title"> {title} </p>
              <p className="settingRow-subtitle"> {subtitle} </p>
            </div>
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
  const [time, setTime] = useState("08:00");
  const [editingTime, setEditingTime] = useState(false);

  return (
    <div>
      {/* Daily notif*/}
      <Seo title="Settings | Qotdia" description="Customize your Qotdia experience." path="/settings" noindex />

      <SectionLabel>Daily Inspiration</SectionLabel>
      <div className="setting-section">
        <SettingRow
          logo={
            <LuBellRing
              style={{
                color: "var(--color-primary)",
                background: "var(--color-primary-transparent)",
              }}
            />
          }
          title="Daily Quote Notification"
          subtitle="Stored in local browser..."
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
          logo={
            <LuClock8
              style={{
                color: "var(--color-primary)",
                background: "var(--color-primary-transparent)",
              }}
            />
          }
          title="Notification time"
          subtitle="Morning quiet window"
          right={
            <p
              style={{
                color: "var(--color-text-secondary)",
                display: "flex",
                alignItems: "center",
                gap: ".5rem",
                background: "var(--color-primary-transparent)",
                border: "8px solid var(--color-primary-transparent)",
                borderRadius: ".5rem",
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
            <p className="setting-time-zone" style={{background: "var(--color-surface)"}}>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </p>
          </SettingRow>
        )}
        <SettingRow>
          <p
            style={{
              padding: ".5rem",
              margin: ".2rem 1rem",
              fontSize: ".8rem",
              border: "2px solid var(--color-border)",
              borderRadius: ".6rem",
              background: "var(--color-bg)",
              display: "flex",
              gap: ".8rem",
              color: "var(--color-text-secondary)",
            }}
          >
            <LuShieldCheck
              style={{
                color: "var(--color-secondary)",
                fontSize: "2rem",
              }}
            />
            Local device notification without server dependency. Runs strictly
            inside this browser instance.
          </p>
        </SettingRow>
      </div>

      {/* Theme */}

      <SectionLabel> APPEARANCE</SectionLabel>
      <div className="setting-section">
        <SettingRow
          title="Change
           theme"
          subtitle=""
          right={
            <div
              style={{
                color: "var(--color-text-secondary)",
                display: "flex",
                alignItems: "center",
                gap: ".5rem",
              }}
            >
              <div style={{ marginTop: ".4rem", fontSize: "1rem" }}>
                {theme === "dark" ? <LuSun /> : <LuMoon />}
              </div>
              {theme} <FaChevronRight />
            </div>
          }
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        />
      </div>

      {/* About */}

      <SectionLabel>Aplication Info</SectionLabel>
      <div className="setting-section">
          <SettingRow
          title="Running offline"
          subtitle="data are available offline"
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

        <Link to="/about">
        <SettingRow
          logo={<LuBadgeInfo />}
          title="About Qotdia"
          right={<FaChevronRight />}
        />
        </Link>

        <hr className="setting-hr" />

        <Link to="/privacy"> 
        <SettingRow
          logo={<LuShieldCheck />}
          title="Privacy policy"
          right={<FaChevronRight />}
        />
        </Link>
        <hr className="setting-hr" />

        <Link to="/terms">
        <SettingRow
          logo={<MdGavel />}
          title="Terms of Service"
          right={<FaChevronRight />}
        />
        </Link>
        <hr className="setting-hr" />
        <SettingRow
          logo={<LuGitCommitHorizontal />}
          title="App Version"
          right={<p>V1.0.0</p>}
        />
      </div>

      <p
        style={{
          color: "var(--color-secondary)",
          textAlign: "center",
          margin: "1rem 0",
          fontSize: ".8rem",
        }}
      >
        {" "}
        <LuLock /> Client side Architecture
      </p>

      <p
        style={{
          color: "var(--color-text-secondary)",
          textAlign: "center",
          margin: "1rem 0",
          fontSize: ".8rem",
        }}
      >
        
        Qotdia PWA {<LuDot />} Built with mindfulness for daily contemplation.
      </p>
    </div>
  );
};

export default Settings;
