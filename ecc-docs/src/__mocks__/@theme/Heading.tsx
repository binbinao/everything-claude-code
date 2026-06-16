import React from 'react'

export default function Heading({ children, as: Tag = 'h1' }: { children: React.ReactNode; as?: string }) {
  const Element = Tag as keyof JSX.IntrinsicElements
  return <Element>{children}</Element>
}
