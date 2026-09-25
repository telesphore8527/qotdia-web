import { useQuery } from "@tanstack/react-query";
import { getDailyQuote } from "../api/dailyQuote";

export const useDailyQuote = () => {
  return new useQuery({
    queryKey: ["quotes", "daily"],
    queryFn: () => getDailyQuote(),
  });
};
