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
      <div className='HeaderLayout'>
        <Header /> {/* Common Header */}
        <div className='SidebarLayout'>
          <Sidebar /> {/* Common Sidebar */}
          <div className='MainLayout' >
            <Outlet /> {/* Render child routes here */}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
