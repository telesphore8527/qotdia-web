import "../styles/home.css";
import DailyQuoteCard from "../components/DailyQuoteCard/DailyQuoteCard";
import { useDailyQuote } from "../hooks/useDailyQuote";
import { HomeLoading } from "../components/LoadingState/LoadingState";
import { HomeError } from "../components/ErrorState/ErrorState";
import dayjs from "dayjs";
import { LuCalendar, LuStar } from "react-icons/lu";
import { useUiStore } from "../store/useUiStore";
import Seo from "../components/Seo";

const Home = () => {
  const { data, isLoading, isError, refetch } = useDailyQuote();
  const { theme } = useUiStore();
  // gerer le status depuis la premiere page
  if (isLoading) return <HomeLoading />;
  if (isError) return <HomeError onClick={refetch} />;

  return (
    <div>
      <Seo
        title="Qotdia – A New Inspiring Quote Every Day"
        description="Discover the quote of the day on Qotdia. Fresh daily inspiration on motivation, wisdom, love, success and more. Free, fast and installable as an app."
        path="/"
      />
      <header className="home-header">
        <div>
          <h1 className="home-title">Daily reflexion</h1>
          <p className="home-subtitle">
            Welcome to your quiet daily inspiration
          </p>
        </div>
        <div
          className="home-date"
          style={{
            color:
              theme === "dark" ? "var(--color-text)" : "var(--color-primary)",
          }}
        >
          {" "}
          {<LuCalendar />}
          <p>{dayjs().format("ddd, MMM DD")}</p>
        </div>
      </header>

      <section className="home-qotd">
        <h2>Quote of the day</h2>{" "}
        <i
          style={{
            color:
              theme === "dark" ? "var(--color-text)" : "var(--color-primary)",
          }}
        >
          {<LuStar />}Daily pick
        </i>
      </section>

      <DailyQuoteCard quote={data.data} />
    </div>
  );
};

export default Home;
