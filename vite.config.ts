import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import dyadComponentTagger from '@dyad-sh/react-vite-component-tagger';

// https://vite.dev/config/
export default defineConfig({
  plugins: [dyadComponentTagger(), 
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'GardeFlash - SPV',
        short_name: 'GardeFlash',
        description: 'La meilleure application de gestion des gardes SPV',
        theme_color: '#0f1115',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})
