import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import Button from "./Button";

const navItems = [
  { to: "/", label: "Главная" },
  { to: "/gallery", label: "Галерея" },
  { to: "/booking", label: "Бронирование" },
  { to: "/contacts", label: "Контакты" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  const linkClasses = ({ isActive }) =>
    `inline-flex items-center gap-1 text-base transition-all underline-offset-4 ${isActive ? "text-base font-semibold" : "text-slate-700"} hover:underline hover:text-[17px]`;

  return (
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-sage">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2 text-base font-semibold">
          <span className="h-9 w-9 rounded-full bg-base text-white flex items-center justify-center">
            DH
          </span>
          Дом у озера
        </Link>
        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClasses}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden lg:block">
          <Button to="/booking" variant="primary">
            Забронировать
          </Button>
        </div>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-sage bg-white text-base text-base lg:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Открыть меню"
        >
          <span className="sr-only">Меню</span>
          <div className="space-y-1.5">
            <span className={`block h-0.5 w-6 bg-base transition ${open ? "translate-y-2 rotate-45" : ""}`}></span>
            <span className={`block h-0.5 w-6 bg-base transition ${open ? "opacity-0" : ""}`}></span>
            <span className={`block h-0.5 w-6 bg-base transition ${open ? "-translate-y-2 -rotate-45" : ""}`}></span>
          </div>
        </button>
      </div>
      {open && (
        <div className="border-t border-sage bg-white lg:hidden">
          <nav className="flex flex-col gap-1 px-4 py-3 text-base">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={linkClasses}
              >
                {item.label}
              </NavLink>
            ))}
            <Button to="/booking" className="mt-2 w-full" onClick={() => setOpen(false)}>
              Забронировать
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}

