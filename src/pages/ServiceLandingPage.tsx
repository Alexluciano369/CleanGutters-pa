import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Droplets,
  Hammer,
  Leaf,
  Loader2,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  Wrench,
} from "lucide-react";
import {
  trackConfirmedLead,
  trackGoogleAdsLeadConversion,
  trackTelephoneClick,
} from "@/lib/tracking";

const PHONE = "(215) 469-1244";
const PHONE_TEL = "+12154691244";
const REVIEWS_URL = "https://g.page/r/CQgr69prO1cLEAE";
const COUNTIES = [
  "Berks",
  "Bucks",
  "Carbon",
  "Chester",
  "Delaware",
  "Lancaster",
  "Lehigh",
  "Monroe",
  "Montgomery",
  "Northampton",
  "Philadelphia",
  "Pike",
  "Schuylkill",
];

type PageKey = "guards" | "services" | "cleaning" | "repair" | "installation";

type PageConfig = {
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  intro: string;
  service: string;
  cta: string;
  icon: typeof ShieldCheck;
  bullets: string[];
  details: { title: string; text: string }[];
};

const pages: Record<PageKey, PageConfig> = {
  guards: {
    title: "Gutter Guard Installation Eastern PA | CleanGutters Lighting",
    description:
      "Owner-installed stainless-steel micro-mesh gutter guards across 13 Eastern Pennsylvania counties. Lifetime transferable warranty and free estimate.",
    eyebrow: "North Wales + 13 Eastern Pennsylvania Counties",
    h1: "Gutter Guards for North Wales & Eastern Pennsylvania Homes",
    intro:
      "From North Wales across 13 Eastern Pennsylvania counties, Alex installs every job personally—never subcontractors. Get surgical stainless-steel micro-mesh protection, a lifetime transferable warranty and a clear, no-pressure estimate.",
    service: "Gutter Guard Installation",
    cta: "Request My Gutter Guard Estimate",
    icon: ShieldCheck,
    bullets: [
      "Owner-installed by Alex",
      "Surgical stainless-steel micro-mesh",
      "Handles 22+ inches of rain per hour",
      "Lifetime transferable warranty",
    ],
    details: [
      { title: "Keep fine debris out", text: "Micro-mesh blocks leaves, pine needles, shingle grit and roof debris while letting heavy rain through." },
      { title: "Avoid repeat cleaning", text: "If recurring clogs are the problem, we can show you a permanent solution instead of another temporary cleaning." },
      { title: "Know who is on your roof", text: "Alex measures, quotes and installs the job personally rather than handing it to a subcontractor." },
    ],
  },
  services: {
    title: "Gutter Services Eastern PA | Cleaning, Repair & Installation",
    description:
      "Gutter cleaning, repair, downspouts, replacement and gutter guards across 13 Eastern Pennsylvania counties. Free inspection and estimate.",
    eyebrow: "All Gutter Services Across Eastern Pennsylvania",
    h1: "One Local Company for Any Gutter Problem",
    intro:
      "Cleaning, leaks, sagging gutters, downspouts, seamless replacement and permanent micro-mesh guards. Alex inspects the whole system and explains the right fix without pressure.",
    service: "All Gutter Services",
    cta: "Request My Free Gutter Inspection",
    icon: Wrench,
    bullets: [
      "Cleaning and full-system inspection",
      "Leak, pitch, fascia and downspout repair",
      "Seamless gutter replacement",
      "Permanent micro-mesh gutter guards",
    ],
    details: [
      { title: "Start with the real problem", text: "We inspect the gutters, downspouts, pitch, fascia and drainage before recommending work." },
      { title: "Repair when repair makes sense", text: "Loose sections, leaks, bad pitch and downspout problems may not require full replacement." },
      { title: "Upgrade only when it pays", text: "When repeat cleaning or failing gutters cost more over time, we show you guard or replacement options." },
    ],
  },
  cleaning: {
    title: "Gutter Cleaning Eastern PA | Free Gutter-System Inspection",
    description:
      "Professional gutter cleaning and a full gutter-system inspection across Eastern Pennsylvania. No advertised gimmick price, no pressure and no obligation.",
    eyebrow: "Eastern Pennsylvania Gutter Cleaning",
    h1: "Clean Gutters — and Find Problems Before They Get Expensive",
    intro:
      "We clear the gutters and downspouts, then inspect the system for leaks, loose sections, poor drainage and repeat-clog risks. You get a plain explanation of anything we find.",
    service: "Gutter Cleaning & Inspection",
    cta: "Request My Cleaning Estimate",
    icon: Leaf,
    bullets: [
      "Gutters and downspouts cleared",
      "Visual inspection included",
      "No advertised cleaning-price gimmick",
      "Repair and guard options only when needed",
    ],
    details: [
      { title: "Clear the full drainage path", text: "Removing roofline debris is only half the job; downspouts must move water safely away from the home." },
      { title: "Catch damage early", text: "Loose fasteners, open seams, bad pitch and failing fascia are easier to address before the next heavy storm." },
      { title: "Stop the repeat cycle", text: "If the same trees refill your gutters every season, we can show you permanent micro-mesh protection." },
    ],
  },
  repair: {
    title: "Gutter Repair & Downspouts Eastern PA | CleanGutters Lighting",
    description:
      "Fix leaking, sagging or overflowing gutters and damaged downspouts across Eastern Pennsylvania. Full-system inspection and free estimate.",
    eyebrow: "Eastern Pennsylvania Gutter Repair",
    h1: "Fix Leaks, Sagging Gutters and Bad Drainage at the Source",
    intro:
      "We inspect the full water path before repairing loose gutters, failed seams, bad pitch, damaged downspouts, fascia trouble and overflow points.",
    service: "Gutter Repair & Downspouts",
    cta: "Request My Repair Estimate",
    icon: Hammer,
    bullets: [
      "Leaks and failed seams",
      "Sagging or poorly pitched gutters",
      "Downspout repair and drainage correction",
      "Fascia and attachment problems",
    ],
    details: [
      { title: "Fix the cause, not the stain", text: "Overflow can come from clogs, bad pitch, undersized drainage or a damaged gutter run. We identify which one first." },
      { title: "Save sound gutters", text: "If most of the system is still solid, targeted repair can restore flow without unnecessary replacement." },
      { title: "Replace only failed sections", text: "When a section is beyond repair, we explain exactly what should be replaced and why." },
    ],
  },
  installation: {
    title: "Seamless Gutter Installation Eastern PA | CleanGutters Lighting",
    description:
      "Custom seamless gutter installation and replacement across Eastern Pennsylvania. Proper pitch, downspout placement and free estimate.",
    eyebrow: "Eastern Pennsylvania Gutter Installation",
    h1: "Seamless Gutters Measured for Your Home and Its Water Flow",
    intro:
      "New gutters should do more than look clean. We size the system, set the pitch and place downspouts to move roof water away from your foundation.",
    service: "Gutter Installation & Replacement",
    cta: "Request My Installation Estimate",
    icon: Droplets,
    bullets: [
      "Custom seamless gutter runs",
      "Correct pitch and secure attachment",
      "Downspouts placed for drainage",
      "Optional permanent micro-mesh protection",
    ],
    details: [
      { title: "Built around the roof", text: "Roof area, valleys and runoff volume determine gutter size and downspout placement." },
      { title: "Clean, low-leak finish", text: "Seamless runs reduce joints while careful fastening and pitch keep water moving." },
      { title: "Protect the new system", text: "If trees create recurring debris, guards can be installed with the new gutters rather than added later." },
    ],
  },
};

function keyFromPath(path: string): PageKey {
  if (path === "/gutter-services") return "services";
  if (path === "/gutter-cleaning") return "cleaning";
  if (path === "/gutter-repair") return "repair";
  if (path === "/gutter-installation") return "installation";
  return "guards";
}

function setMeta(name: string, content: string) {
  let tag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement("meta");
    tag.name = name;
    document.head.appendChild(tag);
  }
  tag.content = content;
}

export function ServiceLandingPage() {
  const pageKey = keyFromPath(window.location.pathname.replace(/\/+$/, "") || "/");
  const page = pages[pageKey];

  useEffect(() => {
    document.title = page.title;
    setMeta("description", page.description);
    setMeta("robots", "noindex, follow");

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    const path = pageKey === "guards" ? "/" : window.location.pathname.replace(/\/+$/, "");
    canonical.href = `https://cleangutters-pa.com${path}`;

    const oldSchema = document.getElementById("regional-service-schema");
    oldSchema?.remove();
    const schema = document.createElement("script");
    schema.id = "regional-service-schema";
    schema.type = "application/ld+json";
    schema.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      name: page.service,
      provider: {
        "@type": "HomeAndConstructionBusiness",
        name: "CleanGutters Lighting",
        telephone: PHONE_TEL,
        url: "https://cleangutters-pa.com/",
      },
      areaServed: COUNTIES.map((county) => ({
        "@type": "AdministrativeArea",
        name: `${county} County, Pennsylvania`,
      })),
      description: page.description,
    });
    document.head.appendChild(schema);
  }, [page, pageKey]);

  return (
    <div className="min-h-screen bg-white text-slate-900 pb-16 lg:pb-0">
      <Header />
      <Hero page={page} />
      <TrustStrip />
      <ServiceNavigation />
      <Details page={page} />
      <BeforeAfter />
      <Inspection pageKey={pageKey} />
      <ServiceArea />
      <Proof />
      <FAQ pageKey={pageKey} />
      <FinalCTA page={page} />
      <Footer />
      <MobileBar />
    </div>
  );
}

function Header() {
  return (
    <>
      <div className="bg-amber-300 px-4 py-3 text-center text-sm font-black text-amber-950 sm:text-base">SENIORS SAVE 10% — or take $250 off, whichever saves more. New installations only · Book by Oct. 31 · Cannot combine.</div>
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <a href="/" className="font-extrabold tracking-tight text-xl">Clean<span className="text-emerald-600">Gutters</span> Lighting</a>
        <div className="flex items-center gap-3">
          <a href={`tel:${PHONE_TEL}`} onClick={trackTelephoneClick} className="hidden sm:flex items-center gap-2 font-bold text-slate-700"><Phone className="h-4 w-4 text-emerald-600" />{PHONE}</a>
          <a href="#estimate" className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white">Free Estimate</a>
        </div>
      </div>
      </header>
    </>
  );
}

function Hero({ page }: { page: PageConfig }) {
  const Icon = page.icon;
  return (
    <section className="relative overflow-hidden bg-slate-950">
      <img src="/images/cleangutters-completed-roofline.webp" alt="Real CleanGutters Lighting gutter guard installation on an Eastern Pennsylvania home" className="absolute inset-0 h-full w-full object-cover opacity-35" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/95 to-emerald-950/70" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_420px] lg:py-20">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-100"><MapPin className="h-4 w-4" />{page.eyebrow}</div>
          <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl">{page.h1}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-200">{page.intro}</p>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {page.bullets.map((bullet) => <li key={bullet} className="flex items-start gap-2 text-slate-100"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />{bullet}</li>)}
          </ul>
          <a href={`tel:${PHONE_TEL}`} onClick={trackTelephoneClick} className="mt-8 inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 font-bold text-white"><Phone className="h-5 w-5" />Call {PHONE}</a>
        </div>
        <LeadForm page={page} />
      </div>
    </section>
  );
}

function LeadForm({ page }: { page: PageConfig }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const tracking = useMemo(() => Object.fromEntries(new URLSearchParams(window.location.search)), []);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const response = await fetch("https://formsubmit.co/ajax/cleangutters2008@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `New Eastern PA Lead — ${page.service}`,
          name,
          phone,
          service: page.service,
          territory: "Eastern Pennsylvania",
          page_url: window.location.href,
          ...tracking,
        }),
      });
      if (!response.ok) throw new Error("Lead delivery failed");
      trackGoogleAdsLeadConversion();
      trackConfirmedLead("eastern_pa");
      window.gtag?.("event", "generate_lead", { service: page.service, territory: "eastern_pa" });
      setStatus("success");
      setName("");
      setPhone("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div id="estimate" className="scroll-mt-24 rounded-2xl bg-white p-6 shadow-2xl sm:p-7">
      {status === "success" ? (
        <div className="py-10 text-center"><CheckCircle2 className="mx-auto h-14 w-14 text-emerald-600" /><h2 className="mt-4 text-2xl font-black">Your request is in.</h2><p className="mt-2 text-slate-600">Alex will call you about your Pennsylvania gutter project.</p></div>
      ) : (
        <form onSubmit={submit}>
          <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">North Wales + 13 PA counties · Real local work</p>
          <h2 className="mt-1 text-2xl font-black">Get Your Gutter Estimate</h2>
          <p className="mt-2 text-sm text-slate-600">Tell us how to reach you. Alex responds personally.</p>
          <label className="mt-5 block text-sm font-bold">Name</label>
          <input required autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3" />
          <label className="mt-4 block text-sm font-bold">Phone</label>
          <input required type="tel" inputMode="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3" />
          {status === "error" && <p className="mt-3 text-sm font-semibold text-red-700">We could not send the request. Please call {PHONE}.</p>}
          <button disabled={status === "sending"} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-4 text-lg font-black text-white disabled:opacity-60">{status === "sending" ? <><Loader2 className="h-5 w-5 animate-spin" />Sending…</> : <>{page.cta}<ArrowRight className="h-5 w-5" /></>}</button>
          <p className="mt-3 text-center text-xs leading-relaxed text-slate-500">By submitting, you agree that CleanGutters Lighting may contact you one-to-one about this request. No spam · No obligation.</p>
        </form>
      )}
    </div>
  );
}

function TrustStrip() {
  return <section className="border-b border-slate-200 bg-white"><div className="mx-auto grid max-w-7xl grid-cols-2 gap-5 px-4 py-7 text-center sm:grid-cols-4"><Trust value="18 Years" label="Gutter experience" /><Trust value="1,000+" label="Homes served" /><Trust value="$2 Million" label="Liability coverage" /><Trust value="5.0★" label="Google rating" /></div></section>;
}
function Trust({ value, label }: { value: string; label: string }) { return <div><div className="text-xl font-black text-slate-950">{value}</div><div className="text-sm text-slate-500">{label}</div></div>; }

function ServiceNavigation() {
  const links = [["/gutter-services", "All Services"], ["/gutter-cleaning", "Cleaning"], ["/gutter-repair", "Repair & Downspouts"], ["/gutter-installation", "Installation"], ["/", "Gutter Guards"]];
  return <nav className="bg-slate-50"><div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-2 px-4 py-6">{links.map(([href, label]) => <a key={href} href={href} className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:border-emerald-500 hover:text-emerald-700">{label}</a>)}</div></nav>;
}

function Details({ page }: { page: PageConfig }) {
  return <section className="py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6"><div className="mx-auto max-w-3xl text-center"><p className="font-bold text-emerald-700">Inspect first. Recommend second.</p><h2 className="mt-2 text-3xl font-black sm:text-4xl">The Right Fix for the Whole Gutter System</h2></div><div className="mt-10 grid gap-6 md:grid-cols-3">{page.details.map((item) => <article key={item.title} className="rounded-2xl border border-slate-200 p-7 shadow-sm"><CheckCircle2 className="h-8 w-8 text-emerald-600" /><h3 className="mt-4 text-xl font-black">{item.title}</h3><p className="mt-3 leading-relaxed text-slate-600">{item.text}</p></article>)}</div></div></section>;
}

function BeforeAfter() {
  return <section id="real-guard-before-after" className="bg-white py-16"><div className="mx-auto max-w-5xl px-4 sm:px-6"><div className="mx-auto max-w-3xl text-center"><p className="font-bold text-emerald-700">Real local installation</p><h2 className="mt-2 text-3xl font-black sm:text-4xl">Before &amp; After: Open Gutter to Micro-Mesh Protection</h2><p className="mt-4 text-slate-600">The same roofline before and after Alex installed stainless-steel micro-mesh protection.</p></div><div className="mx-auto mt-9 grid max-w-3xl gap-5 sm:grid-cols-2"><figure className="relative overflow-hidden rounded-2xl bg-slate-100 shadow-xl"><picture><source srcSet="/images/gutter-guard-before-real-job.webp" type="image/webp" /><img src="/images/gutter-guard-before-real-job.jpg" alt="Before gutter guard installation: open gutter on a local home" loading="lazy" width="768" height="1024" className="h-auto w-full" /></picture><figcaption className="absolute bottom-4 left-4 rounded-full bg-slate-950/90 px-4 py-2 font-black text-white">Before</figcaption></figure><figure className="relative overflow-hidden rounded-2xl bg-slate-100 shadow-xl"><picture><source srcSet="/images/gutter-guard-after-real-job.webp" type="image/webp" /><img src="/images/gutter-guard-after-real-job.jpg" alt="After gutter guard installation: stainless-steel micro-mesh fitted to the same roofline" loading="lazy" width="768" height="1024" className="h-auto w-full" /></picture><figcaption className="absolute bottom-4 left-4 rounded-full bg-emerald-600 px-4 py-2 font-black text-white">After</figcaption></figure></div><p className="mx-auto mt-5 max-w-2xl text-center text-sm leading-relaxed text-slate-500">Real CleanGutters Lighting work—owner-installed, not a stock photo.</p></div></section>;
}

function Inspection({ pageKey }: { pageKey: PageKey }) {
  return <section className="bg-slate-950 py-16 text-white"><div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-2"><div><picture><source srcSet="/images/alex-owner-installing-gutter-guards.webp" type="image/webp" /><img src="/images/alex-owner-installing-gutter-guards.jpg" alt="Alex, owner of CleanGutters Lighting, personally working on a local roof" loading="lazy" className="mb-7 h-[420px] w-full rounded-2xl object-cover shadow-xl" /></picture><p className="font-bold text-emerald-400">Owner-installed craftsmanship</p><h2 className="mt-2 text-3xl font-black">Alex Looks at the Entire Water Path</h2><p className="mt-4 leading-relaxed text-slate-300">Every estimate considers the roof runoff, gutters, seams, pitch, downspouts, fascia and where the water lands. You get the smallest sensible fix—not a one-size-fits-all sales pitch.</p></div><div className="rounded-2xl border border-slate-700 bg-slate-900 p-7"><ul className="space-y-4">{["Cleaning when debris is the only problem","Repair when the existing system can be saved","Replacement when gutters are failing","Micro-mesh guards when repeat cleaning is the real cost"].map((x) => <li key={x} className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />{x}</li>)}</ul>{pageKey === "cleaning" && <p className="mt-5 text-sm text-slate-400">Cleaning is the starting point—not a reason to push work your home does not need.</p>}</div></div></section>;
}

function ServiceArea() {
  return <section className="bg-slate-50 py-16"><div className="mx-auto max-w-7xl px-4 text-center sm:px-6"><div className="inline-flex items-center gap-2 font-bold text-emerald-700"><MapPin className="h-5 w-5" />13 Eastern Pennsylvania Counties</div><h2 className="mt-2 text-3xl font-black">Local Pages. Exact County Targeting. No 100-Mile Spillover.</h2><p className="mx-auto mt-4 max-w-3xl text-slate-600">We serve the approved Eastern PA area without sending ads into New York, Maryland or unserved western counties.</p><div className="mx-auto mt-8 flex max-w-5xl flex-wrap justify-center gap-2">{COUNTIES.map((county) => <span key={county} className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-bold">{county} County</span>)}</div></div></section>;
}

function Proof() {
  return <section className="py-16"><div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2"><img src="/images/gutter-guard-micro-mesh-installed.webp" alt="Real stainless-steel micro-mesh gutter guard installed by CleanGutters Lighting" className="rounded-2xl shadow-xl" /><div><div className="flex gap-1 text-amber-500">{[1,2,3,4,5].map((n) => <Star key={n} className="h-6 w-6 fill-current" />)}</div><h2 className="mt-4 text-3xl font-black">Concrete Proof, Not Corporate Promises</h2><ul className="mt-6 space-y-4 text-slate-700"><li><strong>18 years</strong> of gutter experience</li><li><strong>1,000+ homes</strong> served across the region</li><li><strong>Owner-installed</strong> work instead of rotating subcontractors</li><li><strong>40–60% less</strong> than large national guard companies on comparable projects</li></ul><a href={REVIEWS_URL} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 font-black text-emerald-700">Read Google reviews <ArrowRight className="h-4 w-4" /></a></div></div></section>;
}

function FAQ({ pageKey }: { pageKey: PageKey }) {
  const questions = [
    ["Which Pennsylvania areas do you serve?", `Berks, Bucks, Carbon, Chester, Delaware, Lancaster, Lehigh, Monroe, Montgomery, Northampton, Philadelphia, Pike and Schuylkill counties.`],
    ["Do you advertise a cheap cleaning price?", "No. Every home and gutter system is different. We provide a clear estimate after understanding the work instead of using a low teaser price."],
    ["Will you recommend gutter guards on every cleaning?", "No. We explain what we find. Guards make sense when repeat debris is the real problem; repairs or cleaning alone may be the right answer."],
    ["Who performs the work?", "Alex handles and installs the work personally rather than sending unknown subcontractors."],
    ["Is the estimate free?", "Yes. The estimate is free, with no spam, no obligation and no pressure."],
  ];
  return <section className="bg-slate-50 py-16"><div className="mx-auto max-w-3xl px-4 sm:px-6"><h2 className="text-center text-3xl font-black">Eastern PA Gutter Questions</h2><div className="mt-8 space-y-3">{questions.map(([q,a]) => <details key={q} className="rounded-xl border border-slate-200 bg-white p-5"><summary className="cursor-pointer font-black">{q}</summary><p className="mt-3 leading-relaxed text-slate-600">{a}</p></details>)}</div>{pageKey !== "services" && <p className="mt-6 text-center text-sm text-slate-500">Not sure which service fits? Start with the <a href="/gutter-services" className="font-bold text-emerald-700">all gutter services page</a>.</p>}</div></section>;
}

function FinalCTA({ page }: { page: PageConfig }) {
  return <section className="bg-emerald-700 py-16 text-center text-white"><div className="mx-auto max-w-3xl px-4"><h2 className="text-3xl font-black sm:text-4xl">Get a Straight Answer About Your Gutters</h2><p className="mt-4 text-lg text-emerald-50">Free estimate · No spam · No obligation · Alex responds personally</p><div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row"><a href="#estimate" className="rounded-xl bg-white px-7 py-4 font-black text-emerald-700">{page.cta}</a><a href={`tel:${PHONE_TEL}`} onClick={trackTelephoneClick} className="rounded-xl border border-white/40 px-7 py-4 font-black">Call {PHONE}</a></div></div></section>;
}

function Footer() {
  return <footer className="bg-slate-950 py-10 text-slate-400"><div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 sm:px-6 md:flex-row md:items-center md:justify-between"><div><p className="font-black text-white">CleanGutters Lighting</p><p className="mt-1 text-sm">Eastern Pennsylvania gutter services · Cherry Hill, NJ headquarters</p></div><div className="flex gap-5 text-sm"><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href={`tel:${PHONE_TEL}`} onClick={trackTelephoneClick}>{PHONE}</a></div></div></footer>;
}

function MobileBar() {
  return <div className="fixed bottom-0 left-0 right-0 z-50 grid grid-cols-2 border-t border-slate-200 bg-white lg:hidden"><a href={`tel:${PHONE_TEL}`} onClick={trackTelephoneClick} className="flex items-center justify-center gap-2 py-4 font-black"><Phone className="h-5 w-5 text-emerald-600" />Call Now</a><a href="#estimate" className="flex items-center justify-center gap-2 bg-emerald-600 py-4 font-black text-white">Free Estimate<ArrowRight className="h-4 w-4" /></a></div>;
}
