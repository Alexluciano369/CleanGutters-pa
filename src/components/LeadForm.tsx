import { useState, type FormEvent } from "react";
import { Loader2, CheckCircle2, AlertCircle, ShieldCheck } from "lucide-react";
import { submitLead, type LeadFormData } from "@/lib/leads";
import {
  trackGoogleAdsLeadConversion,
  trackNorthWalesLeadSubmit,
} from "@/lib/tracking";

type Status = "idle" | "submitting" | "success" | "error";

const SUCCESS_MESSAGE =
  "Request received! Alex usually responds within two business hours about your Pennsylvania estimate.";

const DEFAULT_SERVICE = "Gutter Guard Installation";

export function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState<LeadFormData>({
    name: "",
    phone: "",
    zip_code: "",
    service_needed: DEFAULT_SERVICE,
    message: "",
    sms_consent: false,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const result = await submitLead({
      ...formData,
      service_needed: DEFAULT_SERVICE,
    });

    if (result.success) {
      trackGoogleAdsLeadConversion();
      trackNorthWalesLeadSubmit();
      setStatus("success");
      setFormData({
        name: "",
        phone: "",
        zip_code: "",
        service_needed: DEFAULT_SERVICE,
        message: "",
        sms_consent: false,
      });
    } else {
      setStatus("error");
      setErrorMessage(
        result.error || "Something went wrong. Please try again or call us directly."
      );
    }
  }

  if (status === "success") {
    return (
      <div
        id="lead-form"
        className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-8 text-center scroll-mt-24"
      >
        <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-8 h-8 text-emerald-600" strokeWidth={2.5} />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-3">Your Request Is In</h3>
        <p className="text-slate-600 text-base leading-relaxed mb-6">{SUCCESS_MESSAGE}</p>
        <button
          onClick={() => setStatus("idle")}
          className="text-emerald-700 font-semibold hover:text-emerald-800 transition-colors underline underline-offset-2"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <div
      id="lead-form"
      className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden scroll-mt-20"
    >
      <div className="bg-gradient-to-r from-emerald-700 to-emerald-600 px-4 py-3 sm:px-6 sm:py-5">
        <p className="text-emerald-100 text-xs font-bold uppercase tracking-wide">
          North Wales &amp; Nearby Pennsylvania Offer
        </p>
        <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
          Save $250 on Gutter Guard Installation
        </h3>
        <p className="text-emerald-50 text-xs sm:text-sm mt-2 leading-relaxed">
          Seniors and military get 10% off instead — whichever saves more. New
          installations only. Discounts cannot be combined. Book your free
          estimate by October 31, 2026.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
        <input type="hidden" name="service_needed" value={DEFAULT_SERVICE} />

        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-1.5">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none transition-all"
            placeholder="Jane Smith"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-1.5">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none transition-all"
            placeholder="(215) 555-0100"
          />
        </div>

        {status === "error" && (
          <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{errorMessage}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-bold text-lg py-4 rounded-lg shadow-lg shadow-emerald-200 transition-all duration-200 hover:shadow-xl hover:shadow-emerald-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Submitting...
            </>
          ) : (
            "Claim My $250 Savings"
          )}
        </button>

        <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>No obligation · No spam · Free estimate</span>
        </div>

        <p className="text-center text-xs text-slate-500 leading-relaxed">
          By submitting, you agree that CleanGutters Lighting may contact you
          about your request. See our{" "}
          <a href="/privacy" className="text-emerald-700 hover:text-emerald-800 underline">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="/terms" className="text-emerald-700 hover:text-emerald-800 underline">
            Terms of Service
          </a>
          .
        </p>
      </form>
    </div>
  );
}
