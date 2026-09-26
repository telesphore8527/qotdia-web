import "./ExpQuoteList.css";
import { useInfiniteQuotes } from "../../hooks/useInfiniteQuotes";
import { ExploreLoading } from "../LoadingState/LoadingState";
import { ExploreError } from "../ErrorState/ErrorState";
import ExpQuoteCard from "../ExpQuoteCard/ExpQuoteCard";
import shuffle from "../../utils/shuffle";
const ExpQuoteList = ({ search, category }) => {
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
    error,
  } = useInfiniteQuotes({ search, category });

  const quotes = data?.pages?.flatMap((d) => d.data);
  const shuffledQuotes = shuffle(quotes? quotes : []);

  if (isLoading) return <ExploreLoading noHeader />;

  if (isError)
    return <ExploreError onClick={refetch} message={error.message} />;

  return (
    <section className="favquotecard-container">
      {shuffledQuotes.map((quote) => {
        return (
          <ExpQuoteCard
            key={quote.id}
            quote={{
              id: quote.id,
              content: quote.content,
              author: quote.author,
              date: new Date(),
              category: quote.category,
            }}
          />
        );
      })}
    </section>
  );
};

export default ExpQuoteList;
