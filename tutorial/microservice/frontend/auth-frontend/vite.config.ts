import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    watch: {
      usePolling: true, // 👈 Bắt buộc nếu dùng Docker trên Windows/macOS
      interval: 100, // 👈 Khoảng thời gian polling
    },
  },
});
