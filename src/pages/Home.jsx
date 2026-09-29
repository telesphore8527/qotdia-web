import DailyQuoteCard from "../components/DailyQuoteCard/DailyQuoteCard";
import { useDailyQuote } from "../hooks/useDailyQuote";
import { HomeLoading } from "../components/LoadingState/LoadingState";
import { HomeError } from "../components/ErrorState/ErrorState";
import { SettingRow } from "./Settings";

const Home = () => {
  const { data, isLoading, isError, refetch } = useDailyQuote();
  // gerer le status depuis la premiere page
  if (isLoading) return <HomeLoading />;
  if (isError) return <HomeError onClick={refetch} />;

  return (
    <div>
      <SettingRow
      title="daily Reflexion"
      subtitle="welcome to your quiet daily inspiration "
      right={new Date().toDateString()}
       />
      <br />
      <DailyQuoteCard quote={data.data} />
    </div>
  );
};

export default Home;
