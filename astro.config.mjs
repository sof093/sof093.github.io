// @ts-check
import { defineConfig } from "astro/config";

// React
import react from "@astrojs/react";

// Tailwind
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  integrations: [react()], // <- ACTIVA React en Astro
  vite: {
    plugins: [tailwindcss()],
  },
});
