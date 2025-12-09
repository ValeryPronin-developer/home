import { useState } from "react";
import PropTypes from "prop-types";

export default function GalleryGrid({ images }) {
  const [activeIndex, setActiveIndex] = useState(-1);

  const close = () => setActiveIndex(-1);
  const next = () => setActiveIndex((i) => (i + 1) % images.length);
  const prev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((src, idx) => (
          <button
            key={src + idx}
            type="button"
            onClick={() => setActiveIndex(idx)}
            className="group overflow-hidden rounded-xl bg-sage/40 ring-1 ring-sage/70 focus:outline-none focus:ring-2 focus:ring-base"
          >
            <img
              src={src}
              alt="Дом для отдыха"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {activeIndex >= 0 && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 p-4"
          onClick={close}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-2xl bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[activeIndex]}
              alt="Просмотр фото"
              className="h-full w-full object-contain"
            />
            <div className="absolute inset-y-0 left-0 flex items-center">
              <button
                type="button"
                onClick={prev}
                className="m-3 rounded-full bg-white/80 px-3 py-2 text-sm font-semibold text-base shadow hover:bg-white"
              >
                ‹
              </button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center">
              <button
                type="button"
                onClick={next}
                className="m-3 rounded-full bg-white/80 px-3 py-2 text-sm font-semibold text-base shadow hover:bg-white"
              >
                ›
              </button>
            </div>
            <button
              type="button"
              className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-base shadow"
              onClick={close}
            >
              Закрыть
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
              {activeIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

GalleryGrid.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

