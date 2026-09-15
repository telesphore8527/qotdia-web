import { useQuery } from "@tanstack/react-query";
import { getQuoteOfToday } from "../api/quoteOfToday";

export const useQuoteOfToday = () => {
  return new useQuery({
    queryKey: ["quotes", "daily"],
    queryFn: () => getQuoteOfToday(),
  });
};
