import { defineConfig, loadEnv } from "vite";
import process from "process";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const API_BASE = (
    env.VITE_API_BASE_URL || "http://localhost:8000/api/v1"
  ).replace(/\/$/, "");

  const api = (path) => new RegExp("^" + esc(API_BASE) + path + "(\\?.*)?$");

  return {
    plugins: [
      react(),
      VitePWA({
        registerType: "prompt",
        includeAssets: [
          "icons/apple-touch-icon.png",
          "icons/favicon.ico",
          "logo.png",
          "logo.svg",
        ],
        manifest: {
          name: "Qotdia",
          short_name: "Qotdia",
          description: "Your daily dose of inspiration.",
          lang: "en",
          start_url: "/",
          scope: "/",
          display: "standalone",
          background_color: "#0a1628",
          theme_color: "#6c5ce7",
          orientation: "portrait",
          icons: [
            { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
            { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
            {
              src: "/icons/maskable-512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "maskable",
            },
          ],
        },
        workbox: {
          navigateFallback: "/index.html",
          cleanupOutdatedCaches: true,
          runtimeCaching: [
            {
              urlPattern: api("/quotes/random"),
              handler: "NetworkOnly",
            },
            {
              urlPattern: api("/quotes/today(/image)?"),
              handler: "NetworkFirst",
              options: {
                cacheName: "qotd",
                networkTimeoutSeconds: 3,
                expiration: { maxEntries: 5, maxAgeSeconds: 60 * 60 * 24 },
                cacheableResponse: { statuses: [200] },
              },
            },
            {
              urlPattern: api("/(quotes|categories/[^/?]+/quotes)/?"),
              handler: "NetworkFirst",
              options: {
                cacheName: "feed",
                networkTimeoutSeconds: 4,
                expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 3 },
                cacheableResponse: { statuses: [200] },
                plugins: [
                  {
                    cacheKeyWillBeUsed: async ({ request }) => {
                      const u = new URL(request.url);
                      u.searchParams.delete("seed");
                      return u.href;
                    },
                  },
                ],
              },
            },
            {
              urlPattern: api("/(quotes/[^/?]+|categories(/[^/?]+)?)/?"),
              handler: "StaleWhileRevalidate",
              options: {
                cacheName: "static-data",
                expiration: { maxEntries: 60, maxAgeSeconds: 60 * 60 * 24 * 7 },
                cacheableResponse: { statuses: [200] },
              },
            },
          ],
          importScripts: ["periodic-sync.js"],
        },
      }),
    ],
  };
});
