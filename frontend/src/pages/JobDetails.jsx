import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import { api } from "../services/api.js";
import { THEME } from "../app/theme.js";
import SEO from "../app/seo.jsx";

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const canonical = useMemo(() => `http://localhost:5173/jobs/${id}`, [id]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await api.get(`/jobs/${id}`);
        setJob(res.data?.data || res.data || null);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const seoTitle = job?.seo?.title || job?.seo_title || (job ? `${job.title} | CareerStream` : "Job | CareerStream");
  const seoDesc =
    job?.seo?.description ||
    job?.seo_description ||
    (job?.description ? String(job.description).slice(0, 160) : "Find jobs on CareerStream.");

  const locationLine = job
    ? [job?.country?.flag_emoji || "", job?.country?.name || "", job?.city?.name || ""]
        .filter(Boolean)
        .join(" ")
    : "";

  return (
    <Layout>
      <SEO
        title={loading ? "Loading job... | CareerStream" : seoTitle}
        description={loading ? "Loading job details..." : seoDesc}
        canonical={canonical}
        noIndex={!job && !loading}
      />

      <div className="flex items-center justify-between gap-4">
        <Link to="/jobs" className="text-sm font-semibold" style={{ color: THEME.brand.blue }}>
          ← Back to Jobs
        </Link>
      </div>

      {loading ? (
        <div className="mt-5 rounded-2xl border bg-white p-6 text-sm text-gray-600 shadow-sm">
          Loading job...
        </div>
      ) : !job ? (
        <div className="mt-5 rounded-2xl border bg-white p-6 text-sm text-gray-600 shadow-sm">
          Job not found.
        </div>
      ) : (
        <div className="mt-5 rounded-2xl border bg-white p-7 shadow-sm">
          <div className="flex items-start gap-5">
            <div className="h-16 w-16 rounded-2xl bg-gray-100 overflow-hidden flex items-center justify-center">
              {job?.company_logo_url ? (
                <img
                  src={job.company_logo_url}
                  alt={job.company_name || "Company"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-xs text-gray-500">LOGO</span>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="text-sm text-gray-600">{job.company_name}</div>
              <h1 className="text-2xl font-extrabold" style={{ color: THEME.brand.dark }}>
                {job.title}
              </h1>

              {locationLine ? <div className="mt-2 text-sm text-gray-600">{locationLine}</div> : null}

              {job?.category?.name ? (
                <div
                  className="mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold text-white"
                  style={{ backgroundColor: THEME.brand.green }}
                >
                  {job.category.name}
                </div>
              ) : null}

              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={job.apply_url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl px-5 py-3 text-sm font-semibold text-white"
                  style={{ backgroundColor: THEME.brand.orange }}
                >
                  Apply Now
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div>
              <h2 className="text-lg font-bold">Description</h2>
              <div className="mt-2 whitespace-pre-wrap text-sm text-gray-700">{job.description}</div>
            </div>

            <div>
              <h2 className="text-lg font-bold">Requirements</h2>
              <div className="mt-2 whitespace-pre-wrap text-sm text-gray-700">
                {job.requirements || "Not specified."}
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
