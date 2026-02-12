import { defineConfig } from 'vitest/config'
import path from 'path'

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
    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'text-summary', 'lcov'],
      // Exclude non-source files from coverage
      exclude: [
        'node_modules/**',
        'build/**',
        'dist/**',
        '.docusaurus/**',
        'e2e/**',
        'src/__mocks__/**',
        'src/test-setup.ts',
        '**/*.test.ts',
        '**/*.test.tsx',
        '**/*.spec.ts',
        '**/*.d.ts',
        'vitest.config.ts',
        'docusaurus.config.ts',
        'playwright.config.ts',
        'sidebars.ts',
        'babel.config.js',
      ],
      // Coverage thresholds — Phase 5 quality gates
      thresholds: {
        statements: 75,
        branches: 70,
        functions: 75,
        lines: 75,
      },
    },
  },
  // Configure esbuild for JSX
  esbuild: {
    jsx: 'automatic',
  },
  // Resolve aliases for Docusaurus modules (used in testing)
  resolve: {
    alias: {
      '@theme/Layout': path.resolve(__dirname, 'src/__mocks__/@theme/Layout.tsx'),
      '@theme/Heading': path.resolve(__dirname, 'src/__mocks__/@theme/Heading.tsx'),
      '@docusaurus/Link': path.resolve(__dirname, 'src/__mocks__/@docusaurus/Link.tsx'),
      '@docusaurus/Translate': path.resolve(__dirname, 'src/__mocks__/@docusaurus/Translate.tsx'),
      '@theme-original/DocItem/Footer': path.resolve(__dirname, 'src/__mocks__/@theme-original/DocItem/Footer.tsx'),
      '@site/src/components/TipButton': path.resolve(__dirname, 'src/__mocks__/@site/src/components/TipButton.tsx'),
      '@site': path.resolve(__dirname, '.'),
    },
  },
})
