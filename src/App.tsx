import { useEffect } from "react";
import {
  Shield,
  ShieldCheck,
  Leaf,
  Award,
  Phone,
  Home,
  Star,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Wrench,
  Droplets,
  Mail,
  ExternalLink,
  HelpCircle,
  Trees,
  House,
  TriangleAlert,
  UserCircle,
  HardHat,
  UserCheck,
} from "lucide-react";
import { LeadForm } from "@/components/LeadForm";
import { trackTelephoneClick } from "@/lib/tracking";
import { useRoute } from "@/lib/router";
import { PrivacyPage } from "@/pages/PrivacyPage";
import { TermsPage } from "@/pages/TermsPage";

const BUSINESS_PHONE = "(856) 874-6640";
const BUSINESS_PHONE_TEL = "+18568746640";
const BUSINESS_EMAIL = "cleangutters2008@gmail.com";
const GOOGLE_REVIEWS_URL = "https://g.page/r/CQgr69prO1cLEAE";

function scrollToForm() {
  const form = document.getElementById("lead-form");
  if (form) {
    form.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

function handlePhoneClick() {
  trackTelephoneClick();
}

function App() {
  const route = useRoute();

  if (route === "/privacy") return <PrivacyPage />;
  if (route === "/terms") return <TermsPage />;

  return <LandingPage />;
}

function LandingPage() {
  useEffect(() => {
    document.title =
      "Gutter Guard Installation Near North Wales, PA | CleanGutters";
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-800 pb-[60px] lg:pb-0">
      <Header />
      <Hero />
      <TrustBar />
      <Problems />
      <HowItWorks />
      <Gallery />
      <Representative />
      <WhyCleanGutters />
      <Warranty />
      <Process />
      <Reviews />
      <ServiceArea />
      <Comparison />
      <FAQ />
      <FinalCTA />
      <Footer />
      <StickyMobileButtons />
    </div>
  );
}

/* ---------- Header ---------- */

function Header() {
  return (
    <header className="sticky top-0 z-[60] bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 lg:h-16">
          <a href="/" className="flex items-center gap-2.5 min-w-0">
            <img
              src="/images/1762607687527.jpg"
              alt="CleanGutters logo"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg object-cover flex-shrink-0"
            />
            <div className="min-w-0">
              <div className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight leading-tight truncate">
                Clean<span className="text-emerald-600">Gutters</span>{" "}
                <span className="font-bold text-slate-700 hidden sm:inline">Gutter Guards</span>
              </div>

            </div>
          </a>

          <div className="hidden sm:flex items-center gap-4">
            <a
              href={`tel:${BUSINESS_PHONE_TEL}`}
              onClick={handlePhoneClick}
              className="flex items-center gap-2 text-slate-700 font-semibold hover:text-emerald-700 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm">{BUSINESS_PHONE}</span>
            </a>
            <button
              onClick={scrollToForm}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-5 py-2.5 rounded-lg shadow-md transition-all duration-200 hover:shadow-lg"
            >
              Free Estimate
            </button>
          </div>

          <a
            href={`tel:${BUSINESS_PHONE_TEL}`}
            onClick={handlePhoneClick}
            className="sm:hidden flex items-center gap-1.5 bg-emerald-600 text-white font-bold text-sm px-3.5 py-2 rounded-lg shadow-sm flex-shrink-0"
          >
            <Phone className="w-4 h-4" />
            Call Now
          </a>
        </div>
      </div>
    </header>
  );
}

/* ---------- Hero ---------- */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950">
      <div className="absolute inset-0">
        <picture>
          <source media="(max-width: 640px)" srcSet="/images/cleangutters-completed-roofline-640.webp" />
          <source media="(max-width: 1024px)" srcSet="/images/cleangutters-completed-roofline-1024.webp" />
          <img
            src="/images/cleangutters-completed-roofline.webp"
            alt="Completed stainless-steel micro-mesh gutter guard installation along a residential roofline"
            width={1600}
            height={1200}
            fetchPriority="high"
            className="w-full h-full object-cover object-center"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-emerald-950/70" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-8 sm:pt-6 sm:pb-14 lg:pt-20 lg:pb-20 lg:grid lg:grid-cols-[1fr_420px] lg:gap-12 lg:items-start">
        <div className="flex flex-col">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 text-emerald-100 text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-3 sm:mb-6 backdrop-blur-sm self-start">
            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Local North Wales Support · Professionally Installed
          </div>

          <h1 className="text-[26px] sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
            Gutter Guard Installation Near North Wales, PA
          </h1>

          <p className="mt-2 sm:mt-6 text-sm sm:text-lg text-slate-200 leading-relaxed max-w-xl">
            Get a free, no-pressure estimate for professionally installed
            stainless-steel micro-mesh gutter guards within 50 miles of North
            Wales.
          </p>

          <div className="hidden lg:flex mt-8 flex-col sm:flex-row gap-4">
              <button
                onClick={scrollToForm}
                className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-xl transition-all duration-200 hover:shadow-2xl hover:scale-[1.02]"
              >
                Get My Free Estimate
                <ArrowRight className="w-5 h-5" />
              </button>
              <a
                href={`tel:${BUSINESS_PHONE_TEL}`}
                onClick={handlePhoneClick}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold text-lg px-8 py-4 rounded-xl backdrop-blur-sm transition-all duration-200"
              >
                <Phone className="w-5 h-5" />
                Call {BUSINESS_PHONE}
              </a>
            </div>
          </div>

          <div className="mt-3 sm:mt-6 lg:mt-0">
            <LeadForm />
          </div>
      </div>
    </section>
  );
}

/* ---------- Trust Bar ---------- */

function TrustBar() {
  return (
    <section className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
          <TrustStat icon={<Star className="w-5 h-5" />} value="5-Star Rated" label="On Google" />
          <TrustStat icon={<HardHat className="w-5 h-5" />} value="Professionally Installed" label="By Local Rep" />
          <TrustStat icon={<UserCheck className="w-5 h-5" />} value="Free Estimates" label="No Pressure" />
          <TrustStat icon={<Award className="w-5 h-5" />} value="Since 2009" label="Serving Homeowners" />
          <TrustStat icon={<ShieldCheck className="w-5 h-5" />} value="$2 Million" label="Liability Coverage" />
          <TrustStat icon={<Shield className="w-5 h-5" />} value="Lifetime" label="Transferable Warranty" />
        </div>
      </div>
    </section>
  );
}

/* ---------- Problems ---------- */

function Problems() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Gutter Problems We Help Address
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Clogged gutters can lead to overflow that affects your fascia,
            foundation and landscaping. Micro-mesh gutter guards help keep
            debris out so water flows through.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProblemCard icon={<Leaf className="w-6 h-6" />} title="Leaves" description="Leaves are the most common cause of gutter clogs. Micro-mesh helps block them from entering while letting rainwater through." />
          <ProblemCard icon={<Trees className="w-6 h-6" />} title="Pine Needles" description="Pine needles can slip past larger screens. The fine stainless-steel mesh is designed to help block even thin needles and buds." />
          <ProblemCard icon={<House className="w-6 h-6" />} title="Shingle Grit" description="Asphalt shingle grit can accumulate in gutters and reduce water flow. Micro-mesh helps keep grit out of the gutter channel." />
          <ProblemCard icon={<Wrench className="w-6 h-6" />} title="Recurring Gutter Cleaning" description="Professional gutter cleaning adds up over time. Gutter guards help reduce the frequency and cost of recurring cleanings." />
          <ProblemCard icon={<Droplets className="w-6 h-6" />} title="Overflow &amp; Water Damage" description="Clogged gutters can overflow, sending water behind the fascia, along the foundation and into landscaping. Keeping gutters clear helps support proper drainage." />
          <ProblemCard icon={<TriangleAlert className="w-6 h-6" />} title="Pest Habitat" description="Debris-filled gutters can attract birds, insects and rodents. Keeping gutters clear helps reduce nesting spots near your roofline." />
        </div>
      </div>
    </section>
  );
}

/* ---------- How It Works ---------- */

function HowItWorks() {
  return (
    <section id="micro-mesh" className="py-16 sm:py-20 lg:py-24 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Stainless-Steel Micro-Mesh Gutter Guards
            </h2>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              Our genuine stainless-steel micro-mesh is designed to help block
              leaves, pine needles, shingle grit and roof debris while allowing
              rainwater to flow through into the gutter. Every system is
              professionally measured and fitted for the individual home by
              your local CleanGutters representative.
            </p>
            <ul className="mt-6 space-y-4">
              <FeatureItem text="Genuine stainless-steel micro-mesh" />
              <FeatureItem text="Helps block leaves, pine needles, shingle grit and roof debris while allowing rainwater into the gutter" />
              <FeatureItem text="Professionally measured and fitted for the individual home by your local CleanGutters representative" />
              <FeatureItem text="Backed by a lifetime transferable warranty" />
            </ul>
            <button
              onClick={scrollToForm}
              className="mt-8 inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base px-6 py-3.5 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl"
            >
              Get My Free Estimate
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="order-1 lg:order-2">
            <picture>
              <source media="(max-width: 640px)" srcSet="/images/cleangutters-micro-mesh-closeup-640.webp" />
              <img
                src="/images/cleangutters-micro-mesh-closeup-1024.webp"
                alt="Close-up of stainless-steel micro-mesh gutter protection installed along a roof edge"
                width={1024}
                height={768}
                loading="lazy"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </picture>
            <p className="mt-3 text-sm text-slate-500">
              Genuine stainless-steel micro-mesh designed to help block leaves,
              pine needles, shingle grit and roof debris while allowing
              rainwater into the gutter.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Gallery ---------- */

function Gallery() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Real CleanGutters Installations
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            See genuine examples of the micro-mesh gutter protection systems
            installed for local homeowners by your local CleanGutters
            representative.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <GalleryPhoto src="/images/cleangutters-completed-roofline-1024.webp" alt="Finished low-profile gutter guards installed along a residential roofline" caption="Gutter protection with a clean, low-profile finish — professionally installed." />
          <GalleryPhoto src="/images/cleangutters-micro-mesh-closeup-640.webp" alt="Close-up of stainless-steel micro-mesh gutter protection" caption="Stainless-steel micro-mesh designed to help block leaves, pine needles, shingle grit and roof debris." />
          <GalleryPhoto src="/images/cleangutters-finished-gutter-installation-1024.webp" alt="Completed CleanGutters gutter guard installation viewed along the roof edge" caption="Actual CleanGutters installation photograph showing finished gutter protection." />
          <GalleryPhoto src="/images/cleangutters-installation-detail.webp" alt="CleanGutters gutter guard installation on a residential roofline" caption="Professionally installed through your local CleanGutters representative." />
        </div>
      </div>
    </section>
  );
}

/* ---------- Representative ---------- */

function Representative() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Your Local North Wales Contact
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Your local CleanGutters representative handles questions,
            scheduling and estimates. Every installation is professionally
            completed through your local CleanGutters representative.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Representative photo — replace src with genuine photograph when available */}
          <div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-slate-100 aspect-[4/5] flex items-center justify-center">
              <img
                src="/images/1762607687527.jpg"
                alt="Your local CleanGutters representative serving North Wales, PA"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-3 text-sm text-slate-500 text-center font-medium">
              Your Local CleanGutters Representative
            </p>
          </div>

          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold px-4 py-2 rounded-full mb-5">
              <UserCircle className="w-4 h-4" />
              Professionally Installed
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
              Speak with Your Local Representative
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              Your local CleanGutters representative is your direct point of
              contact for questions, scheduling and free estimates. They know
              the area, understand local gutter and roofline conditions, and
              will walk you through the process step by step — with no
              pressure.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              When it comes time for installation, every Pennsylvania gutter
              guard installation is professionally completed through your
              local CleanGutters representative.
            </p>

            <div className="space-y-3">
              <WhyCheck text="Your local representative handles questions, scheduling and estimates directly" />
              <WhyCheck text="Professionally installed through your local CleanGutters representative" />
              <WhyCheck text="Direct, responsive local communication" />
            </div>

            <button
              onClick={scrollToForm}
              className="mt-8 inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base px-6 py-3.5 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl"
            >
              Get My Free Estimate
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Why CleanGutters ---------- */

function WhyCleanGutters() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="/Screenshot_20250731_191244_Facebook.jpg"
              alt="CleanGutters representative installing micro-mesh gutter guards"
              loading="lazy"
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
            <p className="mt-3 text-sm text-slate-500">
              A CleanGutters representative installing a stainless-steel micro-mesh gutter guard system.
            </p>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Why Homeowners Choose CleanGutters
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Local North Wales support with every installation professionally
              completed through your local CleanGutters representative — since
              2009.
            </p>

            <div className="mt-8 space-y-4">
              <WhyCheck text="Your local CleanGutters representative handles questions and scheduling directly" />
              <WhyCheck text="Professionally installed through your local CleanGutters representative" />

              <WhyCheck text="Genuine stainless-steel micro-mesh" />
              <WhyCheck text="Lifetime transferable warranty" />
              <WhyCheck text="Fully insured with $2 million liability coverage" />
              <WhyCheck text="Free, no-pressure estimates" />
            </div>

            <button
              onClick={scrollToForm}
              className="mt-8 inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base px-6 py-3.5 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl"
            >
              Get My Free Estimate
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Warranty ---------- */

function Warranty() {
  return (
    <section id="warranty" className="py-16 sm:py-20 lg:py-24 bg-white scroll-mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold px-4 py-2 rounded-full mb-5">
              <ShieldCheck className="w-4 h-4" />
              Lifetime Transferable Warranty
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Lifetime Transferable Gutter Guard Warranty
            </h2>

            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              CleanGutters gutter guards are backed by a lifetime transferable
              warranty. This means the coverage remains in place for the lifetime
              of the installed product and can be transferred to a future
              homeowner when the home is sold.
            </p>

            <div className="mt-6 space-y-4">
              <WhyCheck text="Lifetime coverage for the installed gutter guard product" />
              <WhyCheck text="Transferable to a future homeowner when the home is sold" />
              <WhyCheck text="Your local CleanGutters representative will walk you through the warranty details during your free estimate" />
            </div>

            <button
              onClick={scrollToForm}
              className="mt-8 inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base px-6 py-3.5 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl"
            >
              Get My Free Estimate
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <Shield className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-3">
              Fully Insured & Warrantied
            </h3>
            <div className="space-y-3 text-sm text-slate-600">
              <div className="flex items-center justify-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Lifetime transferable warranty</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Shield className="w-5 h-5 text-emerald-600" />
                <span>$2 million liability coverage</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <HardHat className="w-5 h-5 text-emerald-600" />
                <span>Professionally installed through your local CleanGutters representative</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Process ---------- */

function Process() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Three Simple Steps
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            From first call to finished installation, the process is clear and
            professional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ProcessStep stepNumber={1} icon={<Phone className="w-7 h-7" />} title="Contact Your Local Representative" description="Your local CleanGutters representative will discuss your project and arrange a convenient appointment." />
          <ProcessStep stepNumber={2} icon={<Home className="w-7 h-7" />} title="Receive Your Free Estimate" description="Receive a clear, no-pressure estimate based on your home and gutter system." />
          <ProcessStep stepNumber={3} icon={<HardHat className="w-7 h-7" />} title="Professionally Installed" description="Every Pennsylvania installation is professionally completed through your local CleanGutters representative." />
        </div>
      </div>
    </section>
  );
}

/* ---------- Reviews ---------- */

function Reviews() {
  return (
    <section id="reviews" className="py-16 sm:py-20 lg:py-24 bg-white scroll-mt-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold px-4 py-2 rounded-full mb-6">
          <Star className="w-4 h-4 fill-emerald-500 text-emerald-500" />
          5-Star Rated on Google
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
          5-Star Rated on Google
        </h2>

        <p className="mt-4 text-lg text-slate-600 leading-relaxed">
          CleanGutters has a current five-star Google rating. Read what
          homeowners have shared about their gutter guard installations and
          service experience.
        </p>

        {/* Review cards — placeholder slots for genuine Google reviews.
            Hidden until real review excerpts are supplied. */}
        <div className="hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10" />
        </div>

        <a
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base px-7 py-3.5 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl"
        >
          <Star className="w-5 h-5 fill-white" />
          Read Our Google Reviews
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}

/* ---------- Service Area ---------- */

function ServiceArea() {
  return (
    <section id="service-area" className="py-16 sm:py-20 lg:py-24 bg-slate-50 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Gutter Guard Installation Near North Wales, PA
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Serving homeowners in North Wales, Montgomery County, Bucks County
            and nearby Eastern Pennsylvania communities.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <MapPin className="w-6 h-6 text-emerald-600" />
              <h3 className="text-lg font-bold text-slate-900">Service Area</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 text-center">
              <ServiceAreaItem name="North Wales, PA" />
              <ServiceAreaItem name="Montgomery County" />
              <ServiceAreaItem name="Bucks County" />
              <ServiceAreaItem name="Eastern PA" />
              <ServiceAreaItem name="New Jersey" />
              <ServiceAreaItem name="Delaware" />
              <ServiceAreaItem name="Surrounding Areas" />
            </div>
            <p className="text-center text-sm text-slate-500 mt-6">
              Serving homeowners within approximately 50 miles of North Wales,
              Pennsylvania. Cherry Hill, NJ headquarters.
            </p>
            <p className="text-center text-sm text-slate-600 mt-3 leading-relaxed max-w-2xl mx-auto">
              CleanGutters is headquartered in Cherry Hill, NJ and serves the
              North Wales territory through a local CleanGutters representative.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Comparison ---------- */

function Comparison() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            A Local Alternative to Large National Gutter Guard Companies
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            CleanGutters offers direct local accountability and personal service
            — without the call-center experience of large national companies.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-300">
                <th className="text-left py-4 px-4 sm:px-6 text-sm sm:text-base font-bold text-slate-900">
                  Feature
                </th>
                <th className="text-center py-4 px-4 sm:px-6 text-sm sm:text-base font-bold text-emerald-700 bg-emerald-50 rounded-t-lg">
                  CleanGutters
                </th>
                <th className="text-center py-4 px-4 sm:px-6 text-sm sm:text-base font-bold text-slate-500">
                  Large National Companies
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <ComparisonRow feature="Local accountability" cleanGutters="Local CleanGutters representative" national="Call center or regional dispatcher" />
              <ComparisonRow feature="Installation approach" cleanGutters="Professionally installed through your local representative" national="Varies by franchise or subcontractor" />
              <ComparisonRow feature="Stainless-steel micro-mesh" cleanGutters={<CheckMark />} national="Varies by company and product line" />
              <ComparisonRow feature="Free estimate" cleanGutters={<CheckMark />} national={<CheckMark />} />
              <ComparisonRow feature="Warranty" cleanGutters="Lifetime transferable warranty" national="Varies by company and product" />
              <ComparisonRow feature="Direct communication" cleanGutters="Speak with your local representative" national="Customer service hotline" />
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-center text-sm text-slate-500">
          This table compares factual features only. CleanGutters does not claim
          to be cheaper than any specific company. Individual experiences and
          pricing vary.
        </p>

        <div className="text-center mt-8">
          <button
            onClick={scrollToForm}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base px-6 py-3.5 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl"
          >
            Get My Free Estimate
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */

function FAQ() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            <HelpCircle className="w-4 h-4" />
            Frequently Asked Questions
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Gutter Guard Questions, Answered
          </h2>
        </div>

        <div className="space-y-4">
          <FAQItem
            question="Who installs the gutter guards?"
            answer="Every Pennsylvania gutter guard installation is professionally completed through your local CleanGutters representative."
          />
          <FAQItem
            question="Who handles my estimate and scheduling?"
            answer="Your local CleanGutters representative handles your free estimate, scheduling and any questions. They are your direct point of contact throughout the process. Installation is then professionally completed through your local CleanGutters representative."
          />
          <FAQItem
            question="Do gutter guards work with existing gutters?"
            answer="In most cases, yes. CleanGutters' micro-mesh gutter guards are designed to be fitted to your existing gutters. Your local CleanGutters representative will assess your current gutters during the free estimate to confirm compatibility."
          />
          <FAQItem
            question="How does micro-mesh handle pine needles?"
            answer="The fine stainless-steel micro-mesh is designed to help block pine needles, shingle grit and other small debris from entering your gutters while allowing rainwater to flow through. Your local CleanGutters representative can show you the mesh up close during your estimate."
          />
          <FAQItem
            question="How long does installation usually take?"
            answer="Installation time varies depending on the size of your home, the length of your gutters, and site-specific conditions. Your local CleanGutters representative can give you a time estimate based on your home during the free estimate."
          />
          <FAQItem
            question="What does the transferable warranty cover?"
            answer="CleanGutters gutter guards are backed by a lifetime transferable warranty. The coverage is transferable to a future homeowner when the home is sold. Your local CleanGutters representative can walk you through the warranty details, including what is covered and how the transfer works, during your free estimate."
          />
          <FAQItem
            question="Which areas do you serve?"
            answer="CleanGutters is headquartered in Cherry Hill, New Jersey and serves homeowners within approximately 50 miles of North Wales, Pennsylvania, including Montgomery County, Bucks County, Eastern Pennsylvania, New Jersey and Delaware."
          />
        </div>
      </div>
    </section>
  );
}

/* ---------- Final CTA ---------- */

function FinalCTA() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-emerald-700 via-emerald-600 to-emerald-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
          Ready to Protect Your Home?
        </h2>
        <p className="mt-4 text-lg text-emerald-50 leading-relaxed max-w-2xl mx-auto">
          Get a free, no-pressure estimate for professionally installed
          stainless-steel micro-mesh gutter guards. Every installation is
          professionally completed through your local CleanGutters
          representative.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={scrollToForm}
            className="inline-flex items-center justify-center gap-2 bg-white text-emerald-700 font-bold text-lg px-8 py-4 rounded-xl shadow-xl transition-all duration-200 hover:shadow-2xl hover:scale-[1.02]"
          >
            Get My Free Estimate
            <ArrowRight className="w-5 h-5" />
          </button>
          <a
            href={`tel:${BUSINESS_PHONE_TEL}`}
            onClick={handlePhoneClick}
            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold text-lg px-8 py-4 rounded-xl transition-all duration-200"
          >
            <Phone className="w-5 h-5" />
            Call {BUSINESS_PHONE}
          </a>
        </div>

        <div className="mt-8 max-w-lg mx-auto space-y-3">
          <CTAPoint text="Your local CleanGutters representative handles estimates and scheduling directly" />
          <CTAPoint text="Professionally installed through your local CleanGutters representative" />
          <CTAPoint text="Free, no-pressure estimate" />
          <CTAPoint text="Lifetime transferable warranty" />
          <CTAPoint text="Fully insured with $2 million liability coverage" />
          <CTAPoint text="Cherry Hill, NJ headquarters serving North Wales and nearby Pennsylvania communities" />
          <CTAPoint text="5-Star Rated on Google" />
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <img src="/images/1762607687527.jpg" alt="CleanGutters logo" className="w-8 h-8 rounded-lg object-cover" />
              <span className="text-lg font-extrabold text-white">
                Clean<span className="text-emerald-500">Gutters</span>
              </span>
            </div>
            <p className="text-white font-semibold text-sm">CleanGutters Gutter Guards</p>
            <p className="text-sm text-slate-400 mt-0.5">A service of CleanGutters Lighting</p>
            <p className="text-sm text-slate-400 mt-2 leading-relaxed">
              Serving homeowners within approximately 50 miles of North Wales,
              Pennsylvania. Cherry Hill, NJ headquarters.
            </p>
            <p className="text-sm text-slate-400 mt-1 leading-relaxed">
              Professionally installed through your local CleanGutters
              representative. Stainless-steel micro-mesh gutter guards since 2009.
            </p>
            <p className="text-sm text-slate-400 mt-2 leading-relaxed">
              CleanGutters is headquartered in Cherry Hill, NJ and serves the
              North Wales territory through a local CleanGutters representative.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Cherry Hill, NJ 08002</span>
              </li>
              <li>
                <a href={`tel:${BUSINESS_PHONE_TEL}`} onClick={handlePhoneClick} className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
                  <Phone className="w-4 h-4" />
                  {BUSINESS_PHONE}
                </a>
              </li>
              <li>
                <a href={`mailto:${BUSINESS_EMAIL}`} className="flex items-center gap-2 hover:text-emerald-400 transition-colors break-all">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  {BUSINESS_EMAIL}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-emerald-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} CleanGutters Lighting. All rights reserved.</p>
          <p className="mt-2 text-slate-500">
            Lifetime transferable warranty &middot; Fully insured with $2 million
            liability coverage &middot; 5-Star Rated on Google
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Sticky Mobile Buttons ---------- */

function StickyMobileButtons() {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
      <div className="grid grid-cols-2 gap-px bg-slate-200">
        <a
          href={`tel:${BUSINESS_PHONE_TEL}`}
          onClick={handlePhoneClick}
          className="flex items-center justify-center gap-2 bg-white py-3.5 font-bold text-slate-800 hover:bg-slate-50 transition-colors"
        >
          <Phone className="w-5 h-5 text-emerald-600" />
          Call Now
        </a>
        <button
          onClick={scrollToForm}
          className="flex items-center justify-center gap-2 bg-emerald-600 py-3.5 font-bold text-white hover:bg-emerald-700 transition-colors"
        >
          Free Estimate
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

/* ---------- Small Components ---------- */

function TrustStat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-2">{icon}</div>
      <div className="text-lg font-extrabold text-slate-900">{value}</div>
      <div className="text-sm text-slate-500">{label}</div>
    </div>
  );
}

function ProblemCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-8 transition-all duration-300 hover:shadow-xl hover:border-emerald-200">
      <div className="w-12 h-12 bg-emerald-600 text-white rounded-xl flex items-center justify-center mb-5">{icon}</div>
      <h3 className="text-lg font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
      <span className="text-slate-700">{text}</span>
    </li>
  );
}

function ProcessStep({ stepNumber, icon, title, description }: { stepNumber: number; icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="relative">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 h-full">
        <div className="w-14 h-14 bg-emerald-600 text-white rounded-2xl flex items-center justify-center mb-5">{icon}</div>
        <div className="text-emerald-400 text-sm font-bold uppercase tracking-wider mb-2">Step {stepNumber}</div>
        <h3 className="text-lg font-bold text-white mb-3">{title}</h3>
        <p className="text-slate-300 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function ServiceAreaItem({ name }: { name: string }) {
  return (
    <div className="bg-slate-50 rounded-xl border border-slate-200 py-4 px-3">
      <span className="font-semibold text-slate-800 text-sm sm:text-base">{name}</span>
    </div>
  );
}

function WhyCheck({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
      <span className="text-slate-700 leading-relaxed">{text}</span>
    </div>
  );
}

function CTAPoint({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 justify-center">
      <CheckCircle2 className="w-5 h-5 text-emerald-200 flex-shrink-0" strokeWidth={2.5} />
      <span className="text-emerald-50">{text}</span>
    </div>
  );
}

function GalleryPhoto({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden flex flex-col">
      <img src={src} alt={alt} loading="lazy" className="w-full h-56 object-cover object-center" />
      <figcaption className="p-4 text-sm text-slate-600 leading-relaxed flex-1">{caption}</figcaption>
    </figure>
  );
}

function ComparisonRow({ feature, cleanGutters, national }: { feature: string; cleanGutters: React.ReactNode; national: React.ReactNode }) {
  return (
    <tr>
      <td className="py-4 px-4 sm:px-6 text-sm sm:text-base font-semibold text-slate-800">
        {feature}
      </td>
      <td className="py-4 px-4 sm:px-6 text-sm sm:text-base text-slate-700 bg-emerald-50/50 text-center">
        {cleanGutters}
      </td>
      <td className="py-4 px-4 sm:px-6 text-sm sm:text-base text-slate-500 text-center">
        {national}
      </td>
    </tr>
  );
}

function CheckMark() {
  return (
    <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" strokeWidth={2.5} />
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <summary className="flex items-center justify-between cursor-pointer p-5 sm:p-6 list-none select-none">
        <h3 className="font-bold text-slate-900 text-base pr-4">{question}</h3>
        <HelpCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 transition-transform duration-200 group-open:rotate-180" />
      </summary>
      <div className="px-5 sm:px-6 pb-5 sm:pb-6">
        <p className="text-slate-600 leading-relaxed">{answer}</p>
      </div>
    </details>
  );
}

export default App;
