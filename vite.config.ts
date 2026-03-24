import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const rawBackend = env.VITE_BACKEND_URL || 'http://localhost:8282/api'
  const proxyTarget = rawBackend.replace(/\/api\/?$/, '') 
  
  return {
    plugins: [react()],
    define: {
      // Provide NODE_ENV for code that checks it, and a global shim for Node-leaning libs
      'process.env.NODE_ENV': JSON.stringify(mode),
      global: 'globalThis',
    },
    build: {
      chunkSizeWarningLimit: 1024,
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react';
            }
            if (id.includes('react-router') || id.includes('react-router-dom')) {
              return 'router';
            }
            if (id.includes('@tanstack/react-query')) {
              return 'tanstack';
            }
            if (id.includes('@radix-ui')) {
              return 'ui';
            }
            if (id.includes('recharts')) {
              return 'charts';
            }
            if (id.includes('@supabase/supabase-js')) {
              return 'supabase';
            }
          }
        }
      }
    },
    server: {
      port: parseInt(env.VITE_PORT) || 8282,
      host: "localhost",
      proxy: {
        "/api": {
          target: proxyTarget,
          changeOrigin: true,
          secure: false,
          // Strip Origin header so backend CORS treats as server-to-server in dev
          // This avoids "Not allowed by CORS" coming from Render when using Vite proxy
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              try { (proxyReq as any).removeHeader?.('origin'); } catch {}
            });
          },
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@api": path.resolve(__dirname, "src/api"),
        "@clients": path.resolve(__dirname, "src/clients"),
        "@components": path.resolve(__dirname, "src/components"),
        "@hooks": path.resolve(__dirname, "src/hooks"),
        "@pages": path.resolve(__dirname, "src/pages"),
        "@sections": path.resolve(__dirname, "src/sections"),
        "@utils": path.resolve(__dirname, "src/utils"),
        "@assets": path.resolve(__dirname, "src/assets"),
        "@config": path.resolve(__dirname, "src/config"),
        "@context": path.resolve(__dirname, "src/context"),
        "@data": path.resolve(__dirname, "src/data"),
        "@lib": path.resolve(__dirname, "src/lib"),
        "@mock": path.resolve(__dirname, "src/mock"),
        "@store": path.resolve(__dirname, "src/store"),
        "@types": path.resolve(__dirname, "src/types"),
      },
      extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".mjs"],
      dedupe: ["react", "react-dom"],
    },
    optimizeDeps: {
      include: ["react", "react-dom"],
      exclude: ["@supabase/supabase-js", "@supabase/postgrest-js", "@supabase/node-fetch"],
    },
  }
})
