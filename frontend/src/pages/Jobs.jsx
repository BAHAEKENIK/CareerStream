import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import FiltersBar from "../components/FiltersBar.jsx";
import JobCard from "../components/JobCard.jsx";
import AdSlot from "../components/AdSlot.jsx";
import Pagination from "../components/Pagination.jsx";
import { api } from "../services/api.js";
import { THEME } from "../app/theme.js";

export default function Jobs() {
  const [params, setParams] = useSearchParams();

  const [q, setQ] = useState(params.get("q") || "");
  const [category, setCategory] = useState(params.get("category") || "");
  const [country, setCountry] = useState(params.get("country") || "");
  const [city, setCity] = useState(params.get("city") || "all");

  const [page, setPage] = useState(Number(params.get("page") || 1));

  const [categories, setCategories] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);

  const [jobs, setJobs] = useState([]);
  const [meta, setMeta] = useState({ current_page: 1, last_page: 1, total: 0 });
  const [loadingJobs, setLoadingJobs] = useState(false);

  const [apiDebug, setApiDebug] = useState("");

  useEffect(() => {
    setPage(1);
  }, [q, category, country, city]);

  const queryObj = useMemo(() => {
    const obj = {};
    if (q.trim()) obj.q = q.trim();
    if (category) obj.category = category;
    if (country) obj.country = country;
    if (city && city !== "all") obj.city = city;
    obj.page = page;
    return obj;
  }, [q, category, country, city, page]);

  useEffect(() => {
    // DEBUG: show what Vercel build is using
    setApiDebug(String(import.meta.env.VITE_API_BASE_URL || "(missing VITE_API_BASE_URL)"));

    (async () => {
      const [catRes, countryRes] = await Promise.all([
        api.get("/taxonomies/categories"),
        api.get("/taxonomies/countries"),
      ]);
      setCategories(catRes.data.categories || []);
      setCountries(countryRes.data.countries || []);
    })();
  }, []);

  useEffect(() => {
    if (!country) {
      setCities([]);
      setCity("all");
      return;
    }

    (async () => {
      setLoadingCities(true);
      try {
        const res = await api.get(`/taxonomies/countries/${country}/cities`);
        setCities(res.data.cities || []);
      } finally {
        setLoadingCities(false);
      }
    })();
  }, [country]);

  useEffect(() => {
    setParams(queryObj, { replace: true });
  }, [queryObj, setParams]);

  useEffect(() => {
    (async () => {
      setLoadingJobs(true);
      try {
        const res = await api.get("/jobs", { params: queryObj });
        setJobs(res.data.data || []);
        setMeta(res.data.meta || { current_page: 1, last_page: 1, total: 0 });
      } finally {
        setLoadingJobs(false);
      }
    })();
  }, [queryObj]);

  const onPageChange = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Layout>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold" style={{ color: THEME.brand.dark }}>
            Browse Jobs
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Category-first browsing + country flags + city dropdown
          </p>

          {/* DEBUG LINE (remove later) */}
          <div className="mt-2 text-xs text-gray-500">
            API: <span className="font-mono">{apiDebug}</span>
          </div>
        </div>

        <div className="text-sm text-gray-600">
          Total: <span className="font-semibold">{meta.total}</span>
        </div>
      </div>

      <AdSlot slot={import.meta.env.VITE_ADSENSE_SLOT_JOBS_TOP || ""} />

      <div className="mt-5">
        <FiltersBar
          q={q}
          setQ={setQ}
          category={category}
          setCategory={setCategory}
          country={country}
          setCountry={setCountry}
          city={city}
          setCity={setCity}
          categories={categories}
          countries={countries}
          cities={cities}
          loadingCities={loadingCities}
        />
      </div>

      <AdSlot slot={import.meta.env.VITE_ADSENSE_SLOT_JOBS_MID || ""} />

      <div className="mt-6">
        {loadingJobs ? (
          <div className="rounded-2xl border bg-white p-6 text-sm text-gray-600 shadow-sm">
            Loading jobs...
          </div>
        ) : jobs.length === 0 ? (
          <div className="rounded-2xl border bg-white p-6 text-sm text-gray-600 shadow-sm">
            No jobs found. Try changing filters.
          </div>
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-2">
              {jobs.map((job, idx) => (
                <div key={job.id}>
                  <JobCard job={job} />
                  {(idx + 1) % 6 === 0 ? (
                    <AdSlot slot={import.meta.env.VITE_ADSENSE_SLOT_JOBS_FEED || ""} />
                  ) : null}
                </div>
              ))}
            </div>

            <Pagination meta={meta} onPageChange={onPageChange} />

            <AdSlot slot={import.meta.env.VITE_ADSENSE_SLOT_JOBS_BOTTOM || ""} />
          </>
        )}
      </div>
    </Layout>
  );
}
