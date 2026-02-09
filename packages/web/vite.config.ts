import path from "path"
import { defineConfig } from 'vite'
import ReactPlugin from '@vitejs/plugin-react'
import UnoCssPlugin from 'unocss/vite'
import { analyzer as AnalyzerPlugin } from 'vite-bundle-analyzer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    AnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: true,
      enabled: !!process.env.ANALYZE,
    }),
    ReactPlugin(),
    UnoCssPlugin(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          ourtime: ['@ourtime/datatypes', '@ourtime/store'],
          lib: ['react', 'react-dom/client'],
          'lib-r': ['react-router'],
          obutton: [
            '@/components/O/OBaseButton',
            '@/components/O/OCancelButton',
            '@/components/O/ODeleteButton',
            '@/components/O/OEditButton',
            '@/components/O/OButtonSuspense',
            '@/components/O/OSaveButton',
            '@/components/O/OGroupAddButton',
            '@/components/O/OPersonAddButton',
          ],
          'common-ui': ['@/components/ui/spinner', '@/components/ui/skeleton'],
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
