import React from 'react'

export default function Link({ children, to, className }: { children: React.ReactNode; to: string; className?: string }) {
  return <a href={to} className={className}>{children}</a>
}
