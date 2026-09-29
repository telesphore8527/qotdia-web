import localforage from "localforage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useFavoriteStore = create(
  persist(
    (set, get) => ({
      favorites: [],
      isFavorite: (quoteId) => {
        return get().favorites.some((favorite) => favorite.id === quoteId);
      },
      toggleFavorite: (quote) => {
        const favorites = get().favorites;
        const exist = favorites.some((f) => f.id === quote.id);

        if (exist) {
          set({
            favorites: favorites.filter((f) => f.id !== quote.id),
          });
        } else {
          set({
            favorites: [...favorites, {...quote, addedAt: Date.now()}],
          });
        }
      },
    }),
    {
      name: "qotdia-favorites",
      storage: createJSONStorage(() => localforage ),
    }
  )
);
