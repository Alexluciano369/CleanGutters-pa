import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export function OfferPortal() {
  const [mount, setMount] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const path = window.location.pathname.replace(/\/+$/, '') || '/';
    if (path !== '/' && path !== '/gutter-guards') return;

    const estimate = document.getElementById('estimate');
    if (!estimate) return;

    const container = document.createElement('div');
    container.id = 'gutter-guard-offer';
    estimate.prepend(container);
    setMount(container);

    return () => container.remove();
  }, []);

  if (!mount) return null;

  return createPortal(
    <div className="mb-5 rounded-xl border-2 border-emerald-500 bg-emerald-50 p-4 text-slate-950">
      <p className="text-xs font-black uppercase tracking-wider text-emerald-800">Fall installation offer</p>
      <p className="mt-1 text-2xl font-black">$250 Off Gutter Guards</p>
      <p className="mt-1 text-sm font-bold">Or 10% off for seniors and military—whichever saves more.</p>
      <p className="mt-2 text-xs leading-relaxed text-slate-600">New installations only. Offers cannot be combined. Book by October 31, 2026.</p>
    </div>,
    mount,
  );
}
