/** @type {NextPage} */
import FavQuoteCard from "../components/FavQuoteCard/FavQuoteCard";
import { FavoritesEmpty, ExploreEmpty } from "../components/EmptyState/EmptyState";
import { useFavoriteStore } from "../store/useFavoriteStore";
import FavoritesActions from "../components/FavoritesActions/FavoritesActions";
import { useState } from "react";
import Seo from "../components/Seo";

const Favorites = () => {
  const { favorites } = useFavoriteStore();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [onreset, setOnreset] = useState(0)

const categories = []
favorites.forEach(f => {
  const added = categories.some((c)=>c.slug === f.category.slug)

  if(!added) categories.push(f.category)
});

  const filtered = favorites.filter((f)=>{
    const matchSearchContent = f.content.toLowerCase().includes(search.toLocaleLowerCase().trim())
    const matchSearchAuthor = f.author.toLowerCase().includes(search.toLocaleLowerCase().trim())
    const matchCategory = category.toLowerCase() === "all" || f.category.slug === category.trim()

    return matchCategory && (matchSearchAuthor || matchSearchContent)
  }).reverse();

  const handleReset = ()=>{
    setCategory("all")
    setSearch("")
    setOnreset((prev)=> prev+1)
  }

  if (favorites.length === 0) return <FavoritesEmpty />;

  return (
    <section>
      <Seo title="My Favorite Quotes | Qotdia" description="Your saved quotes, available offline." path="/favorites" noindex />
      <FavoritesActions key={onreset} categories={categories.reverse()} favNumber={favorites.length} setSearch={setSearch} search={search} setCategory={setCategory} />

      <ul className="favquotecard-container">
        {
          filtered.length === 0? <ExploreEmpty onClick={()=>handleReset} /> : (
            filtered.map((quote) => {
          return <FavQuoteCard key={quote.id} quote={quote} />
        })
          )
        }
      </ul>
    </section>
  );
};

export default Favorites;
