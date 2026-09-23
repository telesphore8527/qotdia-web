import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.css'
import './styles/tokens.css'

import '@fontsource/poppins'
import '@fontsource/poppins/700'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <App />
  // </StrictMode>,
)
