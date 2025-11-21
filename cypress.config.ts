import { defineConfig } from 'cypress'

export default defineConfig({
  trashAssetsBeforeRuns: false,
  e2e: {
    env: {
      apiBaseUrl: 'http://localhost:8081', // backend
      uiBaseUrl: 'http://localhost:5173', // frontend
    },
    viewportWidth: 1920,
    viewportHeight: 1080,
  },

  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
    specPattern: 'cypress/component/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/component.ts',
  },
})
