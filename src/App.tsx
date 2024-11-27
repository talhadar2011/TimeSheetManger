
import { createRouter, RouterProvider } from '@tanstack/react-router'
import './App.css'
import { routeTree } from './routeTree.gen'

function App() {
 const router = createRouter({routeTree})
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
