import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Router/Router.jsx'
import Store from './Redux/Store.js'
import {Provider} from 'react-redux'

createRoot(document.getElementById('root')).render(
  <StrictMode>
<Provider store={Store}>
     <RouterProvider router={router}></RouterProvider>
</Provider>
   
  </StrictMode>,
)
