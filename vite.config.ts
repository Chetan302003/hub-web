import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

function contactDevPlugin() {
  return {
    name: "contact-api-dev-middleware",
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        if (req.url === "/api/contact" || req.url?.startsWith("/api/contact?")) {
          res.status = (code: number) => {
            res.statusCode = code;
            return res;
          };
          res.json = (data: any) => {
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(data));
            return res;
          };
          try {
            const handlerModule = await import("./api/contact.ts");
            const handler = handlerModule.default;
            await handler(req, res);
          } catch (err: any) {
            console.error("[Vite Dev Server] /api/contact error:", err);
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: err.message || "Internal server error" }));
          }
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  Object.assign(process.env, env);

  return {
    base: "/",
    server: {
      host: "::",
      port: 5173,
      proxy: {
        "/api/tmp": {
          target: "https://api.truckersmp.com/v2",
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/api\/tmp/, ""),
        },
      },
    },
    preview: {
      proxy: {
        "/api/tmp": {
          target: "https://api.truckersmp.com/v2",
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/api\/tmp/, ""),
        },
      },
    },
    plugins: [react(), contactDevPlugin()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
