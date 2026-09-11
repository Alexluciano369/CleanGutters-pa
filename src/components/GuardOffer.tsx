import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { BadgeDollarSign, CheckCircle2 } from 'lucide-react';

export function GuardOffer() {
  const [target, setTarget] = useState<HTMLElement | null>(null);
  const path = window.location.pathname.replace(/\/+$/, '') || '/';

  useEffect(() => {
    if (path !== '/' && path !== '/gutter-guards') return;
    setTarget(document.getElementById('estimate'));
  }, [path]);

  if (!target) return null;

  return createPortal(
    <section className="mb-5 rounded-xl border-2 border-emerald-600 bg-emerald-50 p-4 text-slate-950" aria-label="Gutter guard installation offer">
      <div className="flex items-start gap-3">
        <BadgeDollarSign className="mt-0.5 h-7 w-7 shrink-0 text-emerald-700" />
        <div>
          <p className="text-xl font-black">$250 Off Gutter Guard Installation</p>
          <p className="mt-1 font-bold text-emerald-800">Or 10% off for seniors and military—whichever saves you more.</p>
        </div>
      </div>
      <div className="mt-3 flex items-start gap-2 text-sm text-slate-700">
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
        <p>New installations only. Book your free estimate by October 31, 2026. Discounts cannot be combined.</p>
      </div>
    </section>,
    target
  );
}
