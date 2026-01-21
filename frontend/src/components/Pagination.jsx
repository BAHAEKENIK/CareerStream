export default function Pagination({ meta, onPageChange }) {
  const current = Number(meta?.current_page || 1);
  const last = Number(meta?.last_page || 1);

  if (last <= 1) return null;

  const go = (p) => {
    if (p < 1 || p > last || p === current) return;
    onPageChange(p);
  };

  // build pages like: 1 ... 4 5 6 ... last
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
    <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
      <button
        onClick={() => go(current - 1)}
        disabled={current <= 1}
        className="rounded-xl border bg-white px-3 py-2 text-sm shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
      >
        Prev
      </button>

      {pages.map((p, idx) =>
        p === "..." ? (
          <span key={`dots-${idx}`} className="px-2 text-sm text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => go(p)}
            className={
              "rounded-xl border px-3 py-2 text-sm shadow-sm " +
              (p === current
                ? "bg-black text-white border-black"
                : "bg-white hover:bg-gray-50")
            }
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => go(current + 1)}
        disabled={current >= last}
        className="rounded-xl border bg-white px-3 py-2 text-sm shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
