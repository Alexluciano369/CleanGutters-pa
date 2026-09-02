import { useEffect } from "react";
import { LegalPageLayout, Section } from "@/components/LegalPageLayout";

export function TermsPage() {
  useEffect(() => {
    document.title = "Terms of Service | CleanGutters Gutter Guards";
  }, []);

  return (
    <LegalPageLayout title="Terms of Service" effectiveDate="August 26, 2026">
      <p>
        These Terms of Service ("Terms") govern your use of this website and
        your submission of estimate requests to CleanGutters Gutter Guards, a
        service of CleanGutters Lighting ("CleanGutters," "we," "us," or "our").
        By using our website or requesting an estimate, you agree to these
        Terms.
      </p>

      <Section heading="Estimate Requests Are Not Binding Contracts">
        <p>
          Submitting an estimate request through our website is a request for
          information — it is not an offer, acceptance, order, or binding
          contract for services. Any installation, price, scope of work, or
          service commitment becomes binding only after both parties sign a
          separate written agreement.
        </p>
      </Section>

      <Section heading="Pricing Requires Property Inspection">
        <p>
          Every home is different. Final pricing for gutter guard installation
          cannot be determined without a property inspection. Any prices,
          estimates, or ranges mentioned on this website, in advertising, or
          verbally are illustrative only. Your final written estimate will be
          based on the specific conditions of your home, including gutter
          length, roof pitch, gutter condition, access, and any additional
          repairs required.
        </p>
      </Section>

      <Section heading="Availability and Installation Dates Are Not Guaranteed">
        <p>
          Response times, appointment availability, and installation dates
          depend on demand, weather, scheduling, and factors outside our
          control. Any time frames mentioned on this website — including that a
          Your local CleanGutters representative usually responds within two business
          hours — are goals, not guarantees. We do not guarantee same-day or
          next-day installation.
        </p>
      </Section>

      <Section heading="Warranty Terms Are Provided Separately">
        <p>
          Our gutter guards are backed by a lifetime transferable warranty. The
          complete terms, conditions, exclusions and transfer requirements of
          that warranty are provided to homeowners separately at the time of
          installation. Nothing on this website modifies, limits, expands or
          replaces the actual written warranty document.
        </p>
      </Section>

      <Section heading="Website Content Limitations">
        <p>
          Content on this website — including descriptions of products,
          services, benefits, and coverage area — is provided for general
          informational and marketing purposes. We work to keep our website
          accurate, but we do not guarantee that all information is complete,
          current, or free from errors. Nothing on this website should be
          interpreted as a professional recommendation for your specific home.
        </p>
        <p>
          Statements about how gutter guards perform (for example, "help
          prevent gutter clogs," "reduce recurring gutter cleaning," "help block
          leaves, pine needles, shingle grit and roof debris," and "support
          proper water drainage") describe general product benefits and do not
          promise any specific outcome for any particular home. Results depend
          on tree cover, roof condition, weather, maintenance and other factors.
        </p>
      </Section>

      <Section heading="Your Consent to Contact">
        <p>
          By submitting an estimate request form on this website, you agree
          that CleanGutters Lighting may contact you by phone, text message
          and/or email at the contact information you provide, in order to
          respond to your request. You may opt out at any time by replying STOP
          to a text, unsubscribing from an email, or asking us to remove your
          information.
        </p>
      </Section>

      <Section heading="Territory">
        <p>
          CleanGutters is based in Cherry Hill, New Jersey and serves
          homeowners within approximately 50 miles of North Wales,
          Pennsylvania, including Montgomery County, Bucks County, Eastern
          Pennsylvania,
          New Jersey and Delaware. Service outside of that area is subject to
          availability and cannot be guaranteed.
        </p>
      </Section>

      <Section heading="Intellectual Property">
        <p>
          All content on this website — including text, graphics, logos,
          images, and layout — is owned by or licensed to CleanGutters Lighting
          and is protected by applicable copyright and trademark laws. You may
          not copy, modify, distribute, or use our content without our written
          permission.
        </p>
      </Section>

      <Section heading="Limitation of Liability">
        <p>
          To the fullest extent permitted by law, CleanGutters Lighting, its
          affiliates, and its representatives are not liable for any indirect,
          incidental, consequential, special, or punitive damages arising out
          of your use of this website or reliance on any information on it.
          Your sole remedy for dissatisfaction with the website is to stop
          using it.
        </p>
      </Section>

      <Section heading="Changes to These Terms">
        <p>
          We may update these Terms from time to time. The current version,
          along with its effective date, will always be posted on this page.
          Continued use of the website after changes are posted means you
          accept the updated Terms.
        </p>
      </Section>
    </LegalPageLayout>
  );
}
