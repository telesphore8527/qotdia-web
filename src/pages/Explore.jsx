import ExploreActions from "../components/ExploreActions/ExploreActions";

import { useState } from "react";
import ExpQuoteList from "../components/ExpQuoteList/ExpQuoteList";

const Explore = () => {
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [onreset, setOnreset] = useState(0);

  return (
    <section>
      <ExploreActions
      key={onreset}
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
      />
      <ExpQuoteList search={search} setOnreset={setOnreset} setSearch={setSearch} category={category} setCategory={setCategory} />
    </section>
  );
};

export default Explore;
