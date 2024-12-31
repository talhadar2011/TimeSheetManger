import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import Header from '../Components/Header'
import Sidebar from '../Components/Sidebar'
import "../CSS/Layout.css"
import { useState } from 'react'
import SignIn from '../Components/SignIn'
export const Route = createRootRoute({
  component: RootComponent,
})
function RootComponent() {
  // if(!User)
  // {
  //   return(
  //     <SignIn
  //     />
  //   )
  // }else{
    return (
      <React.Fragment>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
    <Header /> 
    <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
      <Sidebar /> 
       <main style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        <Outlet /> 
      </main> 
    </div>
  </div>
  
      </React.Fragment>
    )
  }
 
//}
