import Layout from "../components/Layout.jsx";
import SEO from "../app/seo.jsx";
import { THEME } from "../app/theme.js";

export default function Privacy() {
  return (
    <Layout>
      <SEO
        title="Privacy Policy | CareerStream"
        description="CareerStream privacy policy."
        canonical="http://localhost:5173/privacy"
      />

      <div className="rounded-2xl border bg-white p-7 shadow-sm">
        <h1 className="text-2xl font-extrabold" style={{ color: THEME.brand.dark }}>
          Privacy Policy
        </h1>

        <p className="mt-3 text-sm text-gray-700">
          Effective date: 2026-01-21
        </p>

        <div className="mt-6 space-y-4 text-sm text-gray-700">
          <section>
            <h2 className="text-lg font-bold">1) What we collect</h2>
            <p className="mt-2">
              CareerStream does not require user accounts. We may collect basic technical data
              (like browser type, device info, and approximate location) through standard server logs
              and analytics tools.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold">2) Cookies</h2>
            <p className="mt-2">
              We may use cookies for analytics and advertising (including Google AdSense when enabled).
              You can control cookies in your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold">3) Third-party links</h2>
            <p className="mt-2">
              Job listings may link to third-party sites. We are not responsible for their content or policies.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold">4) Data sharing</h2>
            <p className="mt-2">
              We do not sell personal data. We may share data if required by law or to protect the platform
              from abuse.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold">5) Contact</h2>
            <p className="mt-2">
              For privacy requests, contact: <span className="font-semibold">bahaekenik@gmail.com</span>
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
}
