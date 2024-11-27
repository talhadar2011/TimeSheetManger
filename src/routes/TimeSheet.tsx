import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/TimeSheet')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/TimeSheet"!</div>
}
