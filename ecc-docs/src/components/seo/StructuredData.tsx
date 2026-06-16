/**
 * Structured Data (JSON-LD) Generators
 * 
 * Generates structured data for better SEO and rich snippets
 */

import React from 'react'
import { sanitizeForJsonLd } from '../shared/utils'

// ============================================
// Types
// ============================================
interface ArticleSchemaInput {
  title: string
  description: string
  datePublished: string
  dateModified?: string
  author: string
  image?: string
  url?: string
}

interface HowToStep {
  name: string
  text: string
  image?: string
}

interface HowToSchemaInput {
  name: string
  description: string
  steps: HowToStep[]
  totalTime?: string
  image?: string
}

interface WebsiteSchemaInput {
  name: string
  url: string
  description: string
  searchUrl?: string
}

// ============================================
// Article Schema Generator
// ============================================
export function generateArticleSchema(input: ArticleSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: sanitizeForJsonLd(input.title),
    description: sanitizeForJsonLd(input.description),
    datePublished: input.datePublished,
    dateModified: input.dateModified || input.datePublished,
    author: {
      '@type': 'Person',
      name: sanitizeForJsonLd(input.author),
    },
    image: input.image || undefined,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': input.url || undefined,
    },
  }
}

// ============================================
// HowTo Schema Generator
// ============================================
export function generateHowToSchema(input: HowToSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: sanitizeForJsonLd(input.name),
    description: sanitizeForJsonLd(input.description),
    totalTime: input.totalTime,
    image: input.image,
    step: input.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: sanitizeForJsonLd(step.name),
      text: sanitizeForJsonLd(step.text),
      image: step.image,
    })),
  }
}

// ============================================
// WebSite Schema Generator
// ============================================
export function generateWebsiteSchema(input: WebsiteSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: sanitizeForJsonLd(input.name),
    url: input.url,
    description: sanitizeForJsonLd(input.description),
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${input.searchUrl || input.url + '/search'}?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

// ============================================
// JSON-LD Script Component Helper
// ============================================
export function StructuredDataScript({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
