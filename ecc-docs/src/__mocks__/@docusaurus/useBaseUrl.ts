// Mock for @docusaurus/useBaseUrl - returns path as-is in test environment
export default function useBaseUrl(url: string): string {
  return url
}
