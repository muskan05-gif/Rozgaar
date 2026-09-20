
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../src/context/AuthContext";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Info,
  Loader2,
  RefreshCw,
  Sparkles,
} from "lucide-react";

/* ---------------------------------------------------------------
   Config
   - Local backend: http://127.0.0.1:8000
   - Production: https://rozgaar-backend.fastapicloud.dev
---------------------------------------------------------------- */
const DEFAULT_BASE_URL = "https://rozgaar-backend.fastapicloud.dev";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/* ---------------------------------------------------------------
   Helpers
---------------------------------------------------------------- */

function parseISODate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

function weekdayShort(iso) {
  return WEEKDAYS[parseISODate(iso).getUTCDay()];
}

function formatShortDate(iso) {
  const d = parseISODate(iso);
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}`;
}

function percentChange(current, previous) {
  if (!previous) return null;
  return ((current - previous) / previous) * 100;
}

function formatPercent(value) {
  if (value === null || value === undefined) return "—";

  const rounded = Math.abs(value).toFixed(1);

  if (value > 0) return `+${rounded}%`;
  if (value < 0) return `−${rounded}%`;

  return "0.0%";
}

/* ---------------------------------------------------------------
   Data hook
---------------------------------------------------------------- */

function useWeeklyForecast({ baseUrl, token, onUnauthorized }) {
  const [state, setState] = useState({
    status: "loading",
    data: null,
    error: null,
  });

  const [reloadKey, setReloadKey] = useState(0);

  const onUnauthorizedRef = useRef(onUnauthorized);
  onUnauthorizedRef.current = onUnauthorized;

  const reload = useCallback(() => {
    setReloadKey((k) => k + 1);
  }, []);

  useEffect(() => {
    // Do not call the API if there is no token.
    if (!token) {
      setState({
        status: "error",
        data: null,
        error: {
          message: "You are not logged in. Please log in again.",
          retryable: false,
        },
      });

      return;
    }

    const controller = new AbortController();

    setState({
      status: "loading",
      data: null,
      error: null,
    });

    (async () => {
      try {
        const res = await fetch(`${baseUrl}/forecast/weekly`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
        });

        if (res.ok) {
          const data = await res.json();

          setState({
            status: "success",
            data,
            error: null,
          });

          return;
        }

        if (res.status === 401) {
          onUnauthorizedRef.current?.();

          setState({
            status: "error",
            data: null,
            error: {
              message: "Your session has expired. Please log in again.",
              retryable: false,
            },
          });

          return;
        }

        if (res.status === 403) {
          setState({
            status: "error",
            data: null,
            error: {
              message: "You don't have access to this forecast.",
              retryable: false,
            },
          });

          return;
        }

        if (res.status === 503) {
          const body = await res.json().catch(() => null);

          setState({
            status: "error",
            data: null,
            error: {
              message:
                typeof body?.detail === "string"
                  ? body.detail
                  : "The forecast can't be built right now.",
              retryable: true,
            },
          });

          return;
        }

        setState({
          status: "error",
          data: null,
          error: {
            message: `Something went wrong (error ${res.status}).`,
            retryable: true,
          },
        });
      } catch (err) {
        if (err.name === "AbortError") return;

        setState({
          status: "error",
          data: null,
          error: {
            message:
              "Couldn't reach the server. Check your connection and try again.",
            retryable: true,
          },
        });
      }
    })();

    return () => controller.abort();
  }, [baseUrl, token, reloadKey]);

  return {
    ...state,
    reload,
  };
}

/* ---------------------------------------------------------------
   Small components
---------------------------------------------------------------- */

function ChangeBadge({ value }) {
  if (value === null || value === undefined) {
    return (
      <span className="inline-flex items-center rounded-full bg-stone-100 px-2.5 py-1 text-xs font-semibold text-stone-500">
        —
      </span>
    );
  }

  const isUp = value > 0;
  const isDown = value < 0;

  const tone = isUp
    ? "bg-emerald-50 text-emerald-700"
    : isDown
      ? "bg-red-50 text-red-700"
      : "bg-stone-100 text-stone-500";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${tone}`}
    >
      {isUp && <ArrowUpRight size={13} />}
      {isDown && <ArrowDownRight size={13} />}
      {formatPercent(value)}
    </span>
  );
}

/* ---------------------------------------------------------------
   7-day mini chart
---------------------------------------------------------------- */

function MiniChart({ daily = [] }) {
  if (!daily.length) {
    return (
      <div className="flex h-16 items-center justify-center text-xs text-stone-400">
        No daily forecast available
      </div>
    );
  }

  const max = Math.max(...daily.map((d) => d.predicted), 1);

  return (
    <div>
      <div className="flex h-16 items-end gap-1.5">
        {daily.map((d) => (
          <div
            key={d.date}
            className="flex-1 rounded-t-[3px] bg-[#485168]"
            style={{
              height: `${Math.max((d.predicted / max) * 100, 4)}%`,
            }}
            title={`${weekdayShort(d.date)} ${formatShortDate(
              d.date
            )}: ${Number(d.predicted).toFixed(1)}`}
          />
        ))}
      </div>

      <div className="mt-1.5 flex gap-1.5 border-t border-stone-200 pt-1.5">
        {daily.map((d) => (
          <span
            key={d.date}
            className="flex-1 text-center text-[10px] font-medium text-stone-400"
          >
            {weekdayShort(d.date).slice(0, 2)}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   Service card
---------------------------------------------------------------- */

function ServiceCard({ item }) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-5">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold text-[#141B33]">
          {item.service_type}
        </h3>

        <ChangeBadge value={item.change_pct} />
      </div>

      <p className="mt-4 text-3xl font-semibold text-[#141B33]">
        {item.expected_next_week}
      </p>

      <p className="mt-0.5 text-xs text-stone-500">
        Previous week: {item.previous_week}
      </p>

      <div className="mt-5">
        <MiniChart daily={item.daily} />
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   Summary stat
---------------------------------------------------------------- */

function SummaryStat({ label, children }) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-5">
      <p className="text-xs font-medium text-stone-500">{label}</p>

      <div className="mt-2 text-2xl font-semibold text-[#141B33]">
        {children}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   Page
---------------------------------------------------------------- */

export default function SocietyDemandForecast() {
  const navigate = useNavigate();

  // Get the authenticated session from your existing AuthContext.
  const { session } = useAuth();

  const token = session?.token;

  const baseUrl = DEFAULT_BASE_URL;

  const onUnauthorized = useCallback(() => {
    navigate("/login", { replace: true });
  }, [navigate]);

  const { status, data, error, reload } = useWeeklyForecast({
    baseUrl,
    token,
    onUnauthorized,
  });

  const [sortBy, setSortBy] = useState("name");

  const services = data?.services ?? [];

  /* -------------------------------------------------------------
     Summary totals
  ------------------------------------------------------------- */

  const totals = useMemo(() => {
    const expected = services.reduce(
      (sum, service) => sum + Number(service.expected_next_week || 0),
      0
    );

    const previous = services.reduce(
      (sum, service) => sum + Number(service.previous_week || 0),
      0
    );

    return {
      expected,
      previous,
      change: percentChange(expected, previous),
    };
  }, [services]);

  /* -------------------------------------------------------------
     Chart scaling
  ------------------------------------------------------------- */

  const chartMax = useMemo(
    () =>
      Math.max(
        ...services.flatMap((service) => [
          Number(service.expected_next_week || 0),
          Number(service.previous_week || 0),
        ]),
        1
      ),
    [services]
  );

  /* -------------------------------------------------------------
     Peak service
  ------------------------------------------------------------- */

  const peakService = useMemo(() => {
    if (!services.length) return null;

    return services.reduce((best, service) =>
      service.expected_next_week > best.expected_next_week
        ? service
        : best
    );
  }, [services]);

  /* -------------------------------------------------------------
     Sorting
  ------------------------------------------------------------- */

  const sortedServices = useMemo(() => {
    if (sortBy === "demand") {
      return [...services].sort(
        (a, b) => b.expected_next_week - a.expected_next_week
      );
    }

    return services;
  }, [services, sortBy]);

  return (
    <div className="min-h-full bg-[#fafafa] p-6">
      {/* =========================================================
          Header
      ========================================================= */}

      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold tracking-tight text-[#141B33]">
              Demand Forecasting
            </h1>

            <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600">
              Next Week
            </span>
          </div>

          <p className="mt-1.5 text-sm text-stone-500">
            Overall demand forecast across all societies
            {data &&
              ` for ${formatShortDate(
                data.forecast_from
              )} to ${formatShortDate(data.forecast_to)}`}
            .
          </p>
        </div>

        {status === "success" && (
          <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2">
            <Sparkles size={15} className="text-emerald-600" />

            <span className="text-xs font-semibold text-emerald-700">
              AI Forecast Active
            </span>
          </div>
        )}
      </div>

      {/* =========================================================
          Loading
      ========================================================= */}

      {status === "loading" && (
        <div className="flex items-center justify-center gap-3 rounded-2xl border border-stone-200 bg-white p-16 text-sm text-stone-500 shadow-sm">
          <Loader2 size={18} className="animate-spin text-[#141B33]" />
          Loading forecast…
        </div>
      )}

      {/* =========================================================
          Error
      ========================================================= */}

      {status === "error" && (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-red-200 bg-white p-12 text-center shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50">
            <AlertTriangle size={20} className="text-red-600" />
          </div>

          <p className="max-w-md text-sm text-stone-700">
            {error.message}
          </p>

          {error.retryable && (
            <button
              type="button"
              onClick={reload}
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#141B33] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1c2544] active:scale-[0.99]"
            >
              <RefreshCw size={15} />
              Try again
            </button>
          )}
        </div>
      )}

      {/* =========================================================
          Success
      ========================================================= */}

      {status === "success" && data && (
        <>
          {/* Prototype banner */}

          {data.data_source === "synthetic_seed" && (
            <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
              <Info
                size={16}
                className="mt-0.5 shrink-0 text-amber-600"
              />

              <p className="text-xs font-semibold leading-5 text-amber-800">
                Prototype forecast, based on synthetic data
              </p>
            </div>
          )}

          {/* =====================================================
              Summary
          ===================================================== */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <SummaryStat label="Expected next week">
              {totals.expected}
            </SummaryStat>

            <SummaryStat label="Previous week">
              {totals.previous}
            </SummaryStat>

            <SummaryStat label="Change vs previous week">
              <ChangeBadge value={totals.change} />
            </SummaryStat>
          </div>

          {/* =====================================================
              Overview chart
          ===================================================== */}

          <section className="mt-6 rounded-2xl border border-stone-200 bg-white p-7 shadow-sm">
            <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-[#141B33]">
                  Demand by service
                </h2>

                <p className="mt-2 text-sm text-stone-500">
                  Expected bookings per service compared with the
                  previous week.
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-7">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-[2px] bg-[#141B33]" />

                <span className="text-sm text-stone-500">
                  Expected Bookings
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-[2px] border border-[#c8ceda] bg-[#f1f2f5]" />

                <span className="text-sm text-stone-500">
                  Previous Week
                </span>
              </div>
            </div>

            <div className="mt-8 overflow-x-auto">
              <div className="min-w-[850px]">
                <div className="flex h-[285px] items-end justify-between gap-5 border-b border-stone-200 px-4">
                  {services.map((item) => {
                    const isPeak =
                      item.service_type === peakService?.service_type;

                    return (
                      <div
                        key={item.service_type}
                        className="flex h-full flex-1 items-end justify-center gap-2"
                      >
                        {/* Previous week */}

                        <div
                          className="w-9 rounded-t-md border border-[#c8ceda] bg-[#f1f2f5]"
                          style={{
                            height: `${
                              (item.previous_week / chartMax) * 235
                            }px`,
                          }}
                          title={`Previous week: ${item.previous_week}`}
                        />

                        {/* Forecast */}

                        <div
                          className={`relative w-9 rounded-t-md ${
                            isPeak
                              ? "bg-[#141B33]"
                              : "bg-[#485168]"
                          }`}
                          style={{
                            height: `${
                              (item.expected_next_week / chartMax) *
                              235
                            }px`,
                          }}
                          title={`Forecast: ${item.expected_next_week}`}
                        >
                          {isPeak && (
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-semibold text-[#141B33]">
                              {item.expected_next_week} · Peak
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Service names */}

                <div className="mt-4 flex justify-between gap-5 px-4">
                  {services.map((item) => (
                    <div
                      key={item.service_type}
                      className="flex-1 text-center"
                    >
                      <p className="mx-auto max-w-[95px] text-sm font-medium leading-5 text-[#141B33]">
                        {item.service_type}
                      </p>

                      <p className="mt-1 text-xs font-medium text-stone-500">
                        {formatPercent(item.change_pct)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* =====================================================
              Per-service cards
          ===================================================== */}

          <section className="mt-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[#141B33]">
                Daily outlook by service
              </h2>

              <div className="inline-flex rounded-lg border border-stone-200 bg-white p-1">
                {[
                  { id: "name", label: "A–Z" },
                  { id: "demand", label: "Highest demand" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSortBy(opt.id)}
                    className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                      sortBy === opt.id
                        ? "bg-[#141B33] text-white"
                        : "text-stone-500 hover:text-[#141B33]"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {sortedServices.map((item) => (
                <ServiceCard
                  key={item.service_type}
                  item={item}
                />
              ))}
            </div>
          </section>

          {/* =====================================================
              Footer
          ===================================================== */}

          <p className="mt-6 text-xs text-stone-500">
            Model: {data.model.name} · typical error about{" "}
            {Number(data.model.test_mae).toFixed(1)} requests/day
          </p>
        </>
      )}
    </div>
  );
}

