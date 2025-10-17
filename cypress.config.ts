import { defineConfig } from 'cypress'

export default defineConfig({
  trashAssetsBeforeRuns: false,
  e2e: {
    baseUrl: 'http://localhost:5173',
    env: {
      apiBaseUrl: 'http://localhost:8081', // backend
      uiBaseUrl: 'http://localhost:5173', // frontend
    },
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
})
