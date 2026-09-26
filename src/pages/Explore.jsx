import ExploreActions from "../components/ExploreActions/ExploreActions";

import { useState } from "react";
import ExpQuoteList from "../components/ExpQuoteList/ExpQuoteList";

const Explore = () => {
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");

  return (
    <section>
      <ExploreActions
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
      />
      <ExpQuoteList search={search} category={category} />
    </section>
  );
};

export default Explore;
