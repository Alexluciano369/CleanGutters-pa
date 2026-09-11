import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ServiceLandingPage } from './pages/ServiceLandingPage.tsx';
import './index.css';

const path = window.location.pathname.replace(/\/+$/, '') || '/';
const isLegalPage = path === '/privacy' || path === '/terms';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isLegalPage ? <App /> : <ServiceLandingPage />}
  </StrictMode>
);
