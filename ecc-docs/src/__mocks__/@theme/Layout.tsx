import React from 'react'

export default function Layout({ children, title }: { children: React.ReactNode; title?: string }) {
  return <div data-testid="layout" data-title={title}>{children}</div>
}
