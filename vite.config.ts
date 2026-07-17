import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

// GitHub Pages serves from https://<user>.github.io/<repo>/, so production
// assets must be requested from that sub-path. The repo name is set via
// VITE_BASE at build time (defaults to "/bsf-portal/"). Dev uses "/".
const base = process.env.VITE_BASE ?? (process.env.NODE_ENV === "production" ? "/bsf-portal/" : "/");

export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
