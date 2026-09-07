/** @type {NextPage} */
import DailyQuoteCard from "../components/DailyQuoteCard/DailyQuoteCard";
const Home = () => {
  return (
    <div>
      <DailyQuoteCard
        quote={{
          id:20,
          content: "Un ami en qui on ne peut pas voir un meilleur ennemi est un hypocrite.",
          author: "Telesphore",
          category: {
            name: "Relationships",
            slug: "motivation",
            description: "gar je connais pas la description mais bon je dois quand meme en avoir un grande juste au cas ou..."
          }
        }}
      />
    </div>
  );
};

export default Home;
