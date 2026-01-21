import { THEME } from "../app/theme.js";

export default function FiltersBar({
  q,
  setQ,
  category,
  setCategory,
  country,
  setCountry,
  city,
  setCity,
  categories,
  countries,
  cities,
  loadingCities,
}) {
  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:items-end">
        <div className="md:col-span-4">
          <label className="block text-sm font-semibold text-gray-700">Keyword</label>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search title, company, description..."
            className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2"
            style={{ borderColor: "#E5E7EB" }}
          />
        </div>

        <div className="md:col-span-3">
          <label className="block text-sm font-semibold text-gray-700">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 bg-white"
            style={{ borderColor: "#E5E7EB" }}
          >
            <option value="">All Categories</option>
            {categories?.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-3">
          <label className="block text-sm font-semibold text-gray-700">Country</label>
          <select
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
              setCity("all");
            }}
            className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 bg-white"
            style={{ borderColor: "#E5E7EB" }}
          >
            <option value="">All Countries</option>
            {countries?.map((c) => (
              <option key={c.id} value={c.iso2}>
                {c.flag_emoji ? `${c.flag_emoji} ` : ""}{c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700">City</label>
          <select
            value={city}
            disabled={!country || loadingCities}
            onChange={(e) => setCity(e.target.value)}
            className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 bg-white disabled:opacity-60"
            style={{ borderColor: "#E5E7EB" }}
          >
            <option value="all">All Cities</option>
            {cities?.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>

          {!country ? (
            <div className="mt-1 text-xs text-gray-500">Choose country first</div>
          ) : loadingCities ? (
            <div className="mt-1 text-xs" style={{ color: THEME.brand.blue }}>
              Loading cities...
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-3 text-xs text-gray-500">
        Category-first browsing + country flags + dependent city dropdown (All Cities supported).
      </div>
    </div>
  );
}
