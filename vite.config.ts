import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // This allows the build process to inject the API key from Render's environment variables
    // We add || '' to ensure it doesn't return undefined, which would leave 'process.env' in the code causing a crash
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || '')
  }
});