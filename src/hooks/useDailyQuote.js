import { useQuery } from "@tanstack/react-query";
import { fetchDailyQuote } from "../api/quoteOfToday";

export const useDailyQuote = () => {
  return new useQuery({
    queryKey: ["quotes", "daily"],
    queryFn: () => fetchDailyQuote(),
  });
};
