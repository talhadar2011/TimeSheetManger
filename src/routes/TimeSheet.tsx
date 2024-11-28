import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import TimeSheet from '../Components/TimeSheet'

export const Route = createFileRoute('/TimeSheet')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div><TimeSheet/></div>
}
