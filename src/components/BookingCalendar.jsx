import { useEffect, useMemo, useState } from "react";
import { DateRange } from "react-date-range";
import { addDays, eachDayOfInterval, parseISO, startOfDay, format } from "date-fns";
import { datesOverlap, fetchBookings } from "../services/bookingService";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function BookingCalendar({ selectedRange, onChange, onBookingsChange, externalBookings = [] }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [rangeError, setRangeError] = useState("");
  const [isCompact, setIsCompact] = useState(false); // планшет/мобайл

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchBookings();
        setBookings(data);
        onBookingsChange?.(data);
      } catch (e) {
        setError("Не удалось загрузить бронирования.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [onBookingsChange]);

  useEffect(() => {
    if (externalBookings.length) {
      setBookings(externalBookings);
    }
  }, [externalBookings]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsCompact(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const disabledDates = useMemo(() => {
    return bookings.flatMap((b) => {
      const start = startOfDay(new Date(`${b.start}T00:00:00`));
      const end = startOfDay(new Date(`${b.end}T00:00:00`));
      const lastBlocked = addDays(end, -1); // день выезда не блокируем
      if (lastBlocked < start) return [];
      return eachDayOfInterval({ start, end: lastBlocked });
    });
  }, [bookings]);

  const today = startOfDay(new Date());

  const currentRange = useMemo(() => {
    const start = selectedRange.start
      ? startOfDay(new Date(`${selectedRange.start}T00:00:00`))
      : today;
    const end = selectedRange.end
      ? startOfDay(new Date(`${selectedRange.end}T00:00:00`))
      : addDays(start, 1);
    return [
      {
        startDate: start,
        endDate: end,
        key: "selection",
      },
    ];
  }, [selectedRange, today]);

  const handleSelect = (item) => {
    const startDate = item.selection.startDate;
    const endDate = item.selection.endDate;
    const startISO = format(startDate, "yyyy-MM-dd");
    const endISO = format(endDate, "yyyy-MM-dd");

    const overlap = bookings.some((b) =>
      datesOverlap(startISO, endISO, b.start, b.end),
    );

    if (overlap) {
      setRangeError("Этот диапазон пересекается с существующей бронью.");
      return;
    }

    setRangeError("");
    onChange({ start: startISO, end: endISO });
  };

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-sage/70">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-wide text-slate-600">
            Календарь
          </p>
          <h2 className="text-xl font-semibold">Выберите даты</h2>
        </div>
        {loading && <span className="text-xs text-slate-500">Загрузка...</span>}
      </div>

      {error ? (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      ) : loading ? (
        <div className="h-[340px] animate-pulse rounded-xl border border-sage/70 bg-sage/30" />
      ) : (
        <div className="overflow-hidden rounded-xl border border-sage/70 p-2">
          <DateRange
            ranges={currentRange}
            onChange={handleSelect}
            minDate={today}
            moveRangeOnFirstSelection={false}
            disabledDates={disabledDates}
            rangeColors={["#2e3a3a"]}
            weekdayDisplayFormat="EE"
            direction="horizontal"
            months={isCompact ? 1 : 2}
            showDateDisplay={false}
          />
        </div>
      )}

      {rangeError && (
        <div className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {rangeError}
        </div>
      )}

      {/* Занятые периоды не отображаем по требованию */}
    </div>
  );
}

