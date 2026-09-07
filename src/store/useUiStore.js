import { create } from "zustand";

const getInitialTheme = () => {
  const saved = localStorage.getItem("qotdia-theme");

  if (!saved) {
    return window.matchMedia("(prefer-color-scheme:dark)").matches
      ? "dark"
      : "light";
  }

  return saved;
};

export const useUiStore = create((set) => ({
  theme: getInitialTheme(),
  setTheme: (theme) => {
    localStorage.setItem("qotdia-theme", theme);
    set({ theme });
  },
}));
