"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  tone: string;
  title: string;
  images: string[];
  compact?: boolean;
};

export function ProductMediaGallery({ tone: _tone, title, images, compact = false }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [imageUnavailable, setImageUnavailable] = useState(false);
  const gallery = (images.length > 0 ? images : [""]).slice(0, 3).map((image, index) => ({
    image,
    title: `Product View ${index + 1}`,
    chip: String(index + 1).padStart(2, "0")
  }));

  return (
    <div className={compact ? "relative w-full overflow-hidden border border-black/10 bg-[#f1eee7]" : "relative w-full overflow-hidden border-y border-black/10 bg-[#f1eee7]"}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(255,255,255,0.8),transparent_38%),radial-gradient(circle_at_90%_15%,rgba(255,255,255,0.55),transparent_28%)]" />
      <div
        className={
          compact
            ? "grid w-full gap-4 p-4 md:p-5 lg:grid-cols-[minmax(0,1fr)_150px]"
            : "mx-auto grid w-full max-w-[1580px] gap-6 px-4 py-5 md:px-8 md:py-8 xl:grid-cols-[1fr_220px] xl:px-12"
        }
      >
        <div
          className={
            compact
              ? "relative h-[420px] min-h-[320px] overflow-hidden border border-black/10 bg-white md:h-[520px]"
              : "relative h-[52vh] min-h-[360px] overflow-hidden border border-black/10 bg-white md:h-[62vh] md:min-h-[460px]"
          }
        >
          {gallery.map((slide, index) => (
            <div
              key={slide.chip}
              className={`absolute inset-0 transition-all duration-700 ${
                selectedIndex === index ? "opacity-100 scale-100" : "pointer-events-none opacity-0 scale-105"
              }`}
            >
              <div className="absolute inset-0 bg-white" />
              {slide.image && !imageUnavailable ? (
                <div className="absolute inset-0 flex items-center justify-center p-8 md:p-12">
                  <Image
                  src={slide.image}
                  alt={`${title} ${slide.title.toLowerCase()}`}
                  fill
                    sizes={compact ? "(min-width: 1280px) 820px, 100vw" : "(min-width: 1536px) 1200px, (min-width: 1280px) calc(100vw - 320px), 100vw"}
                    quality={100}
                    priority={index === 0}
                    className="object-contain p-8 md:p-12"
                    onError={() => setImageUnavailable(true)}
                  />
                </div>
              ) : null}
              <div
                className={`absolute inset-0 ${
                  slide.image && !imageUnavailable
                    ? "bg-[linear-gradient(to_bottom,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]"
                    : "bg-[linear-gradient(to_bottom,rgba(255,255,255,0.75),rgba(0,0,0,0.08))]"
                }`}
              />
              <div className={compact ? "absolute left-4 top-4" : "absolute left-4 top-4 md:left-6 md:top-6"}>
                <span className="inline-flex border border-black/15 bg-white/70 px-3 py-1 text-[9px] uppercase tracking-[0.22em] text-black/60">
                  {title}
                </span>
              </div>
              <div className={compact ? "absolute bottom-4 left-4 flex items-center gap-3" : "absolute bottom-4 left-4 flex items-center gap-3 md:bottom-6 md:left-6"}>
                <span className="inline-flex h-8 w-8 items-center justify-center border border-black/20 bg-white/70 text-[10px] tracking-[0.14em]">
                  {slide.chip}
                </span>
                <p className="text-[11px] uppercase tracking-[0.18em] text-black/65">{slide.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={compact ? "grid grid-cols-3 gap-3 lg:grid-cols-1" : "grid grid-cols-3 gap-3 xl:grid-cols-1"}>
          {gallery.map((slide, index) => {
            const active = selectedIndex === index;
            return (
              <button
                key={`thumb-${slide.chip}`}
                onClick={() => setSelectedIndex(index)}
                className={`group relative overflow-hidden border text-left transition-all duration-300 ${
                  compact ? "h-[88px] lg:h-[138px]" : "h-[96px] xl:h-[154px]"
                } ${
                  active ? "border-black shadow-[0_10px_25px_rgba(0,0,0,0.1)]" : "border-black/10 hover:border-black/35"
                }`}
                aria-label={`View ${slide.title}`}
              >
                <div className="absolute inset-0 bg-white" />
                {slide.image && !imageUnavailable ? (
                  <div className="absolute inset-0 flex items-center justify-center p-3 xl:p-4">
                    <Image
                      src={slide.image}
                      alt={`${title} thumbnail ${index + 1}`}
                      fill
                      sizes={compact ? "(min-width: 1024px) 150px, 33vw" : "(min-width: 1280px) 220px, 33vw"}
                      quality={95}
                      className={compact ? "object-contain p-3" : "object-contain p-3 xl:p-4"}
                      onError={() => setImageUnavailable(true)}
                    />
                  </div>
                ) : null}
                <div className="absolute inset-0 bg-white/12 transition-opacity duration-300 group-hover:opacity-0" />
                <div className={compact ? "absolute bottom-2 left-2 right-2 flex items-center justify-between" : "absolute bottom-2 left-2 right-2 flex items-center justify-between xl:bottom-3 xl:left-3 xl:right-3"}>
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
