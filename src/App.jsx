import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { queryClient } from "./lib/queryClient";
import { useUiStore } from "./store/useUiStore";
import { useEffect } from "react";

export default function App() {
  const { theme } = useUiStore();

  useEffect(() => {
    // setTheme("light");
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
