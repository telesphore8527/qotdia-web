import { useFavoriteStore } from "../store/useFavoriteStore";

export const useQuoteActions = () => {
  const copyQuote = (quote) =>
    navigator.clipboard.writeText(`${quote.content} - ${quote.author}`);

  const shareQuote = (quote) => {
    try {
      navigator.share({
        title: "discover this quote - qotdia",
        text: `${quote.content} - ${quote.author}`,
        url: window.location.href==="https://qotdia.com" ? "https://api.qotdia.com/api/v1/quotes/today/image" : window.location.href,
      });
    } catch (e) {
      console.log(e);
      navigator.clipboard.writeText(`${quote.content} - ${quote.author}`);
    }
  };

  //   const toggleFavorite = (quote)=>useFavoriteStore((state)=>{state.toggleFavorite(quote)})

  return {
    copyQuote,
    shareQuote,
    isFavorite: useFavoriteStore((s) => s.isFavorite),
    toggleFavorite: useFavoriteStore((s) => s.toggleFavorite),
  };
};
