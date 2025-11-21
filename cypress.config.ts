import { defineConfig } from 'cypress'

export default defineConfig({
  trashAssetsBeforeRuns: false,
  e2e: {
    env: {
      apiBaseUrl: 'https://renapie2e.teamforge.cloud', // backend
      uiBaseUrl: 'https://rentorae2e.teamforge.cloud', // frontend
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
