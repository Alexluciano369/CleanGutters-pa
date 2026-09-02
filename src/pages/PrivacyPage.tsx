import { useEffect } from "react";
import { LegalPageLayout, Section } from "@/components/LegalPageLayout";

export function PrivacyPage() {
  useEffect(() => {
    document.title = "Privacy Policy | CleanGutters Gutter Guards";
  }, []);

  return (
    <LegalPageLayout title="Privacy Policy" effectiveDate="August 26, 2026">
      <p>
        CleanGutters Gutter Guards is a service of CleanGutters Lighting
        ("CleanGutters," "we," "us," or "our"). This Privacy Policy explains
        what information we collect through our estimate request forms and our
        website, how we use it, and the choices you have. By using our website
        or submitting an estimate request, you agree to the practices described
        here.
      </p>

      <Section heading="Information We Collect">
        <p>
          When you request a free estimate through our website, we collect the
          information you provide directly, including:
        </p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>Your full name</li>
          <li>Your email address</li>
          <li>Your phone number</li>
          <li>
            Your property address and any details you share about your home,
            your gutters, or your request
          </li>
          <li>Any additional message or notes you choose to include</li>
        </ul>
        <p>
          We call this "estimate form information." You choose what to share
          with us — you may leave optional fields blank.
        </p>
      </Section>

      <Section heading="Automatically Collected Information & Tracking">
        <p>
          When you visit our website, our advertising and analytics providers
          may automatically collect certain information about your visit. This
          includes:
        </p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>
            Advertising identifiers such as Google Click ID (GCLID), GBRAID and
            WBRAID
          </li>
          <li>
            UTM campaign parameters (utm_source, utm_medium, utm_campaign,
            utm_term, utm_content) present in the URL you arrived from
          </li>
          <li>
            The URL of the landing page you submitted the form from, and the
            date and time of your submission
          </li>
          <li>
            Standard technical information collected by cookies and similar
            technologies used by Google Ads and Google Analytics 4 (GA4), such
            as approximate location, device and browser information, and page
            interactions
          </li>
        </ul>
        <p>
          We use Google Ads (tag AW-18146670851) and Google Analytics 4 (tag
          G-E7NG44429T) to measure the performance of our advertising and to
          understand how visitors use our website. Google's use of information
          collected through these services is governed by Google's own privacy
          policies.
        </p>
      </Section>

      <Section heading="How We Use Your Information">
        <p>We use the information described above to:</p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>Respond to your estimate request</li>
          <li>Contact you by phone, text or email to schedule a free estimate</li>
          <li>
            Prepare and provide a written estimate after a property assessment
          </li>
          <li>Answer questions about our gutter guard services and warranty</li>
          <li>
            Measure the effectiveness of our advertising and improve our website
          </li>
          <li>Comply with applicable laws and legitimate business needs</li>
        </ul>
      </Section>

      <Section heading="We Do Not Sell Your Personal Information">
        <p>
          We do not sell your personal information. We do not rent or trade your
          personal information to third parties for their own marketing.
        </p>
        <p>
          We may share your information only with service providers who help us
          operate our business (for example, our lead management, email and
          hosting providers), and only to the extent necessary for them to
          perform services on our behalf. We may also disclose information when
          required by law or to protect our rights.
        </p>
      </Section>

      <Section heading="Cookies">
        <p>
          Our website uses cookies and similar technologies through Google Ads
          and Google Analytics 4 for advertising measurement and analytics. You
          can control cookies through your browser settings. Disabling cookies
          may affect how the website functions and how ads are measured.
        </p>
      </Section>

      <Section heading="Data Retention">
        <p>
          We retain estimate form information for as long as needed to respond
          to your request, provide follow-up service, comply with our legal
          obligations, resolve disputes, and enforce our agreements.
        </p>
      </Section>

      <Section heading="How to Request Deletion of Your Information">
        <p>
          You may request that we delete the personal information you submitted
          through our estimate form. To make a request, contact us by phone or
          email using the contact information at the bottom of this page and
          include:
        </p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>The name, phone number and email you submitted</li>
          <li>The approximate date of your submission, if you know it</li>
          <li>A brief statement that you would like your information deleted</li>
        </ul>
        <p>
          We will confirm receipt of your request and complete deletion within a
          reasonable timeframe, subject to any records we are required to keep
          by law.
        </p>
      </Section>

      <Section heading="Children's Privacy">
        <p>
          Our website and services are directed to adult homeowners. We do not
          knowingly collect personal information from children under 13. If you
          believe a child has submitted personal information, please contact us
          and we will delete it.
        </p>
      </Section>

      <Section heading="Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. The current
          version, along with its effective date, will always be posted on this
          page.
        </p>
      </Section>
    </LegalPageLayout>
  );
}
