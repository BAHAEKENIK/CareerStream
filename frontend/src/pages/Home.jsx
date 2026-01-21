import { Link } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import { THEME } from "../app/theme.js";

export default function Home() {
  return (
    <Layout>
      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-extrabold" style={{ color: THEME.brand.dark }}>
            Find jobs faster with CareerStream
          </h1>
          <p className="text-gray-600">
            Browse by category, then filter by country (with flags) and city. No signup. No noise.
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              to="/jobs"
              className="rounded-xl px-5 py-3 text-sm font-semibold text-white"
              style={{ backgroundColor: THEME.brand.blue }}
            >
              Browse Jobs
            </Link>

            <a
              href="https://www.google.com/adsense/start/"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl px-5 py-3 text-sm font-semibold"
              style={{ color: THEME.brand.orange }}
            >
              Monetization Ready (AdSense)
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="text-sm font-semibold" style={{ color: THEME.brand.green }}>
            Category-first browsing
          </div>
          <div className="mt-2 text-gray-700 text-sm">
            Visitors start with categories — exactly how real users search.
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="text-sm font-semibold" style={{ color: THEME.brand.blue }}>
            Country + city filters
          </div>
          <div className="mt-2 text-gray-700 text-sm">
            Country dropdown shows flags, then city dropdown appears automatically.
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="text-sm font-semibold" style={{ color: THEME.brand.orange }}>
            Built for SEO + Ads
          </div>
          <div className="mt-2 text-gray-700 text-sm">
            Clean pages, fast load, and ready slots for AdSense.
          </div>
        </div>
      </div>
    </Layout>
  );
}
