import { Link } from "react-router-dom";
import { THEME } from "../app/theme.js";

export default function JobCard({ job }) {
  const categoryName = job?.category?.name || "";
  const countryName = job?.country?.name || "";
  const flag = job?.country?.flag_emoji || "";
  const cityName = job?.city?.name || "";

  const locationLine = [flag, countryName, cityName].filter(Boolean).join(" ");

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-xl bg-gray-100 overflow-hidden flex items-center justify-center">
          {job?.company_logo_url ? (
            <img
              src={job.company_logo_url}
              alt={job.company_name || "Company"}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <span className="text-xs text-gray-500">LOGO</span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="text-sm text-gray-600 truncate">{job?.company_name}</div>
              <h3 className="text-lg font-bold text-gray-900 truncate">{job?.title}</h3>
            </div>

            {categoryName ? (
              <span
                className="shrink-0 rounded-full px-3 py-1 text-xs font-semibold text-white"
                style={{ backgroundColor: THEME.brand.green }}
              >
                {categoryName}
              </span>
            ) : null}
          </div>

          {locationLine ? (
            <div className="mt-2 text-sm text-gray-600">{locationLine}</div>
          ) : null}

          <div className="mt-4 flex items-center gap-3">
            <Link
              to={`/jobs/${job?.id}`}
              className="rounded-xl px-4 py-2 text-sm font-semibold text-white"
              style={{ backgroundColor: THEME.brand.blue }}
            >
              View
            </Link>

            {job?.apply_url ? (
              <a
                href={job.apply_url}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl px-4 py-2 text-sm font-semibold"
                style={{ color: THEME.brand.orange }}
              >
                Apply
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
