import Button from "../components/Button";
import Card from "../components/Card";

export default function Contacts() {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-12 pt-8 sm:px-6">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-wide text-slate-600">Контакты</p>
        <h1 className="text-3xl font-semibold">Как нас найти</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-sage/80">
        <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Af0b59ed3790616592b3a3f197da32d5e83aab8aba2e3eb46fc35fdc200f1f5aa&amp;source=constructor" width="720" height="360" frameborder="0"></iframe>
          <div className="p-4 text-sm text-slate-700">
            Алеканово (Рязанская область).
          </div>
        </div>
        <div className="space-y-4">
          <Card title="Связаться">
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span>Телефон</span>
                <a className="font-medium hover:text-base" href="tel:+79990000000">
                  +7 (999) 000-00-00
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span>Email</span>
                <a className="font-medium hover:text-base" href="mailto:home@example.com">
                  home@example.com
                </a>
              </div>
            </div>
          </Card>
          <Card title="Как добраться">
            <p className="text-sm text-slate-700">
              1.5 часа от города, асфальт до ворот. Парковка на 3 машины. Координаты и подробную схему
              вышлем после подтверждения бронирования.
            </p>
          </Card>
          <Button to="/booking" className="w-full">
            Оставить заявку
          </Button>
        </div>
      </div>
    </main>
  );
}

