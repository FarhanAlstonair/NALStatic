import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const baseConfig = {
  plugins: [react()],
  define: {
    'process.env': {}
  }
}

export default defineConfig(baseConfig)

// Compiler disabled - SDK translation works without additional setup
// To enable compiler, configure LLM models as per Lingo.dev documentation