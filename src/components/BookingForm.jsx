import { useMemo, useState } from "react";
import Button from "./Button";
import { createBooking, datesOverlap } from "../services/bookingService";
import { sendBookingEmail } from "../services/emailService";

const phoneRegex = /^[+\d][\d\s\-()]{5,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function BookingForm({ selectedRange, bookings = [], onBooked }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [feedback, setFeedback] = useState({ error: "", success: false, loading: false });

  const hasRange = Boolean(selectedRange.start && selectedRange.end);

  const hasOverlap = useMemo(() => {
    if (!hasRange) return false;
    return bookings.some((b) =>
      datesOverlap(selectedRange.start, selectedRange.end, b.start, b.end),
    );
  }, [bookings, hasRange, selectedRange.end, selectedRange.start]);

  const isValid =
    hasRange &&
    !hasOverlap &&
    form.name.trim().length >= 2 &&
    phoneRegex.test(form.phone.trim()) &&
    emailRegex.test(form.email.trim());

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFeedback({ error: "", success: false, loading: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) {
      setFeedback({ error: "Проверьте корректность данных и диапазон дат.", success: false, loading: false });
      return;
    }

    try {
      setFeedback({ error: "", success: false, loading: true });
      const created = await createBooking({
        start: selectedRange.start,
        end: selectedRange.end,
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        existingBookings: bookings,
      });

      // Отправляем уведомление на почту (не блокируем UX).
      sendBookingEmail({
        start: selectedRange.start,
        end: selectedRange.end,
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
      }).catch((err) => console.warn("Email send failed", err));

      onBooked?.(created);
      setFeedback({ error: "", success: true, loading: false });
      setForm({ name: "", phone: "", email: "" });
    } catch (err) {
      setFeedback({
        error: err?.message || "Не удалось отправить бронь.",
        success: false,
        loading: false,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-sage/70"
    >
      <div className="mb-2">
        <p className="text-sm uppercase tracking-wide text-slate-600">Бронирование</p>
        <h2 className="text-xl font-semibold">Заполните контакты</h2>
        <p className="text-sm text-slate-600">
          Даты:{" "}
          {hasRange ? `${selectedRange.start} — ${selectedRange.end}` : "не выбраны"}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm">
          Имя
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Иван"
            className="rounded-lg border border-sage bg-mist px-3 py-2 focus:border-base focus:outline-none"
            required
          />
          <span className="text-xs text-slate-500">Минимум 2 символа</span>
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Телефон
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+7XXXXXXXXXX"
            className="rounded-lg border border-sage bg-mist px-3 py-2 focus:border-base focus:outline-none"
            required
          />
          <span className="text-xs text-slate-500">Только цифры и +</span>
        </label>
        <label className="flex flex-col gap-1 text-sm sm:col-span-2">
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="rounded-lg border border-sage bg-mist px-3 py-2 focus:border-base focus:outline-none"
            required
          />
        </label>
      </div>

      {hasOverlap && (
        <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          Эти даты пересекаются с существующей бронью.
        </div>
      )}

      {feedback.error && <div className="text-sm text-red-600">{feedback.error}</div>}
      {feedback.success && (
        <div className="rounded-lg bg-sage/70 px-3 py-2 text-sm text-base">
          Спасибо! Мы свяжемся с вами для подтверждения бронирования.
        </div>
      )}

      <div className="flex justify-end">
        <Button type="submit" disabled={!isValid || feedback.loading}>
          {feedback.loading ? "Отправка..." : "Забронировать"}
        </Button>
      </div>
    </form>
  );
}

