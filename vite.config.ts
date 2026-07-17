import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

// GitHub Pages serves from https://<user>.github.io/<repo>/, so production assets must be
// requested from that sub-path. We set the base by Vite command (not an env var) to avoid
// Git-Bash/MSYS mangling a leading-slash value like "/bsf-portal/" into a Windows path.
const REPO_BASE = "/bsf-portal/";

export default defineConfig(({ command }) => ({
  base: command === "build" ? REPO_BASE : "/",
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
}));
