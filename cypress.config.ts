import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    // Use environment variable for baseUrl
    baseUrl: process.env.RENTORA_FRONTEND_BASE_URL,

    setupNodeEvents(on, config) {
      // You can add any Node event listeners here if needed
      return config
    },
  },
})
