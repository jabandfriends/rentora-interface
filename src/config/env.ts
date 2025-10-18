export const RENTORA_API_BASE_URL =
  import.meta.env.MODE === 'production'
    ? (window as any).__RENTORA_API_BASE_URL__ || import.meta.env.VITE_RENTORA_API_BASE_URL
    : import.meta.env.VITE_RENTORA_API_BASE_URL || 'http://localhost:8099'
