import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/Main')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/Main"!</div>
}