import ExploreActions from "../components/ExploreActions/ExploreActions";
import "../styles/explore.css"

import { useState } from "react";
import ExpQuoteList from "../components/ExpQuoteList/ExpQuoteList";

const Explore = () => {
  const [category, setCategory] = useState("");
  const [refetchCateg, setRefetchCateg] = useState(null)
  const [search, setSearch] = useState("");
  const [onreset, setOnreset] = useState(0);

  return (
    <section>
      <div className="exp-title">
        <h2>Explore Quotes</h2>{" "}
        <div className="exp-number">12,450+</div>{" "}
      </div>
      <ExploreActions
      key={onreset}
      setRefetchCateg={setRefetchCateg}
        setSearch={setSearch}
        setCategory={setCategory}
      />
      <ExpQuoteList 
      refetchCateg={refetchCateg}
      search={search} setOnreset={setOnreset} setSearch={setSearch} category={category} setCategory={setCategory} />
    </section>
  );
};

export default Explore;
