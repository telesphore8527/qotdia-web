import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { getQuotes } from "../api/quotes";

export function useInfiniteQuotes({ search = "", category = "", perPage = 10 } = {}) {
  return useInfiniteQuery({
    queryKey: [
      "quotes",
      {
        search,
        category,
        perPage,
      },
    ],
    queryFn: ({ pageParam = 1 }) =>
      getQuotes({ page: pageParam, perPage, search, category }),
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.meta.current_page;
      const lastPageNumber = lastPage.meta.last_page;

      if (currentPage < lastPageNumber) {
        return currentPage + 1;
      }

      return undefined;
    },
    placeholderData: keepPreviousData
  });
}
