import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import Profile from '../Components/Profile'

export const Route = createFileRoute('/Profile')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Profile/>
}
