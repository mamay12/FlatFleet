import react from '@vitejs/plugin-react';

export default function defineConfig() {
  return {
    plugins: [
      react(),
    ],
    build: {
      outDir: 'build',
      reportCompressedSize: false,
    },
  };
};
