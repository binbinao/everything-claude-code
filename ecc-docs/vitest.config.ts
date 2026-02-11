import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // Use jsdom for React component testing
    environment: 'jsdom',
    // Setup files for testing library
    setupFiles: ['./src/test-setup.ts'],
    // Exclude e2e tests from Vitest - they run with Playwright
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/e2e/**',
      '**/*.spec.ts',
    ],
    // Include unit tests and component tests
    include: ['**/*.test.ts', '**/*.test.tsx'],
    // Global test utilities
    globals: true,
    // Dependencies to inline for ESM compatibility
    deps: {
      inline: [/@docusaurus/, /@testing-library/],
    },
  },
  // Configure esbuild for JSX
  esbuild: {
    jsx: 'automatic',
  },
})
