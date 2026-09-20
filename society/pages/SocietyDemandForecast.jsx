import React, { useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronDown,
  CloudRain,
  Sparkles,
  Thermometer,
  TrendingUp,
  Activity,
} from "lucide-react";

const SERVICE_DATA = [
  {
    service: "Appliance Repair",
    forecast: 55,
    previous: 67,
  },
  {
    service: "Carpentry",
    forecast: 57,
    previous: 63,
  },
  {
    service: "Cleaning",
    forecast: 124,
    previous: 135,
  },
  {
    service: "Driving",
    forecast: 62,
    previous: 67,
  },
  {
    service: "Electrical",
    forecast: 72,
    previous: 70,
  },
  {
    service: "Gardening",
    forecast: 38,
    previous: 36,
  },
  {
    service: "Painting",
    forecast: 37,
    previous: 40,
  },
  {
    service: "Plumbing",
    forecast: 115,
    previous: 139,
  },
];

const SERVICE_OPTIONS = SERVICE_DATA.map((item) => item.service);

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getPercentageChange(current, previous) {
  if (!previous) return 0;

  return ((current - previous) / previous) * 100;
}

function formatPercentage(value) {
  const rounded = Math.abs(value).toFixed(1);

  if (value > 0) return `+${rounded}%`;
  if (value < 0) return `−${rounded}%`;

  return "0.0%";
}

function InputLabel({ children }) {
  return (
    <label className="mb-1.5 block text-xs font-semibold text-stone-600">
      {children}
    </label>
  );
}

function SelectInput({ value, onChange, children }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className="h-11 w-full appearance-none rounded-lg border border-stone-200 bg-white px-3.5 pr-10 text-sm font-medium text-stone-800 outline-none transition focus:border-[#141B33] focus:ring-2 focus:ring-[#141B33]/10"
      >
        {children}
      </select>

      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone-400"
      />
    </div>
  );
}

function NumberInput({
  value,
  onChange,
  min,
  max,
  step = "1",
  suffix,
}) {
  return (
    <div className="relative">
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={onChange}
        className={`h-11 w-full rounded-lg border border-stone-200 bg-white px-3.5 ${
          suffix ? "pr-14" : ""
        } text-sm font-medium text-stone-800 outline-none transition focus:border-[#141B33] focus:ring-2 focus:ring-[#141B33]/10`}
      />

      {suffix && (
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-stone-400">
          {suffix}
        </span>
      )}
    </div>
  );
}

export default function SocietyDemandForecast() {
  const [serviceType, setServiceType] = useState("Cleaning");

  const [forecastDate, setForecastDate] = useState("2026-10-27");

  const [temperature, setTemperature] = useState(27.5);
  const [rainfall, setRainfall] = useState(4.2);

  const [lag1, setLag1] = useState(18);
  const [lag7, setLag7] = useState(21);
  const [rolling7, setRolling7] = useState(19.4);

  const [forecastResult, setForecastResult] = useState(null);

  const selectedDate = useMemo(() => {
    const date = new Date(`${forecastDate}T00:00:00`);

    return {
      day: DAY_NAMES[date.getDay()],
      month: MONTH_NAMES[date.getMonth()],
      monthNumber: date.getMonth() + 1,
      isWeekend: date.getDay() === 0 || date.getDay() === 6,
    };
  }, [forecastDate]);

  const totalForecast = SERVICE_DATA.reduce(
    (total, item) => total + item.forecast,
    0
  );

  const totalPrevious = SERVICE_DATA.reduce(
    (total, item) => total + item.previous,
    0
  );

  const overallChange = getPercentageChange(
    totalForecast,
    totalPrevious
  );

  const handleGenerateForecast = () => {
    /*
      Prototype frontend calculation.

      The production version will send these exact features
      to the FastAPI demand forecasting endpoint:

      service_type
      day_of_week
      month
      is_weekend
      temperature
      rainfall
      lag_1
      lag_7
      rolling_7_mean
    */

    const selectedService = SERVICE_DATA.find(
      (item) => item.service === serviceType
    );

    const baseDemand = selectedService?.forecast || 50;

    let prediction = baseDemand;

    // Small prototype adjustments based on input conditions.
    prediction += (Number(lag1) - 18) * 0.15;
    prediction += (Number(lag7) - 21) * 0.2;
    prediction += (Number(rolling7) - 19.4) * 0.25;

    // Weather adjustment.
    if (Number(rainfall) > 10) {
      prediction -= 2;
    }

    if (Number(temperature) >= 32) {
      prediction -= 1;
    }

    if (selectedDate.isWeekend) {
      prediction += 1;
    }

    prediction = Math.max(0, Math.round(prediction));

    setForecastResult({
      value: prediction,
      service: serviceType,
      date: forecastDate,
      day: selectedDate.day,
      month: selectedDate.month,
      isWeekend: selectedDate.isWeekend,
    });
  };

  return (
    <div className="min-h-full bg-[#fafafa] p-6">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}
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
            Expected bookings per service compared with the previous week.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2">
          <Sparkles
            size={15}
            className="text-emerald-600"
          />

          <span className="text-xs font-semibold text-emerald-700">
            AI Forecast Active
          </span>
        </div>
      </div>

      {/* =====================================================
          EXISTING DEMAND FORECAST CARD
      ===================================================== */}
      <section className="rounded-2xl border border-stone-200 bg-white p-7 shadow-sm">

        {/* Card Header */}
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold text-[#141B33]">
                Demand Forecast
              </h2>

              <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-500">
                Next Week
              </span>
            </div>

            <p className="mt-2 text-sm text-stone-500">
              Expected bookings per service compared with the previous week.
            </p>
          </div>

          <div className="text-right">
            <p className="text-[11px] font-medium uppercase tracking-wider text-stone-400">
              Volume
            </p>

            <p className="text-xl font-semibold text-[#141B33]">
              {totalForecast} total
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-8 flex items-center gap-7">
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

        {/* =================================================
            BAR CHART
        ================================================= */}
        <div className="mt-8 overflow-x-auto">
          <div className="min-w-[850px]">

            {/* Bars */}
            <div className="flex h-[285px] items-end justify-between gap-5 border-b border-stone-200 px-4">

              {SERVICE_DATA.map((item) => {
                const maxValue = 145;

                const forecastHeight =
                  (item.forecast / maxValue) * 235;

                const previousHeight =
                  (item.previous / maxValue) * 235;

                const change = getPercentageChange(
                  item.forecast,
                  item.previous
                );

                return (
                  <div
                    key={item.service}
                    className="flex h-full flex-1 items-end justify-center gap-2"
                  >
                    {/* Previous */}
                    <div
                      className="w-9 rounded-t-md border border-[#c8ceda] bg-[#f1f2f5]"
                      style={{
                        height: `${previousHeight}px`,
                      }}
                      title={`Previous week: ${item.previous}`}
                    />

                    {/* Forecast */}
                    <div
                      className={`relative w-9 rounded-t-md ${
                        item.service === "Cleaning"
                          ? "bg-[#141B33]"
                          : "bg-[#485168]"
                      }`}
                      style={{
                        height: `${forecastHeight}px`,
                      }}
                      title={`Forecast: ${item.forecast}`}
                    >
                      {item.service === "Cleaning" && (
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-semibold text-[#141B33]">
                          124 · Peak
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Labels */}
            <div className="mt-4 flex justify-between gap-5 px-4">
              {SERVICE_DATA.map((item) => {
                const change = getPercentageChange(
                  item.forecast,
                  item.previous
                );

                return (
                  <div
                    key={item.service}
                    className="flex-1 text-center"
                  >
                    <p className="mx-auto max-w-[95px] text-sm font-medium leading-5 text-[#141B33]">
                      {item.service}
                    </p>

                    <p className="mt-1 text-xs font-medium text-stone-500">
                      {formatPercentage(change)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-7 border-t border-stone-200 pt-5">
          <p className="text-sm text-stone-500">
            Cleaning: about 11 fewer bookings than last week (135 to 124).
            Highest expected demand of any service.
          </p>

          <p className="mt-4 text-sm font-semibold text-[#141B33]">
            Change vs Previous Week:{" "}
            {formatPercentage(overallChange)}
          </p>
        </div>
      </section>

      {/* =====================================================
          FORECAST INPUTS
      ===================================================== */}
      <section className="mt-6 rounded-2xl border border-stone-200 bg-white p-7 shadow-sm">

        {/* Header */}
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold text-[#141B33]">
                Forecast Inputs
              </h2>

              <span className="rounded-full bg-[#eef0f7] px-3 py-1 text-xs font-medium text-[#141B33]">
                AI Prediction
              </span>
            </div>

            <p className="mt-2 text-sm text-stone-500">
              Enter the expected conditions to generate a service-specific
              demand forecast.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-stone-400">
            <Activity size={15} />
            Model inputs
          </div>
        </div>

        {/* Inputs */}
        <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">

          {/* Service Type */}
          <div>
            <InputLabel>Service Type</InputLabel>

            <SelectInput
              value={serviceType}
              onChange={(e) => {
                setServiceType(e.target.value);
                setForecastResult(null);
              }}
            >
              {SERVICE_OPTIONS.map((service) => (
                <option
                  key={service}
                  value={service}
                >
                  {service}
                </option>
              ))}
            </SelectInput>
          </div>

          {/* Forecast Date */}
          <div>
            <InputLabel>Forecast Date</InputLabel>

            <div className="relative">
              <CalendarDays
                size={16}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
              />

              <input
                type="date"
                value={forecastDate}
                onChange={(e) => {
                  setForecastDate(e.target.value);
                  setForecastResult(null);
                }}
                className="h-11 w-full rounded-lg border border-stone-200 bg-white px-3.5 pl-10 text-sm font-medium text-stone-800 outline-none transition focus:border-[#141B33] focus:ring-2 focus:ring-[#141B33]/10"
              />
            </div>
          </div>

          {/* Day */}
          <div>
            <InputLabel>Day of Week</InputLabel>

            <div className="flex h-11 items-center rounded-lg border border-stone-200 bg-stone-50 px-3.5">
              <span className="text-sm font-medium text-stone-700">
                {selectedDate.day}
              </span>
            </div>
          </div>

          {/* Month */}
          <div>
            <InputLabel>Month</InputLabel>

            <div className="flex h-11 items-center rounded-lg border border-stone-200 bg-stone-50 px-3.5">
              <span className="text-sm font-medium text-stone-700">
                {selectedDate.month}
              </span>
            </div>
          </div>

          {/* Temperature */}
          <div>
            <InputLabel>Temperature</InputLabel>

            <div className="relative">
              <Thermometer
                size={16}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
              />

              <input
                type="number"
                value={temperature}
                min="-10"
                max="60"
                step="0.1"
                onChange={(e) =>
                  setTemperature(e.target.value)
                }
                className="h-11 w-full rounded-lg border border-stone-200 bg-white px-3.5 pl-10 pr-14 text-sm font-medium text-stone-800 outline-none transition focus:border-[#141B33] focus:ring-2 focus:ring-[#141B33]/10"
              />

              <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-stone-400">
                °C
              </span>
            </div>
          </div>

          {/* Rainfall */}
          <div>
            <InputLabel>Rainfall</InputLabel>

            <div className="relative">
              <CloudRain
                size={16}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
              />

              <input
                type="number"
                value={rainfall}
                min="0"
                max="500"
                step="0.1"
                onChange={(e) =>
                  setRainfall(e.target.value)
                }
                className="h-11 w-full rounded-lg border border-stone-200 bg-white px-3.5 pl-10 pr-14 text-sm font-medium text-stone-800 outline-none transition focus:border-[#141B33] focus:ring-2 focus:ring-[#141B33]/10"
              />

              <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-stone-400">
                mm
              </span>
            </div>
          </div>

          {/* Previous Day Demand */}
          <div>
            <InputLabel>Previous Day Demand</InputLabel>

            <NumberInput
              value={lag1}
              min="0"
              max="1000"
              onChange={(e) =>
                setLag1(e.target.value)
              }
            />
          </div>

          {/* Last Week Demand */}
          <div>
            <InputLabel>Same Day Last Week</InputLabel>

            <NumberInput
              value={lag7}
              min="0"
              max="1000"
              onChange={(e) =>
                setLag7(e.target.value)
              }
            />
          </div>

          {/* Rolling Average */}
          <div>
            <InputLabel>7-Day Average Demand</InputLabel>

            <NumberInput
              value={rolling7}
              min="0"
              max="1000"
              step="0.1"
              onChange={(e) =>
                setRolling7(e.target.value)
              }
            />
          </div>
        </div>

        {/* Automatically derived values */}
        <div className="mt-6 rounded-xl border border-stone-200 bg-stone-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">
            Automatically Derived
          </p>

          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div>
              <p className="text-xs text-stone-400">
                Day of Week
              </p>

              <p className="mt-1 text-sm font-semibold text-stone-700">
                {selectedDate.day}
              </p>
            </div>

            <div>
              <p className="text-xs text-stone-400">
                Month
              </p>

              <p className="mt-1 text-sm font-semibold text-stone-700">
                {selectedDate.month}
              </p>
            </div>

            <div>
              <p className="text-xs text-stone-400">
                Weekend
              </p>

              <p className="mt-1 text-sm font-semibold text-stone-700">
                {selectedDate.isWeekend ? "Yes" : "No"}
              </p>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={handleGenerateForecast}
            className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#141B33] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1c2544] active:scale-[0.99]"
          >
            <TrendingUp size={16} />
            Generate Forecast
          </button>
        </div>
      </section>

      {/* =====================================================
          FORECAST RESULT
      ===================================================== */}
      {forecastResult && (
        <section className="mt-6 rounded-2xl border border-[#dfe3ee] bg-white p-7 shadow-sm">

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div>
              <div className="flex items-center gap-2">
                <Sparkles
                  size={18}
                  className="text-[#141B33]"
                />

                <h2 className="text-lg font-semibold text-[#141B33]">
                  Forecast Result
                </h2>
              </div>

              <p className="mt-2 text-sm text-stone-500">
                Predicted demand for{" "}
                <span className="font-semibold text-stone-700">
                  {forecastResult.service}
                </span>{" "}
                on{" "}
                <span className="font-semibold text-stone-700">
                  {forecastResult.day}, {forecastResult.month}
                </span>
                .
              </p>
            </div>

            <div className="flex items-center gap-5">
              <div className="text-right">
                <p className="text-[11px] font-medium uppercase tracking-wider text-stone-400">
                  Expected Bookings
                </p>

                <p className="mt-1 text-4xl font-semibold text-[#141B33]">
                  {forecastResult.value}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eef0f7]">
                <TrendingUp
                  size={22}
                  className="text-[#141B33]"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-stone-200 pt-5">
            <p className="text-sm text-stone-500">
              The forecast uses historical demand, recent booking
              patterns, weather conditions and the selected service
              category.
            </p>
          </div>
        </section>
      )}

      {/* =====================================================
          MODEL INFORMATION
      ===================================================== */}
      <div className="mt-5 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
        <Sparkles
          size={16}
          className="mt-0.5 shrink-0 text-amber-600"
        />

        <div>
          <p className="text-xs font-semibold text-amber-800">
            Demand Forecasting Model
          </p>

          <p className="mt-1 text-xs leading-5 text-amber-700">
            Forecast inputs are prepared using the same feature
            structure as the trained demand forecasting model. The
            current Generate Forecast action is a frontend prototype;
            the production prediction will be connected to the
            FastAPI model endpoint.
          </p>
        </div>
      </div>
    </div>
  );
}