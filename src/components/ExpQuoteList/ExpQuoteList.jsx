import "./ExpQuoteList.css";
import { useInfiniteQuotes } from "../../hooks/useInfiniteQuotes";
import {
  ExploreLoading,
  ExploreLoadingMore,
} from "../LoadingState/LoadingState";
import { ExploreError } from "../ErrorState/ErrorState";
import ExpQuoteCard from "../ExpQuoteCard/ExpQuoteCard";
import shuffle from "../../utils/shuffle";
import { ExploreEmpty } from "../EmptyState/EmptyState";
import { useEffect, useMemo } from "react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
const ExpQuoteList = ({
  search,
  setSearch,
  category,
  setCategory,
  setOnreset,
}) => {
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
    fetchNextPage,
    refetch,
    error,
  } = useInfiniteQuotes({ search, category });
  const { targetRef, isIntersecting } = useIntersectionObserver({
    enabled: hasNextPage,
    rootMargin: "400px",
  });

  const handleReset = () => {
    setSearch("");
    setCategory("");
    setOnreset((prev) => prev + 1);
  };

  const quotes = data?.pages?.flatMap((d) => d.data);
  const shuffledQuotes = useMemo(
    () => shuffle(data?.pages?.flatMap((d) => d.data) ?? []),
    [data]
  );

  useEffect(() => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage, fetchNextPage]);

  if (isLoading) return <ExploreLoading noHeader />;

  if (isError && !data)
    return <ExploreError onClick={refetch} message={error.message} />;

  if (shuffledQuotes.length === 0)
    return <ExploreEmpty onClick={() => handleReset} />;

  return (
    <section className="favquotecard-container">
      {quotes.map((quote) => {
        return (
          <ExpQuoteCard
            key={quote.id}
            quote={quote}
          />
        );
      })}

      {hasNextPage && (
        <div
          className="sentinel"
          ref={targetRef}
          style={{ cursor: "pointer", height: "1px" }}
        >
        </div>
      )}

      {hasNextPage && isFetchingNextPage && (
        <div>
          <ExploreLoading noHeader cardNumber={1} />
          <ExploreLoadingMore />
        </div>
      )}

      {!hasNextPage && quotes.length !== 0 && (
        <p
          style={{ textAlign: "center", color: "var(--color-text-secondary)" }}
        >
          You reached the end of the list !!{" "}
        </p>
      )}

      {isFetchNextPageError && !isFetchingNextPage &&(
        <div
          style={{ textAlign: "center", color: "var(--color-text-secondary)" }}
        >
          Error while fetching more quotes!
          <button
            style={{
              color: "var(--color-primary)",
              padding: ".5rem",
              background: "none",
            }}
            onClick={fetchNextPage}
          >
            retry
          </button>
        </div>
      )}
    </section>
  );
};

export default ExpQuoteList;
