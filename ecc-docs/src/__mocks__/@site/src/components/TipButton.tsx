import React from 'react'

export default function TipButton({ variant }: { variant?: string }) {
  return <div data-testid="tip-button" data-variant={variant}>TipButton</div>
}
