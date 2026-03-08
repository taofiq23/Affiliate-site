"use client";

import { useState } from "react";

type Props = {
  tone: string;
  title: string;
  image: string;
};

export function ProductMediaGallery({ tone, title, image }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [imageUnavailable, setImageUnavailable] = useState(false);
  const gallery = [
    { title: "Overview View", tone, chip: "01" },
    { title: "Feature Snapshot", tone: "from-[#d9d5cf] to-[#969084]", chip: "02" },
    { title: "Buyer Fit", tone: "from-[#ece7dc] to-[#c4b49c]", chip: "03" }
  ];

  return (
    <div className="relative w-full overflow-hidden border-y border-black/10 bg-[#f1eee7]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(255,255,255,0.8),transparent_38%),radial-gradient(circle_at_90%_15%,rgba(255,255,255,0.55),transparent_28%)]" />
      <div className="mx-auto grid w-full max-w-[1580px] gap-6 px-4 py-5 md:px-8 md:py-8 xl:grid-cols-[1fr_220px] xl:px-12">
        <div className="relative h-[52vh] min-h-[360px] overflow-hidden border border-black/10 bg-white md:h-[62vh] md:min-h-[460px]">
          {gallery.map((slide, index) => (
            <div
              key={slide.chip}
              className={`absolute inset-0 transition-all duration-700 ${
                selectedIndex === index ? "opacity-100 scale-100" : "pointer-events-none opacity-0 scale-105"
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${slide.tone}`} />
              {index === 0 && image && !imageUnavailable ? (
                <div className="absolute inset-0 flex items-center justify-center p-8 md:p-12">
                  <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-contain"
                    loading="eager"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={() => setImageUnavailable(true)}
                  />
                </div>
              ) : null}
              <div
                className={`absolute inset-0 ${
                  index === 0 && image && !imageUnavailable
                    ? "bg-[linear-gradient(to_bottom,rgba(255,255,255,0.36),rgba(255,255,255,0.18))]"
                    : "bg-[linear-gradient(to_bottom,rgba(255,255,255,0.75),rgba(0,0,0,0.08))]"
                }`}
              />
              <div className="absolute left-4 top-4 md:left-6 md:top-6">
                <span className="inline-flex border border-black/15 bg-white/70 px-3 py-1 text-[9px] uppercase tracking-[0.22em] text-black/60">
                  {title}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 flex items-center gap-3 md:bottom-6 md:left-6">
                <span className="inline-flex h-8 w-8 items-center justify-center border border-black/20 bg-white/70 text-[10px] tracking-[0.14em]">
                  {slide.chip}
                </span>
                <p className="text-[11px] uppercase tracking-[0.18em] text-black/65">{slide.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-3 xl:grid-cols-1">
          {gallery.map((slide, index) => {
            const active = selectedIndex === index;
            return (
              <button
                key={`thumb-${slide.chip}`}
                onClick={() => setSelectedIndex(index)}
                className={`group relative h-[96px] overflow-hidden border text-left transition-all duration-300 xl:h-[154px] ${
                  active ? "border-black shadow-[0_10px_25px_rgba(0,0,0,0.1)]" : "border-black/10 hover:border-black/35"
                }`}
                aria-label={`View ${slide.title}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${slide.tone}`} />
                {index === 0 && image && !imageUnavailable ? (
                  <div className="absolute inset-0 flex items-center justify-center p-3 xl:p-4">
                    <img
                      src={image}
                      alt={`${title} thumbnail`}
                      className="h-full w-full object-contain"
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      onError={() => setImageUnavailable(true)}
                    />
                  </div>
                ) : null}
                <div className="absolute inset-0 bg-white/35 transition-opacity duration-300 group-hover:opacity-20" />
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between xl:bottom-3 xl:left-3 xl:right-3">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-black/70">{slide.chip}</span>
                  <span className="text-[9px] uppercase tracking-[0.14em] text-black/70">{active ? "Active" : "View"}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
