import './index.css';

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import ContainerApp from './app/container.app.jsx'

const element: Element = document.getElementById('root') as HTMLElement

createRoot(element).render(
  <StrictMode>
    <ContainerApp />
  </StrictMode>,
)
