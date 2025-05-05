import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "localhost", // Change "::" to "localhost" for better compatibility
    port: 8080,
    strictPort: true, // Ensure the server serves files correctly
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Ensure alias is correct
    },
  },
  css: {
    preprocessorOptions: {
      css: {
        additionalData: '', // Ensure CSS is processed correctly
      },
    },
  },
});
