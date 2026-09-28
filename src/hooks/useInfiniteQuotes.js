import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { getQuotes } from "../api/quotes";
import { useState } from "react";

export function useInfiniteQuotes({ search = "", category = "", perPage = 10, sort="feed", } = {}) {
  const [seed] = useState(()=>crypto.randomUUID())
  return useInfiniteQuery({
    queryKey: [
      "quotes",
      {
        search,
        category,
        perPage,
        sort,
        seed
      },
    ],
    queryFn: ({ pageParam = 1 }) =>
      getQuotes({ page: pageParam, perPage, search, category, sort, seed }),
    getNextPageParam: ({meta}) => {
      const currentPage = meta.current_page;
      const lastPageNumber = meta.last_page;

      if (currentPage < lastPageNumber) {
        return currentPage + 1;
      }

      return undefined;
    },
    placeholderData: keepPreviousData
  });
}
