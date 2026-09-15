/** @type {NextPage} */
import DailyQuoteCard from "../components/DailyQuoteCard/DailyQuoteCard";
import { useQuoteOfToday } from "../hooks/useQuoteOfToday";





const Home = () => {

  const {data, isLoading, isError} = useQuoteOfToday();

if(isLoading) return <p>is isLoading...</p>
if(isError) return <p>Error X</p>

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
