import Button from "../components/Button";
import Card from "../components/Card";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-12 pt-8 sm:px-6">
      <section className="grid gap-8 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-sage/70 lg:grid-cols-2 lg:items-center">
        <div className="space-y-4">
          <span className="rounded-full bg-sage/70 px-3 py-1 text-xs font-semibold text-base">
            Уютный дом для отдыха в живописном месте.
          </span>
          <h1 className="text-3xl font-semibold sm:text-4xl">
            Идеален для семейных выходных и праздников.
          </h1>
          <p className="text-slate-700">
            До 8 гостей, терраса, баня, мангал. Чистый воздух, тишина и приватность для вашего идеального отдыха.
          </p>
          <div className="flex gap-3">
            <Button to="/booking">Забронировать</Button>
            <Button to="/gallery" variant="ghost">
              Смотреть фото
            </Button>
          </div>
        </div>
        <div className="h-full">
          <img
            src="https://srub.store/wa-data/public/shop/products/21/19/1921/images/8077/8077.970.jpg"
            alt="Дом у озера"
            className="h-full w-full rounded-2xl object-cover shadow-sm ring-1 ring-sage/70"
            loading="lazy"
          />
        </div>
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-3">
        <Card title="Комфорт">
          Свежий ремонт, панорамные окна, просторная гостиная и полностью укомплектованная кухня.
        </Card>
        <Card title="Природа">
          Дом окружён соснами и находится рядом с озером. Вечера у камина и завтраки на террасе.
        </Card>
        <Card title="Удобства">
          Баня, мангал, парковка, Wi‑Fi. Всё, что нужно для спокойного отдыха и праздников.
        </Card>
      </section>
    </main>
  );
}

