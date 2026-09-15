import "./ExpQuoteCard.css";
import { getCategoryColors } from "../../config/categoryVisuals";
import { FaHeart } from "react-icons/fa";
import { LuHeart, LuCopy, LuShare2 } from "react-icons/lu";

const ExpQuoteCard = ({ quote, isFavorite }) => {
  const iconColor = getCategoryColors(quote.category.slug).text;
  const iconBg = getCategoryColors(quote.category.slug).bg;

  return (
    // <div className='expquotecard'></div>

    <article className="favquotecard">
      <header className="favquotecard-header">
        <div
          className="favquotecard-categ"
          style={{
            color: iconColor,
            background: iconBg,
          }}
        >
          <div
            className="dot"
            style={{
              width: "10px",
              height: "10px",
              background: iconColor,
              borderRadius: "50%",
            }}
          ></div>
          {quote.category.name}
        </div>
        <div className="favquotecard-right">
          <p className="favquotecard-icon" style={{ fontSize: "3rem" }}>
            {" "}
            <span>“</span>{" "}
          </p>
        </div>
      </header>

      <section className="favquotecard-body">
        <p>{quote.content}</p>
      </section>

      <section className="favquotecard-footer">
        <div className="favquotecard-author">
          <div
            className="favquotecard-author-profile"
            style={{
              background: iconBg,
            }}
          >
            {quote.author.charAt(0)}
          </div>
          <p>{quote.author}</p>
        </div>

        <div className="favquotecard-actions">
          <div className="copy icon">
            <LuCopy></LuCopy>
          </div>

          <div className="share icon">
            <LuShare2></LuShare2>
          </div>
          <div className="like icon">
            {" "}
            {isFavorite ? (
              <FaHeart size={22} color="red" />
            ) : (
              <LuHeart size={22} />
            )}{" "}
          </div>
        </div>
      </section>
    </article>
  );
};

export default ExpQuoteCard;
