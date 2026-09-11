import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { GuardOffer } from './components/GuardOffer.tsx';
import { ServiceLandingPage } from './pages/ServiceLandingPage.tsx';
import './index.css';

const path = window.location.pathname.replace(/\/+$/, '') || '/';
const legalRoutes = new Set(['/privacy', '/terms']);
const serviceRoutes = new Set([
  '/',
  '/gutter-guards',
  '/gutter-services',
  '/gutter-cleaning',
  '/gutter-repair',
  '/gutter-installation',
]);

function NotFoundPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-24 text-center text-white">
      <p className="font-bold text-emerald-400">CleanGutters Lighting</p>
      <h1 className="mt-3 text-4xl font-black">Page not found</h1>
      <p className="mx-auto mt-4 max-w-xl text-slate-300">
        This address does not match one of our Eastern Pennsylvania gutter-service pages.
      </p>
      <a href="/" className="mt-8 inline-block rounded-xl bg-emerald-600 px-6 py-3 font-black">
        View Eastern PA Gutter Services
      </a>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {legalRoutes.has(path) ? (
      <App />
    ) : serviceRoutes.has(path) ? (
      <>
        <ServiceLandingPage />
        <GuardOffer />
      </>
    ) : (
      <NotFoundPage />
    )}
  </StrictMode>
);
