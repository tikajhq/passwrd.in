import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import fs from 'fs'
import path from 'path'

// Get all blog post slugs for SSG
function getBlogRoutes() {
  const postsDir = path.resolve(process.cwd(), 'src/posts')
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'))
  return files.map(f => `/blog/${f.replace('.md', '')}`)
}

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer,
      ],
    },
  },
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    dirStyle: 'nested', // Creates /blog/index.html instead of blog.html
    includedRoutes(paths, routes) {
      // Add dynamic blog post routes
      return paths.concat(getBlogRoutes())
    },
  },
})
