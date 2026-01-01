import './index.css';

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import ContainerApp from './app/container.app.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContainerApp />
  </StrictMode>,
)
