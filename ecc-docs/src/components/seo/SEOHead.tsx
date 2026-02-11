/**
 * SEO Head Component
 * 
 * Provides SEO utilities for meta tags, OpenGraph, and Twitter cards
 */

import React from 'react'

// ============================================
// Types
// ============================================
interface SEOHeadProps {
  title: string
  description: string
  image?: string
  url?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  author?: string
}

interface OGTagsInput {
  title: string
  description: string
  image?: string
  url?: string
  type?: string
}

interface TwitterMetaInput {
  title: string
  description: string
  image?: string
}

// ============================================
// OpenGraph Tags Generator
// ============================================
export function generateOGTags(input: OGTagsInput) {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
  
  return {
    ogTitle: input.title,
    ogDescription: input.description,
    ogImage: input.image || '/img/og-default.png',
    ogUrl: input.url ? `${baseUrl}${input.url}` : baseUrl,
    ogType: input.type || 'website',
  }
}

// ============================================
// Twitter Card Meta Generator
// ============================================
export function generateTwitterMeta(input: TwitterMetaInput) {
  return {
    card: 'summary_large_image' as const,
    title: input.title,
    description: input.description,
    image: input.image || '/img/twitter-default.png',
  }
}

// ============================================
// SEO Head Component
// ============================================

// Try to import Docusaurus Head, fall back to a simple wrapper
let Head: React.ComponentType<{ children: React.ReactNode }>

try {
  // This will work in Docusaurus environment
  Head = require('@docusaurus/Head').default
} catch {
  // Fallback for testing environment
  Head = ({ children }: { children: React.ReactNode }) => <>{children}</>
}

export function SEOHead({
  title,
  description,
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
}: SEOHeadProps) {
  const ogTags = generateOGTags({ title, description, image, url, type })
  const twitterMeta = generateTwitterMeta({ title, description, image })

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogTags.ogType} />
      <meta property="og:url" content={ogTags.ogUrl} />
      <meta property="og:title" content={ogTags.ogTitle} />
      <meta property="og:description" content={ogTags.ogDescription} />
      <meta property="og:image" content={ogTags.ogImage} />

      {/* Twitter */}
      <meta property="twitter:card" content={twitterMeta.card} />
      <meta property="twitter:url" content={ogTags.ogUrl} />
      <meta property="twitter:title" content={twitterMeta.title} />
      <meta property="twitter:description" content={twitterMeta.description} />
      <meta property="twitter:image" content={twitterMeta.image} />

      {/* Article specific */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
    </Head>
  )
}

export default SEOHead
