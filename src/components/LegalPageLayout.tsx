import { ReactNode } from "react";
import { Phone, Mail, MapPin, ArrowLeft } from "lucide-react";
import { trackTelephoneClick } from "@/lib/tracking";

const BUSINESS_PHONE = "(856) 874-6640";
const BUSINESS_PHONE_TEL = "+18568746640";
const BUSINESS_EMAIL = "cleangutters2008@gmail.com";

export function LegalPageLayout({
  title,
  effectiveDate,
  children,
}: {
  title: string;
  effectiveDate: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <img
              src="/images/1762607687527.jpg"
              alt="CleanGutters logo"
              className="w-9 h-9 rounded-lg object-cover"
            />
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">
              Clean<span className="text-emerald-600">Gutters</span>
            </span>
          </a>
          <div className="flex items-center gap-4">
            <a
              href={`tel:${BUSINESS_PHONE_TEL}`}
              onClick={trackTelephoneClick}
              className="hidden sm:flex items-center gap-2 text-slate-700 font-semibold hover:text-emerald-700 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm">{BUSINESS_PHONE}</span>
            </a>
            <a
              href="/"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-5 py-2.5 rounded-lg shadow-md transition-all duration-200 hover:shadow-lg"
            >
              Back Home
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1 py-12 sm:py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-emerald-700 hover:text-emerald-800 font-semibold mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </a>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            {title}
          </h1>
          <p className="text-sm text-slate-500 mb-10">
            Effective date: {effectiveDate}
          </p>

          <article className="prose prose-slate max-w-none space-y-8 text-slate-700 leading-relaxed">
            {children}
          </article>

          <div className="mt-16 pt-8 border-t border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Contact Us</h2>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-center gap-2">
                <span className="font-semibold text-slate-900">
                  CleanGutters Gutter Guards
                </span>
              </li>
              <li className="text-sm text-slate-600">
                A service of CleanGutters Lighting
              </li>
              <li className="flex items-center gap-2 mt-2">
                <MapPin className="w-4 h-4 text-emerald-600" />
                Cherry Hill, NJ 08002
              </li>
              <li>
                <a
                  href={`tel:${BUSINESS_PHONE_TEL}`}
                  onClick={trackTelephoneClick}
                  className="flex items-center gap-2 hover:text-emerald-700 transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-600" />
                  {BUSINESS_PHONE}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BUSINESS_EMAIL}`}
                  className="flex items-center gap-2 hover:text-emerald-700 transition-colors"
                >
                  <Mail className="w-4 h-4 text-emerald-600" />
                  {BUSINESS_EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <LegalFooter />
    </div>
  );
}

function LegalFooter() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
        <p className="text-white font-semibold">CleanGutters Gutter Guards</p>
        <p>A service of CleanGutters Lighting</p>
        <p className="mt-1">Cherry Hill, NJ 08002</p>
        <p className="mt-1">
          <a href={`tel:${BUSINESS_PHONE_TEL}`} onClick={trackTelephoneClick} className="hover:text-emerald-400">
            {BUSINESS_PHONE}
          </a>
          {" · "}
          <a href={`mailto:${BUSINESS_EMAIL}`} className="hover:text-emerald-400">
            {BUSINESS_EMAIL}
          </a>
        </p>
        <p className="mt-1">
          Serving homeowners within approximately 50 miles of North Wales,
          Pennsylvania. Cherry Hill, NJ headquarters.
        </p>
        <p className="mt-4 text-slate-500">
          &copy; {new Date().getFullYear()} CleanGutters Lighting. All rights
          reserved.
        </p>
        <p className="mt-3 text-slate-500">
          <a href="/privacy" className="hover:text-emerald-400">
            Privacy Policy
          </a>
          {" · "}
          <a href="/terms" className="hover:text-emerald-400">
            Terms of Service
          </a>
        </p>
      </div>
    </footer>
  );
}

export function Section({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
        {heading}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
