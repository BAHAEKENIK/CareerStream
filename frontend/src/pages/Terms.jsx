import Layout from "../components/Layout.jsx";
import SEO from "../app/seo.jsx";
import { THEME } from "../app/theme.js";

export default function Terms() {
  return (
    <Layout>
      <SEO
        title="Terms of Service | CareerStream"
        description="CareerStream terms of service."
        canonical="http://localhost:5173/terms"
      />

      <div className="rounded-2xl border bg-white p-7 shadow-sm">
        <h1 className="text-2xl font-extrabold" style={{ color: THEME.brand.dark }}>
          Terms of Service
        </h1>

        <p className="mt-3 text-sm text-gray-700">
          Effective date: 2026-01-21
        </p>

        <div className="mt-6 space-y-4 text-sm text-gray-700">
          <section>
            <h2 className="text-lg font-bold">1) Service</h2>
            <p className="mt-2">
              CareerStream is a job board that publishes job listings and related information.
              We do not guarantee job availability, hiring outcomes, or the accuracy of third-party links.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold">2) Use of Content</h2>
            <p className="mt-2">
              Listings may include links to external websites. You are responsible for reviewing the terms
              and policies of external sites before applying.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold">3) Prohibited Use</h2>
            <p className="mt-2">
              You agree not to misuse the platform, attempt unauthorized access, scrape in a way that harms
              the service, or upload malicious content.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold">4) Changes</h2>
            <p className="mt-2">
              We may update these terms at any time. Continued use of the site means you accept the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold">5) Contact</h2>
            <p className="mt-2">
              For questions, contact: <span className="font-semibold">bahaekenik@gmail.com</span>
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
}
