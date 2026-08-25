import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        boutique: resolve(__dirname, 'boutique.html'),
        contact: resolve(__dirname, 'contact.html'),
        produit: resolve(__dirname, 'produit.html'),
      },
    },
  },
});
