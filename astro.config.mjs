// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ["primereact"],
    },
    // React 19 + Vite: react-dom/client CJS → ESM 변환 시 createRoot export 누락 방지
    optimizeDeps: {
      include: ["react", "react-dom", "react-dom/client"],
    },
  },

  adapter: netlify({
    cacheOnDemandPages: true,
  }),
});
