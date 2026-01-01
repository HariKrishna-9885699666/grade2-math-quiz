import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Grade 2 Math Quiz",
        short_name: "MathQuiz",
        description: "Fun and interactive math quizzes for Grade 2 students!",
        start_url: ".",
        display: "standalone",
        background_color: "#f1f5f9",
        theme_color: "#2563eb",
        icons: [
          {
            src: "/favicon.ico",
            sizes: "48x48 64x64 96x96 128x128 256x256",
            type: "image/x-icon"
          },
          {
            src: "/og-image.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
