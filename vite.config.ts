import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base: "/",
  server: {
    host: "::",
    port: 5173,
    proxy: {
      '/api/tmp': {
        target: 'https://api.truckersmp.com/v2',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/tmp/, ''),
      },
    },
  },
  preview: {
    proxy: {
      '/api/tmp': {
        target: 'https://api.truckersmp.com/v2',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/tmp/, ''),
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
