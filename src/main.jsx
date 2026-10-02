import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.css'
import './styles/tokens.css'

import '@fontsource/poppins'
import '@fontsource/poppins/700'
import App from './App.jsx'
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)
