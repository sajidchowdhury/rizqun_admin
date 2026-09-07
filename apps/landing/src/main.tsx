import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { LandingContentProvider } from './lib/landing-content'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LandingContentProvider>
      <App />
    </LandingContentProvider>
  </StrictMode>,
)
