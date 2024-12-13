import react from '@vitejs/plugin-react';
import tsconfigPaths from "vite-tsconfig-paths";

export default function defineConfig() {
  return {
    plugins: [
      react(),
        tsconfigPaths()
    ],
    build: {
      outDir: 'build',
      reportCompressedSize: false,
    },

  };
};
