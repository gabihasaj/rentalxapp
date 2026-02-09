import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookedDates, createBooking } from "./bookingApi";
import "./Booking.css";

function toISODateLocal(d) {
  // YYYY-MM-DD in local time
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function rangeHasBookedDay(startDate, endDate, bookedSet) {
  if (!startDate || !endDate) return false;
  const s = new Date(startDate + "T00:00:00");
  const e = new Date(endDate + "T00:00:00");
  for (let d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) {
    const iso = toISODateLocal(d);
    if (bookedSet.has(iso)) return true;
  }
  return false;
}

/* ===== Pricing (both trailers) ===== */
const RATES = {
  enclosed: { day: 70, week: 490 },
  open: { day: 60, week: 400 },
};

function daysBetweenInclusive(startISO, endISO) {
  if (!startISO || !endISO) return 0;

  // Use noon to avoid DST edge cases
  const start = new Date(startISO + "T12:00:00");
  const end = new Date(endISO + "T12:00:00");

  const msPerDay = 24 * 60 * 60 * 1000;
  const diffDays = Math.round((end - start) / msPerDay);

  return diffDays + 1; // inclusive
}

function formatUSD(n) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(n);
}

function calcQuote(trailerType, startDate, endDate) {
  if (!startDate || !endDate) return null;
  if (endDate < startDate) return null;

  const totalDays = daysBetweenInclusive(startDate, endDate);
  if (totalDays <= 0) return null;

  const rates = RATES[trailerType] || RATES.open;
  const weeks = Math.floor(totalDays / 7);
  const extraDays = totalDays % 7;
  const total = weeks * rates.week + extraDays * rates.day;

  return { totalDays, weeks, extraDays, total, rates };
}
/* =================================== */

export default function Booking() {
  const { trailerType } = useParams(); // "open" or "enclosed"
  const normalizedTrailerType = trailerType === "enclosed" ? "enclosed" : "open";

  const [bookedSet, setBookedSet] = useState(new Set());
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    startDate: "",
    endDate: "",
    pickupTime: "09:00",
    dropoffTime: "17:00",
  });

  const [status, setStatus] = useState({ type: "", message: "" });

  const today = useMemo(() => new Date(), []);
  const minDate = useMemo(() => toISODateLocal(today), [today]);

  useEffect(() => {
    let cancelled = false;

    async function loadAvailability() {
      setLoading(true);
      setStatus({ type: "", message: "" });

      try {
        const data = await getBookedDates(normalizedTrailerType);
        // expected: { success:true, bookedDates:["YYYY-MM-DD", ...] }
        const set = new Set((data.bookedDates || []).map(String));
        if (!cancelled) setBookedSet(set);
      } catch (e) {
        if (!cancelled) {
          setStatus({
            type: "error",
            message: e.message || "Failed to load availability.",
          });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadAvailability();
    return () => {
      cancelled = true;
    };
  }, [normalizedTrailerType]);

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setStatus({ type: "", message: "" });
  }

  function validate() {
    const { name, email, phone, pickupTime, dropoffTime } = form;

    if (!name.trim()) return "Please enter your name.";
    if (!email.trim()) return "Please enter your email.";
    if (!phone.trim()) return "Please enter your phone number.";

    if (!form.startDate) return "Please choose a start date.";
    if (!form.endDate) return "Please choose an end date.";

    // Only block past dates
    if (form.startDate < minDate) {
      return `Start date must be on or after ${minDate}.`;
    }

    if (form.endDate < form.startDate) {
      return "End date must be the same day or after the start date.";
    }

    if (rangeHasBookedDay(form.startDate, form.endDate, bookedSet)) {
      return "That range includes booked dates. Please choose different dates.";
    }

    // Keep: limit rental length to 1 month max
    const s = new Date(form.startDate + "T00:00:00");
    const e = new Date(form.endDate + "T00:00:00");
    const maxLen = new Date(s);
    maxLen.setMonth(maxLen.getMonth() + 1);
    if (e > maxLen) return "Bookings can be at most 1 month long.";

    // time logic (same-day booking)
    if (!pickupTime || !dropoffTime)
      return "Please choose pickup and dropoff times.";
    if (form.startDate === form.endDate && pickupTime >= dropoffTime) {
      return "Dropoff time must be later than pickup time (same-day booking).";
    }

    return null;
  }

  async function onSubmit(e) {
    e.preventDefault();
    const err = validate();
    if (err) {
      setStatus({ type: "error", message: err });
      return;
    }

    setStatus({ type: "info", message: "Submitting booking..." });

    try {
      const payload = {
        trailerType: normalizedTrailerType,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        startDate: form.startDate,
        endDate: form.endDate,
        pickupTime: form.pickupTime,
        dropoffTime: form.dropoffTime,
      };

      const res = await createBooking(payload);

      if (!res.success) {
        setStatus({ type: "error", message: res.message || "Booking failed." });
        return;
      }

      // Refresh booked dates after successful booking (range booking)
      try {
        const data = await getBookedDates(normalizedTrailerType);
        const set = new Set((data.bookedDates || []).map(String));
        setBookedSet(set);
      } catch {
        // If refresh fails, it's ok—the booking still succeeded.
      }

      setStatus({
        type: "success",
        message: "Booked! You should also receive a calendar invite email.",
      });
    } catch (e2) {
      setStatus({ type: "error", message: e2.message || "Booking failed." });
    }
  }

  // Live quote (shows for BOTH open + enclosed)
  const quote = useMemo(() => {
    return calcQuote(normalizedTrailerType, form.startDate, form.endDate);
  }, [normalizedTrailerType, form.startDate, form.endDate]);

  return (
    <div className="booking-page">
      <div className="booking-card">
        <h2 className="booking-title">
          Book a {normalizedTrailerType === "enclosed" ? "Enclosed" : "Open"} Trailer
        </h2>

        {loading ? <p className="booking-loading">Loading availability…</p> : null}

        {status.message ? (
          <p className={`booking-status ${status.type ? `is-${status.type}` : ""}`}>
            {status.message}
          </p>
        ) : null}

        <form onSubmit={onSubmit} className="booking-form">
          <label className="booking-field">
            <span>Name</span>
            <input value={form.name} onChange={(e) => updateField("name", e.target.value)} />
          </label>

          <label className="booking-field">
            <span>Email</span>
            <input
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              type="email"
            />
          </label>

          <label className="booking-field">
            <span>Phone Number</span>
            <input value={form.phone} onChange={(e) => updateField("phone", e.target.value)} />
          </label>

          <label className="booking-field">
            <span>Start date</span>
            <input
              value={form.startDate}
              onChange={(e) => updateField("startDate", e.target.value)}
              type="date"
              min={minDate}
            />
          </label>

          <label className="booking-field">
            <span>End date</span>
            <input
              value={form.endDate}
              onChange={(e) => updateField("endDate", e.target.value)}
              type="date"
              min={form.startDate || minDate}
            />
          </label>

          {/* Total Due box (both trailer types) */}
          {quote ? (
            <div className="booking-quote">
              <div className="booking-quote-row">
                <span>{normalizedTrailerType === "enclosed" ? "Enclosed" : "Open"} rate</span>
                <span>
                  {formatUSD(quote.rates.day)}/day • {formatUSD(quote.rates.week)}/week
                </span>
              </div>

              <div className="booking-quote-row">
                <span>Length</span>
                <span>
                  {quote.totalDays} day{quote.totalDays === 1 ? "" : "s"} (
                  {quote.weeks} week{quote.weeks === 1 ? "" : "s"}
                  {quote.extraDays
                    ? ` + ${quote.extraDays} day${quote.extraDays === 1 ? "" : "s"}`
                    : ""}
                  )
                </span>
              </div>

              <div className="booking-quote-total">
                <span>Total due</span>
                <span>{formatUSD(quote.total)}</span>
              </div>
            </div>
          ) : null}

          <label className="booking-field">
            <span>Pickup time</span>
            <input
              value={form.pickupTime}
              onChange={(e) => updateField("pickupTime", e.target.value)}
              type="time"
            />
          </label>

          <label className="booking-field">
            <span>Dropoff time</span>
            <input
              value={form.dropoffTime}
              onChange={(e) => updateField("dropoffTime", e.target.value)}
              type="time"
            />
          </label>

          <button type="submit" disabled={loading} className="booking-button">
            Book
          </button>

          {!loading && bookedSet.size > 0 ? (
            <details className="booking-details">
              <summary>See booked dates</summary>
              <ul>
                {[...bookedSet].sort().map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </details>
          ) : null}
        </form>
      </div>
    </div>
  );
}
