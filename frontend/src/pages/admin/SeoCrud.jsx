import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout.jsx";
import { THEME } from "../../app/theme.js";
import { api } from "../../services/api.js";
import { getToken, initAdminAuth } from "../../services/adminAuth.js";

export default function SeoCrud() {
  const nav = useNavigate();

  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    page_key: "home",
    title: "",
    description: "",
    canonical_url: "",
  });

  useEffect(() => {
    initAdminAuth();
    if (!getToken()) {
      nav("/admin/login", { replace: true });
      return;
    }

    (async () => {
      setError("");
      try {
        const res = await api.get("/admin/seo");
        setItems(res.data || []);
      } catch (e) {
        setError(e?.response?.data?.message || "Failed to load SEO");
      }
    })();
  }, [nav]);

  async function createSeo(e) {
    e.preventDefault();
    setError("");
    try {
      await api.post("/admin/seo", form);
      nav(0);
    } catch (e2) {
      setError(e2?.response?.data?.message || "Create SEO failed");
    }
  }

  return (
    <Layout>
      <h1 className="text-2xl font-extrabold" style={{ color: THEME.brand.dark }}>
        SEO Meta
      </h1>
      <p className="mt-1 text-sm text-gray-600">
        Manage SEO meta for pages and dynamic keys like category:it, country:MA, city:rabat.
      </p>

      {error ? (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="text-sm font-semibold">Create / Update (manual)</div>
          <form onSubmit={createSeo} className="mt-4 space-y-3">
            <input className="w-full rounded-xl border px-3 py-2 text-sm" style={{ borderColor: "#E5E7EB" }}
              placeholder="page_key (home)" value={form.page_key}
              onChange={(e) => setForm({ ...form, page_key: e.target.value })} required />

            <input className="w-full rounded-xl border px-3 py-2 text-sm" style={{ borderColor: "#E5E7EB" }}
              placeholder="title" value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })} />

            <textarea className="w-full rounded-xl border px-3 py-2 text-sm" style={{ borderColor: "#E5E7EB" }}
              placeholder="description" rows={3} value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })} />

            <input className="w-full rounded-xl border px-3 py-2 text-sm" style={{ borderColor: "#E5E7EB" }}
              placeholder="canonical_url" value={form.canonical_url}
              onChange={(e) => setForm({ ...form, canonical_url: e.target.value })} />

            <button className="w-full rounded-xl px-4 py-3 text-sm font-semibold text-white"
              style={{ backgroundColor: THEME.brand.orange }}>
              Save
            </button>
          </form>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="text-sm font-semibold">Existing</div>
          <div className="mt-3 space-y-3 text-sm">
            {items?.map((x) => (
              <div key={x.id} className="rounded-xl border p-3" style={{ borderColor: "#E5E7EB" }}>
                <div className="font-semibold">{x.page_key}</div>
                <div className="text-xs text-gray-600">{x.title || "-"}</div>
              </div>
            ))}
            {(!items || items.length === 0) ? (
              <div className="text-sm text-gray-600">No SEO records yet.</div>
            ) : null}
          </div>
        </div>
      </div>
    </Layout>
  );
}
