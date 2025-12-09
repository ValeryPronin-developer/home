import { useState } from "react";
import BookingCalendar from "../components/BookingCalendar";
import BookingForm from "../components/BookingForm";
import Card from "../components/Card";

export default function Booking() {
  const [range, setRange] = useState({ start: null, end: null });
  const [bookings, setBookings] = useState([]);

  const handleBooked = (b) => {
    setBookings((prev) => [...prev, b]);
    setRange({ start: null, end: null }); // сбрасываем выбор после отправки
  };

  return (
    <main className="mx-auto max-w-6xl px-4 pb-12 pt-8 sm:px-6">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-wide text-slate-600">Бронирование</p>
        <h1 className="text-3xl font-semibold">Выберите даты и оставьте контакты</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-4">
          <BookingCalendar
            selectedRange={range}
            onChange={setRange}
            onBookingsChange={setBookings}
            externalBookings={bookings}
          />
          <BookingForm
            selectedRange={range}
            bookings={bookings}
            onBooked={handleBooked}
          />
        </div>
        <div className="space-y-4">
          <Card title="Условия">
            <ul className="space-y-2">
              <li>· Заезд с 15:00, выезд до 12:00.</li>
              <li>· Предоплата 20% после подтверждения.</li>
              <li>· Дом не сдаётся для шумных вечеринок.</li>
            </ul>
          </Card>
          <Card title="Что включено">
            <ul className="space-y-2">
              <li>· Постельное бельё и полотенца.</li>
              <li>· Дрова для камина и мангала.</li>
              <li>· Чай, кофе, питьевая вода.</li>
            </ul>
          </Card>
        </div>
      </div>
    </main>
  );
}

