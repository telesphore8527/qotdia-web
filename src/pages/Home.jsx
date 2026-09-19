/** @type {NextPage} */
import DailyQuoteCard from "../components/DailyQuoteCard/DailyQuoteCard";
import { useDailyQuote } from "../hooks/useDailyQuote";
import { HomeLoading } from "../components/LoadingState/LoadingState";
import { HomeError } from "../components/ErrorState/ErrorState";

const Home = () => {
  const { data, isLoading, isError, refetch } = useDailyQuote();

  if (isLoading) return <HomeLoading />;
  if (isError) return <HomeError refetch={refetch} />;

  return (
    <div>
      Quote of the day... {new Date().toDateString()} <br />
      <br />
      <DailyQuoteCard quote={data.data} />
    </div>
  );
};

export default Home;
