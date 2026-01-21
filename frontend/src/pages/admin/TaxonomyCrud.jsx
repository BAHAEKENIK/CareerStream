import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout.jsx";
import { THEME } from "../../app/theme.js";
import { api } from "../../services/api.js";
import { getToken, initAdminAuth } from "../../services/adminAuth.js";

export default function TaxonomyCrud() {
  const nav = useNavigate();

  const [tab, setTab] = useState("categories");
  const [error, setError] = useState("");

  const [categories, setCategories] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  const [catName, setCatName] = useState("");
  const [countryForm, setCountryForm] = useState({ name: "", iso2: "", flag_emoji: "" });
  const [cityForm, setCityForm] = useState({ country_name: "", name: "" });

  useEffect(() => {
    initAdminAuth();
    if (!getToken()) {
      nav("/admin/login", { replace: true });
      return;
    }
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nav]);

  async function loadAll() {
    setError("");
    try {
      const [catRes, countryRes, cityRes] = await Promise.all([
        api.get("/admin/categories"),
        api.get("/admin/countries"),
        api.get("/admin/cities"),
      ]);
      setCategories(catRes.data || []);
      setCountries(countryRes.data || []);
      setCities(cityRes.data || []);
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to load taxonomies");
    }
  }

  async function createCategory(e) {
    e.preventDefault();
    setError("");
    try {
      await api.post("/admin/categories", { name: catName });
      setCatName("");
      await loadAll();
    } catch (e2) {
      setError(e2?.response?.data?.message || "Create category failed");
    }
  }

  async function createCountry(e) {
    e.preventDefault();
    setError("");
    try {
      await api.post("/admin/countries", countryForm);
      setCountryForm({ name: "", iso2: "", flag_emoji: "" });
      await loadAll();
    } catch (e2) {
      setError(e2?.response?.data?.message || "Create country failed");
    }
  }

  async function createCity(e) {
    e.preventDefault();
    setError("");
    try {
      await api.post("/admin/cities", cityForm);
      setCityForm({ country_name: "", name: "" });
      await loadAll();
    } catch (e2) {
      setError(e2?.response?.data?.message || "Create city failed");
    }
  }

  return (
    <Layout>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold" style={{ color: THEME.brand.dark }}>
            Taxonomies
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage categories, countries (with flags), and cities (by country name).
          </p>
        </div>
      </div>

      {error ? (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="mt-5 flex flex-wrap gap-2">
        {["categories", "countries", "cities"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="rounded-xl px-4 py-2 text-sm font-semibold border"
            style={{
              borderColor: "#E5E7EB",
              backgroundColor: tab === t ? THEME.brand.blue : "white",
              color: tab === t ? "white" : THEME.brand.dark,
            }}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          {tab === "categories" ? (
            <>
              <div className="text-sm font-semibold">Create Category</div>
              <form onSubmit={createCategory} className="mt-3 space-y-3">
                <input
                  className="w-full rounded-xl border px-3 py-2 text-sm"
                  style={{ borderColor: "#E5E7EB" }}
                  placeholder="Category name"
                  value={catName}
                  onChange={(e) => setCatName(e.target.value)}
                  required
                />
                <button className="w-full rounded-xl px-4 py-3 text-sm font-semibold text-white"
                  style={{ backgroundColor: THEME.brand.green }}>
                  Create
                </button>
              </form>
            </>
          ) : null}

          {tab === "countries" ? (
            <>
              <div className="text-sm font-semibold">Create Country</div>
              <form onSubmit={createCountry} className="mt-3 space-y-3">
                <input className="w-full rounded-xl border px-3 py-2 text-sm" style={{ borderColor: "#E5E7EB" }}
                  placeholder="Country name" value={countryForm.name}
                  onChange={(e) => setCountryForm({ ...countryForm, name: e.target.value })} required />

                <div className="grid gap-3 md:grid-cols-2">
                  <input className="rounded-xl border px-3 py-2 text-sm" style={{ borderColor: "#E5E7EB" }}
                    placeholder="ISO2 (MA)" value={countryForm.iso2}
                    onChange={(e) => setCountryForm({ ...countryForm, iso2: e.target.value })} required />

                  <input className="rounded-xl border px-3 py-2 text-sm" style={{ borderColor: "#E5E7EB" }}
                    placeholder="Flag emoji (🇲🇦)" value={countryForm.flag_emoji}
                    onChange={(e) => setCountryForm({ ...countryForm, flag_emoji: e.target.value })} />
                </div>

                <button className="w-full rounded-xl px-4 py-3 text-sm font-semibold text-white"
                  style={{ backgroundColor: THEME.brand.blue }}>
                  Create
                </button>
              </form>
            </>
          ) : null}

          {tab === "cities" ? (
            <>
              <div className="text-sm font-semibold">Create City</div>
              <form onSubmit={createCity} className="mt-3 space-y-3">
                <input className="w-full rounded-xl border px-3 py-2 text-sm" style={{ borderColor: "#E5E7EB" }}
                  placeholder="Country name (must exist)" value={cityForm.country_name}
                  onChange={(e) => setCityForm({ ...cityForm, country_name: e.target.value })} required />

                <input className="w-full rounded-xl border px-3 py-2 text-sm" style={{ borderColor: "#E5E7EB" }}
                  placeholder="City name" value={cityForm.name}
                  onChange={(e) => setCityForm({ ...cityForm, name: e.target.value })} required />

                <button className="w-full rounded-xl px-4 py-3 text-sm font-semibold text-white"
                  style={{ backgroundColor: THEME.brand.orange }}>
                  Create
                </button>
              </form>
            </>
          ) : null}
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="text-sm font-semibold">List</div>
          <div className="mt-3 space-y-2 text-sm">
            {tab === "categories"
              ? categories.map((c) => (
                  <div key={c.id} className="rounded-xl border p-3" style={{ borderColor: "#E5E7EB" }}>
                    {c.name} <span className="text-xs text-gray-500">({c.slug})</span>
                  </div>
                ))
              : null}

            {tab === "countries"
              ? countries.map((c) => (
                  <div key={c.id} className="rounded-xl border p-3" style={{ borderColor: "#E5E7EB" }}>
                    {c.flag_emoji ? `${c.flag_emoji} ` : ""}{c.name}{" "}
                    <span className="text-xs text-gray-500">({c.iso2})</span>
                  </div>
                ))
              : null}

            {tab === "cities"
              ? cities.map((c) => (
                  <div key={c.id} className="rounded-xl border p-3" style={{ borderColor: "#E5E7EB" }}>
                    {c.name}{" "}
                    <span className="text-xs text-gray-500">
                      (country: {c.country?.name || c.country_id})
                    </span>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </Layout>
  );
}
