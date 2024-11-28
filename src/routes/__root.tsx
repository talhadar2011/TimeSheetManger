import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import Header from '../Components/Header'
import Sidebar from '../Components/Sidebar'
import "../CSS/Layout.css"
export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
  <Header /> {/* Common Header */}
  <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
    <Sidebar /> {/* Common Sidebar */}
    <main style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
      <Outlet /> {/* Render child routes here */}
    </main>
  </div>
</div>

    </React.Fragment>
  )
}
