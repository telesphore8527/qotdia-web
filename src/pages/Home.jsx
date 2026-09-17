/** @type {NextPage} */
import DailyQuoteCard from "../components/DailyQuoteCard/DailyQuoteCard";
import { useDailyQuote } from "../hooks/useDailyQuote";
import { HomeLoading } from "../components/LoadingState/LoadingState";





const Home = () => {

  const {data, isLoading, isError} = useDailyQuote();

if(isLoading) 
  return (<HomeLoading />)
if(isError) return <p>Error </p>

  return (
    <div>
      Quote of the day... {(new Date()).toDateString()} <br /><br />
      <DailyQuoteCard
        quote={data.data}
      />
    </div>
  );
};

export default Home;
