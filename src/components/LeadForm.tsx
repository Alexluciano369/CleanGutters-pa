import { useState, type FormEvent } from "react";
import { Loader2, CheckCircle2, AlertCircle, ShieldCheck } from "lucide-react";
import { submitLead, type LeadFormData } from "@/lib/leads";
import {
  trackGoogleAdsLeadConversion,
  trackNorthWalesLeadSubmit,
} from "@/lib/tracking";

type Status = "idle" | "submitting" | "success" | "error";

const SUCCESS_MESSAGE =
  "Request received! Your local CleanGutters representative usually responds within two business hours.";

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

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const payload: LeadFormData = {
      ...formData,
      service_needed: DEFAULT_SERVICE,
    };

    const result = await submitLead(payload);

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
        result.error ||
          "Something went wrong. Please try again or call us directly."
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
        <h3 className="text-xl font-bold text-slate-900 mb-3">
          Thank You for Your Request
        </h3>
        <p className="text-slate-600 text-base leading-relaxed mb-6">
          {SUCCESS_MESSAGE}
        </p>
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
      <div className="bg-gradient-to-r from-emerald-700 to-emerald-600 px-4 py-2.5 sm:px-6 sm:py-5">
        <h3 className="text-base sm:text-xl font-bold text-white">
          Free Gutter Guard Quote
        </h3>
        <p className="text-emerald-100 text-[11px] sm:text-sm mt-0.5 sm:mt-1">
          Request a free, no-pressure in-home estimate for professionally
          installed gutter guards. Your local CleanGutters representative
          usually responds
          within two business hours.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-3 sm:p-6 space-y-2.5 sm:space-y-4">
        <input type="hidden" name="service_needed" value={DEFAULT_SERVICE} />

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-slate-700 mb-1.5"
          >
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
            className="w-full px-4 py-2.5 sm:py-3 rounded-lg border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none transition-all"
            placeholder="Jane Smith"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-semibold text-slate-700 mb-1.5"
            >
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none transition-all"
              placeholder="(215) 555-0100"
            />
          </div>

          <div>
            <label
              htmlFor="zip_code"
              className="block text-sm font-semibold text-slate-700 mb-1.5"
            >
              ZIP Code <span className="text-red-500">*</span>
            </label>
            <input
              id="zip_code"
              name="zip_code"
              type="text"
              required
              inputMode="numeric"
              autoComplete="postal-code"
              maxLength={10}
              value={formData.zip_code}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none transition-all"
              placeholder="19454"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-semibold text-slate-700 mb-1.5"
          >
            Anything You'd Like Us to Know? <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            maxLength={500}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none transition-all resize-none"
            placeholder="Tell us about your home, gutter concerns, scheduling needs or questions."
          />
          <p className="mt-1 text-right text-xs text-slate-400">
            {formData.message?.length || 0}/500
          </p>
        </div>

        <div className="flex items-start gap-3">
          <input
            id="sms_consent"
            name="sms_consent"
            type="checkbox"
            checked={formData.sms_consent || false}
            onChange={handleChange}
            className="mt-1 w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-2 focus:ring-emerald-200 flex-shrink-0"
          />
          <label
            htmlFor="sms_consent"
            className="text-xs text-slate-600 leading-relaxed cursor-pointer"
          >
            Yes, CleanGutters Lighting may text me about my estimate. Message
            and data rates may apply. Reply STOP to opt out.
          </label>
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
            "Request My Free Estimate"
          )}
        </button>

        <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>No obligation · No spam · Free estimate</span>
        </div>

        <p className="text-center text-xs text-slate-500 leading-relaxed">
          By submitting this form, you agree that CleanGutters Lighting may
          contact you regarding your request. See our{" "}
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
