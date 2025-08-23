import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Popup from './popup/Popup.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Popup/>
  </StrictMode>,
)
