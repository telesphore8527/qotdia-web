/** @type {NextPage} */
import ExpQuoteCard from "../components/ExpQuoteCard/ExpQuoteCard";
const Explorer = () => {
  return (
    <section>
      <h1>Explorer</h1>

      <section className="favquotecard-container">
        <ExpQuoteCard
          quote={{
            id: 20,
            content:
              "Un ami en qui on ne peut pas voir un meilleur ennemi est un hypocrite.",
            author: "Telesphore",
            date: "22 sept 2026",
            category: {
              name: "Motivation",
              slug: "motivation",
              description:
                "gar je connais pas la description mais bon je dois quand meme en avoir un grande juste au cas ou...",
            },
          }}
        />
        <ExpQuoteCard
          quote={{
            id: 20,
            content:
              "Un ami en qui on ne peut pas voir un meilleur ennemi est un hypocrite.",
            author: "Telesphore",
            date: "22 sept 2026",
            category: {
              name: "Self-confidence",
              slug: "self-confidence",
              description:
                "gar je connais pas la description mais bon je dois quand meme en avoir un grande juste au cas ou...",
            },
          }}
        />
        <ExpQuoteCard
          quote={{
            id: 20,
            content:
              "Un ami en qui on ne peut pas voir un meilleur ennemi est un hypocrite.",
            author: "Telesphore",
            date: "22 sept 2026",
            category: {
              name: "Love",
              slug: "love",
              description:
                "gar je connais pas la description mais bon je dois quand meme en avoir un grande juste au cas ou...",
            },
          }}
        />
      </section>
    </section>
  );
};

export default Explorer;
