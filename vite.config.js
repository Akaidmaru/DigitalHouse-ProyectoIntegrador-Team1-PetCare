import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default ({ mode }) => {
  // Cargar las variables de entorno según el modo (development, production, etc.)
  const env = loadEnv(mode, process.cwd(), '');

  // Solución: Añadir valor por defecto para cuando VITE_API_URL esté vacío
  const API_URL = env.VITE_API_URL || 'http://localhost:8080';

  // Log para depuración durante la construcción
  console.log(`Modo: ${mode}, API URL configurada como: ${API_URL}`);

  return defineConfig({
    plugins: [react()],
    define: {
      'process.env': env
    },
    server: {
      proxy: {
        "/api": {
          target: API_URL,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  });
};
