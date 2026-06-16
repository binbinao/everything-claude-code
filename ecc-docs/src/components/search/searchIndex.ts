/**
 * Search Index Module
 * 
 * Simple client-side search index using Fuse.js-like fuzzy search
 */

interface SearchDocument {
  title: string
  url: string
  snippet?: string
  content?: string
  category?: string
}

interface SearchResult {
  title: string
  url: string
  snippet: string
  score?: number
}

// Default search index - in production, this would be generated at build time
const defaultSearchIndex: SearchDocument[] = [
  {
    title: 'Getting Started',
    url: '/docs/quick-start',
    content: 'Learn how to get started with Everything Claude Code. Installation and setup guide.',
    category: 'Quick Start'
  },
  {
    title: 'Commands Overview',
    url: '/docs/core-concepts/commands',
    content: 'All available slash commands in ECC. Plan, TDD, E2E, Code Review, and more.',
    category: 'Core Concepts'
  },
  {
    title: 'TDD Guide',
    url: '/docs/tutorials/tdd-masterclass',
    content: 'Test-Driven Development masterclass. Red, green, refactor cycle explained.',
    category: 'Tutorials'
  },
  {
    title: 'Agents',
    url: '/docs/core-concepts/agents',
    content: 'Understanding agents in ECC. Planner, TDD guide, E2E runner, and custom agents.',
    category: 'Core Concepts'
  },
  {
    title: 'Hooks',
    url: '/docs/core-concepts/hooks',
    content: 'Automation hooks for pre and post tool execution. Custom workflow automation.',
    category: 'Core Concepts'
  },
]

// Active search index (replaced immutably)
let searchIndex: SearchDocument[] = [...defaultSearchIndex]

/**
 * Simple fuzzy search implementation
 */
function fuzzyMatch(text: string, query: string): number {
  const lowerText = text.toLowerCase()
  const lowerQuery = query.toLowerCase()
  
  // Exact match gets highest score
  if (lowerText.includes(lowerQuery)) {
    return 1
  }
  
  // Check for partial matches (typo tolerance)
  let matchCount = 0
  const queryChars = lowerQuery.split('')
  
  for (const char of queryChars) {
    if (lowerText.includes(char)) {
      matchCount++
    }
  }
  
  return matchCount / queryChars.length
}

/**
 * Build search index from document sources.
 * In production, this would scan the docs directory at build time
 * and create a comprehensive search index.
 *
 * @param documents - Optional custom documents to index
 * @returns The built search index
 */
export function buildSearchIndex(documents?: SearchDocument[]): SearchDocument[] {
  if (documents) {
    // Immutable replacement - create a new array instead of mutating
    searchIndex = [...documents]
  }
  return [...searchIndex]
}

/**
 * Search documents by query
 */
export async function searchDocuments(query: string): Promise<SearchResult[]> {
  if (!query.trim()) {
    return []
  }
  
  const results: SearchResult[] = []
  
  for (const doc of searchIndex) {
    const titleScore = fuzzyMatch(doc.title, query) * 2 // Title matches weighted higher
    const contentScore = fuzzyMatch(doc.content || '', query)
    const combinedScore = (titleScore + contentScore) / 3
    
    if (combinedScore > 0.3) { // Minimum threshold
      results.push({
        title: doc.title,
        url: doc.url,
        snippet: doc.content?.slice(0, 150) + '...' || '',
        score: combinedScore,
      })
    }
  }
  
  // Sort by score descending
  results.sort((a, b) => (b.score || 0) - (a.score || 0))
  
  return results
}

/**
 * Get all documents (for full index)
 */
export function getAllDocuments(): SearchDocument[] {
  return searchIndex
}
