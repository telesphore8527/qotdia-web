import "./DailyQuoteCard.css";
import CategoryBackground from "../CategoryBackground/CategoryBackground";
import DQCTools from "../DQCTools/DQCTools";
import { LuQuote } from "react-icons/lu";


const DailyQuoteCateg = ({ category }) => {
  return (
    <section className="dailyquotecateg">
      <div className="sec-categ-title">Category</div>
      <div className="daily-categ-infos">
        <header>
          <div className="dot-primary"></div>
          <div className="daily-categ-name">{category.name}</div>
        </header>
        <div className="daily-categ-desc">{category.description}</div>
      </div>
    </section>
  );
};



const DailyQuoteCard = ({ quote }) => {
  return (
    <section className="dailyquotecard">
      <CategoryBackground categorySlug={quote["category"].slug}>
        <article className="quote-card">
          <div className="quote-card-header" style={{display: "none"}}>
            {/* ici je dois mettre la ou on suit par voice et la category mais c'est pour plus tard sinon je vais jamais m'areter dans le design */}
          </div>
          <div>
            <p className="quote-icon">{<LuQuote />} </p>
            <p className="quote-content"> " {quote.content} "</p>

            <p className="quote-author">
              <i> -- {quote.author} </i>
            </p>
          </div>
          <div>
            <DQCTools quote={quote} />
          </div>
        </article>
      </CategoryBackground>

      <DailyQuoteCateg category={quote.category} />
    </section>
  );
};

export default DailyQuoteCard;
