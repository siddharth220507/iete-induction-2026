import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  // Relative base so dist/index.html also works when opened directly from disk.
  base: "./",
  plugins: [react(), tailwindcss()],
});
