import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Qotdia",
        short_name: "Qotdia",
        description: "votre dose quotidienne d'inspiration.",
        theme_color: "#6c5ce7",
        icons: [
          { src: "/icons/icon-192", sizes: "192*192", type: "image/png" },
          { src: "/icons/icon-512", sizes: "512*512", type: "image/png" },
          {
            src: "/icons/maskable",
            sizes: "512*512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
});
