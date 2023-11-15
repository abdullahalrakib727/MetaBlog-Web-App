import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router/Router.jsx'
import AuthProvider from './Providers/AuthProvider.jsx'
import { SkeletonTheme } from 'react-loading-skeleton'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SkeletonTheme baseColor="#FFE7B1" highlightColor="#1976D2">
    <AuthProvider>
      <RouterProvider router={router} />
      </AuthProvider>
    </SkeletonTheme>
      
  </React.StrictMode>,
)
