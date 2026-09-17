import "./LoadingState.css";
import { useUiStore } from "../../store/useUiStore";

export function HomeLoading() {
  const { theme } = useUiStore();

  return (
    <div className="homeloading">
      <p>DailyQuote</p>
      <div className="homeloading-row first-row "></div>
      <section
        className="homeloading-card"
        style={{
          boxShadow:
            theme === "dark"
              ? " 0 0 30px 8px rgba(255, 255, 255, 0.08)"
              : " 0 0 30px 8px rgba(0, 0, 0, 0.08)",
        }}
      >
        <div className="homeloading-sec1">
          <div className="homeloading-row left"></div>
          <div className="homeloading-row right"></div>
        </div>

        <div className="homeloading-sec2">
          <div className="homeloading-row row1"></div>
          <div className="homeloading-row row2"></div>
          <div className="homeloading-row row3"></div>
          <div className="homeloading-row row4"></div>

          <div className="homeloading-sec3">
            <div className="homeloading-row left"></div>
            <div className="homeloading-row right"></div>
          </div>
        </div>
      </section>

	  <section className="homeloading-card categ" style={{
          boxShadow:
            theme === "dark"
              ? " 0 0 30px 8px rgba(255, 255, 255, 0.08)"
              : " 0 0 30px 8px rgba(0, 0, 0, 0.08)",
        }}>
	  </section>
    </div>
  );
}
