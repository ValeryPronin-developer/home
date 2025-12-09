export default function Footer() {
  return (
    <footer className="border-t border-sage bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="text-sm text-slate-600">
          © {new Date().getFullYear()} Дом у озера. Все права защищены.
        </div>
        <div className="flex gap-4 text-sm">
          <a href="tel:+79990000000" className="hover:text-base">
            +7 (999) 000-00-00
          </a>
          <a href="mailto:home@example.com" className="hover:text-base">
            home@example.com
          </a>
        </div>
      </div>
    </footer>
  );
}

