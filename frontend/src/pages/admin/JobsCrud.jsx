import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Layout from "../../components/Layout.jsx";
import { THEME } from "../../app/theme.js";
import { api } from "../../services/api.js";
import { getToken, initAdminAuth } from "../../services/adminAuth.js";

const EMPTY_FORM = {
  category_name: "",
  country_name: "",
  city_name: "",
  company_name: "",
  company_logo_path: "",
  title: "",
  description: "",
  requirements: "",
  location_text: "",
  apply_url: "",
  seo_title: "",
  seo_description: "",
  publish_now: true,
  published_at: "",
};

export default function JobsCrud() {
  const nav = useNavigate();
  const [params, setParams] = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");

  // file upload UI
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState("");

  // edit mode
  const [editingId, setEditingId] = useState(null);

  // pagination
  const [meta, setMeta] = useState({ current_page: 1, last_page: 1, total: 0, per_page: 20 });

  // page from URL
  const [page, setPage] = useState(Number(params.get("page") || 1));

  // ADMIN ENTERS NAMES (not IDs)
  const [form, setForm] = useState({ ...EMPTY_FORM });

  useEffect(() => {
    initAdminAuth();
    if (!getToken()) {
      nav("/admin/login", { replace: true });
      return;
    }
    loadJobs(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nav]);

  // keep URL synced with page
  useEffect(() => {
    setParams({ page: String(page) }, { replace: true });
  }, [page, setParams]);

  async function loadJobs(p = 1) {
    setLoading(true);
    setError("");
    try {
      // IMPORTANT: Laravel paginator returns { data: [...], meta/links or current_page... }
      const res = await api.get("/admin/jobs", { params: { page: p } });

      // handle both shapes just in case
      const payload = res.data || {};
      const list = payload.data || payload?.data?.data || [];

      // meta can be directly on payload (Laravel default)
      const m = payload.meta
        ? payload.meta
        : {
            current_page: payload.current_page || 1,
            last_page: payload.last_page || 1,
            total: payload.total || 0,
            per_page: payload.per_page || 20,
          };

      setJobs(Array.isArray(list) ? list : []);
      setMeta({
        current_page: Number(m.current_page || 1),
        last_page: Number(m.last_page || 1),
        total: Number(m.total || 0),
        per_page: Number(m.per_page || 20),
      });

      // keep page consistent if backend clamps it
      const safeCurrent = Number(m.current_page || p || 1);
      if (safeCurrent !== p) setPage(safeCurrent);
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to load jobs");
    } finally {
      setLoading(false);
    }
  }

  async function uploadLogo(file) {
    if (!file) return;

    setUploading(true);
    setUploadMsg("");
    setError("");

    try {
      const fd = new FormData();
      fd.append("file", file);

      const res = await api.post("/admin/upload/company-logo", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const path = res.data?.path || "";
      setForm((f) => ({ ...f, company_logo_path: path }));
      setUploadMsg("Logo uploaded successfully.");
    } catch (e) {
      setError(e?.response?.data?.message || "Logo upload failed");
    } finally {
      setUploading(false);
    }
  }

  function startCreate() {
    setEditingId(null);
    setForm({ ...EMPTY_FORM });
    setError("");
    setUploadMsg("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function startEdit(job) {
    setError("");
    setUploadMsg("");
    setEditingId(job.id);

    setForm({
      category_name: job?.category?.name || "",
      country_name: job?.country?.name || "",
      city_name: job?.city?.name || "",
      company_name: job?.company_name || "",
      company_logo_path: job?.company_logo_path || "",
      title: job?.title || "",
      description: job?.description || "",
      requirements: job?.requirements || "",
      location_text: job?.location_text || "",
      apply_url: job?.apply_url || "",
      seo_title: job?.seo_title || "",
      seo_description: job?.seo_description || "",
      publish_now: !!job?.published_at,
      published_at: job?.published_at ? String(job.published_at).replace("T", " ").slice(0, 19) : "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submit(e) {
    e.preventDefault();
    setError("");
    setUploadMsg("");

    try {
      const publishedAtValue =
        form.publish_now && !form.published_at.trim()
          ? new Date().toISOString().slice(0, 19).replace("T", " ")
          : form.published_at.trim();

      const payload = {
        category_name: form.category_name.trim(),
        country_name: form.country_name.trim(),
        city_name: form.city_name.trim() ? form.city_name.trim() : null,

        company_name: form.company_name.trim(),
        company_logo_path: form.company_logo_path.trim() ? form.company_logo_path.trim() : null,

        title: form.title.trim(),
        description: form.description,
        requirements: form.requirements || null,

        location_text: form.location_text.trim() ? form.location_text.trim() : null,
        apply_url: form.apply_url.trim(),

        seo_title: form.seo_title.trim() ? form.seo_title.trim() : null,
        seo_description: form.seo_description || null,

        published_at: publishedAtValue ? publishedAtValue : null,
      };

      if (editingId) {
        await api.put(`/admin/jobs/${editingId}`, payload);
      } else {
        await api.post("/admin/jobs", payload);
      }

      // reload current page (or clamp if deleted last item)
      await loadJobs(page);
      startCreate();
    } catch (e2) {
      setError(e2?.response?.data?.message || (editingId ? "Update failed" : "Create failed"));
    }
  }

  async function deleteJob(id) {
    const ok = window.confirm("Delete this job? This cannot be undone.");
    if (!ok) return;

    setError("");
    setUploadMsg("");

    try {
      await api.delete(`/admin/jobs/${id}`);

      // if we deleted the last item on the page, go back one page
      const remainingOnPage = Math.max(0, (jobs?.length || 0) - 1);
      const shouldGoBack = remainingOnPage === 0 && page > 1;

      const nextPage = shouldGoBack ? page - 1 : page;
      setPage(nextPage);
      await loadJobs(nextPage);

      if (editingId === id) startCreate();
    } catch (e) {
      setError(e?.response?.data?.message || "Delete failed");
    }
  }

  // Pagination UI builder
  function PaginationBar() {
    const current = Number(meta.current_page || 1);
    const last = Number(meta.last_page || 1);
    if (last <= 1) return null;

    const go = (p) => {
      if (p < 1 || p > last || p === current) return;
      setPage(p);
      loadJobs(p);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const pages = [];
    const push = (v) => pages.push(v);

    push(1);

    const left = Math.max(2, current - 1);
    const right = Math.min(last - 1, current + 1);

    if (left > 2) push("...");

    for (let p = left; p <= right; p++) push(p);

    if (right < last - 1) push("...");

    if (last > 1) push(last);

    return (
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => go(current - 1)}
          disabled={current <= 1}
          className="rounded-xl border bg-white px-3 py-2 text-xs shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
        >
          Prev
        </button>

        {pages.map((p, idx) =>
          p === "..." ? (
            <span key={`dots-${idx}`} className="px-2 text-xs text-gray-500">
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => go(p)}
              className={
                "rounded-xl border px-3 py-2 text-xs shadow-sm " +
                (p === current ? "bg-black text-white border-black" : "bg-white hover:bg-gray-50")
              }
            >
              {p}
            </button>
          )
        )}

        <button
          onClick={() => go(current + 1)}
          disabled={current >= last}
          className="rounded-xl border bg-white px-3 py-2 text-xs shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    );
  }

  return (
    <Layout>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold" style={{ color: THEME.brand.dark }}>
            Jobs CRUD
          </h1>
          <p className="mt-1 text-sm text-gray-600">Admin enters names (category/country/city)</p>
        </div>

        <button
          onClick={startCreate}
          className="rounded-xl px-4 py-2 text-sm font-semibold text-white"
          style={{ backgroundColor: THEME.brand.dark }}
        >
          New Job
        </button>
      </div>

      {error ? (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {uploadMsg ? (
        <div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700">
          {uploadMsg}
        </div>
      ) : null}

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold">{editingId ? `Edit Job #${editingId}` : "Create Job"}</div>
            {editingId ? (
              <button
                onClick={startCreate}
                className="rounded-xl px-3 py-2 text-xs font-semibold"
                style={{ color: THEME.brand.blue }}
              >
                Cancel edit
              </button>
            ) : null}
          </div>

          <form onSubmit={submit} className="mt-4 space-y-3">
            <div className="grid gap-3 md:grid-cols-3">
              <input
                className="rounded-xl border px-3 py-2 text-sm"
                style={{ borderColor: "#E5E7EB" }}
                placeholder="Category name"
                value={form.category_name}
                onChange={(e) => setForm({ ...form, category_name: e.target.value })}
                required
              />
              <input
                className="rounded-xl border px-3 py-2 text-sm"
                style={{ borderColor: "#E5E7EB" }}
                placeholder="Country name"
                value={form.country_name}
                onChange={(e) => setForm({ ...form, country_name: e.target.value })}
                required
              />
              <input
                className="rounded-xl border px-3 py-2 text-sm"
                style={{ borderColor: "#E5E7EB" }}
                placeholder="City name (optional)"
                value={form.city_name}
                onChange={(e) => setForm({ ...form, city_name: e.target.value })}
              />
            </div>

            <input
              className="w-full rounded-xl border px-3 py-2 text-sm"
              style={{ borderColor: "#E5E7EB" }}
              placeholder="Company name"
              value={form.company_name}
              onChange={(e) => setForm({ ...form, company_name: e.target.value })}
              required
            />

            <div className="rounded-xl border p-3" style={{ borderColor: "#E5E7EB" }}>
              <div className="text-sm font-semibold">Company logo upload</div>
              <div className="mt-2 grid gap-2">
                <input
                  type="file"
                  accept=".png,.jpg,.jpeg,.webp"
                  disabled={uploading}
                  onChange={(e) => uploadLogo(e.target.files?.[0])}
                />
                <div className="text-xs text-gray-600">
                  Stored path: <span className="font-mono">{form.company_logo_path || "-"}</span>
                </div>
              </div>
            </div>

            <input
              className="w-full rounded-xl border px-3 py-2 text-sm"
              style={{ borderColor: "#E5E7EB" }}
              placeholder="Job title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />

            <textarea
              className="w-full rounded-xl border px-3 py-2 text-sm"
              style={{ borderColor: "#E5E7EB" }}
              placeholder="Description"
              rows={4}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
            />

            <textarea
              className="w-full rounded-xl border px-3 py-2 text-sm"
              style={{ borderColor: "#E5E7EB" }}
              placeholder="Requirements (optional)"
              rows={3}
              value={form.requirements}
              onChange={(e) => setForm({ ...form, requirements: e.target.value })}
            />

            <input
              className="w-full rounded-xl border px-3 py-2 text-sm"
              style={{ borderColor: "#E5E7EB" }}
              placeholder="Location text (optional)"
              value={form.location_text}
              onChange={(e) => setForm({ ...form, location_text: e.target.value })}
            />

            <input
              className="w-full rounded-xl border px-3 py-2 text-sm"
              style={{ borderColor: "#E5E7EB" }}
              placeholder="Apply URL"
              value={form.apply_url}
              onChange={(e) => setForm({ ...form, apply_url: e.target.value })}
              required
            />

            <div className="grid gap-3 md:grid-cols-2">
              <input
                className="rounded-xl border px-3 py-2 text-sm"
                style={{ borderColor: "#E5E7EB" }}
                placeholder="SEO title (optional)"
                value={form.seo_title}
                onChange={(e) => setForm({ ...form, seo_title: e.target.value })}
              />
              <input
                className="rounded-xl border px-3 py-2 text-sm"
                style={{ borderColor: "#E5E7EB" }}
                placeholder="Published at (YYYY-MM-DD HH:MM:SS) optional"
                value={form.published_at}
                onChange={(e) => setForm({ ...form, published_at: e.target.value })}
              />
            </div>

            <textarea
              className="w-full rounded-xl border px-3 py-2 text-sm"
              style={{ borderColor: "#E5E7EB" }}
              placeholder="SEO description (optional)"
              rows={2}
              value={form.seo_description}
              onChange={(e) => setForm({ ...form, seo_description: e.target.value })}
            />

            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={form.publish_now}
                onChange={(e) => setForm({ ...form, publish_now: e.target.checked })}
              />
              Publish now (sets published_at automatically if empty)
            </label>

            <button
              disabled={uploading}
              className="w-full rounded-xl px-4 py-3 text-sm font-semibold text-white disabled:opacity-70"
              style={{ backgroundColor: editingId ? THEME.brand.orange : THEME.brand.blue }}
            >
              {uploading ? "Uploading logo..." : editingId ? "Update Job" : "Create Job"}
            </button>
          </form>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-sm font-semibold">Existing Jobs</div>
              <div className="mt-1 text-xs text-gray-500">
                Total: <span className="font-semibold">{meta.total}</span> • Page{" "}
                <span className="font-semibold">{meta.current_page}</span> /{" "}
                <span className="font-semibold">{meta.last_page}</span>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="mt-3 text-sm text-gray-600">Loading jobs...</div>
          ) : (
            <>
              <div className="mt-3 space-y-3">
                {jobs?.map((j) => (
                  <div key={j.id} className="rounded-xl border p-3" style={{ borderColor: "#E5E7EB" }}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-sm font-semibold truncate">{j.title}</div>
                        <div className="text-xs text-gray-600 truncate">{j.company_name}</div>
                        <div className="mt-2 text-xs text-gray-500">
                          Published: {j.published_at ? String(j.published_at) : "NO (won’t show publicly)"}
                        </div>
                      </div>

                      <div className="flex shrink-0 gap-2">
                        <button
                          onClick={() => startEdit(j)}
                          className="rounded-lg px-3 py-2 text-xs font-semibold text-white"
                          style={{ backgroundColor: THEME.brand.blue }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteJob(j.id)}
                          className="rounded-lg px-3 py-2 text-xs font-semibold text-white"
                          style={{ backgroundColor: THEME.brand.dark }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {!jobs || jobs.length === 0 ? <div className="text-sm text-gray-600">No jobs yet.</div> : null}
              </div>

              {/* ✅ PAGINATION UI (admin) */}
              <PaginationBar />
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
