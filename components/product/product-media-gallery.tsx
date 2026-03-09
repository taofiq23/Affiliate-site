"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  tone: string;
  title: string;
  images: string[];
};

export function ProductMediaGallery({ tone: _tone, title, images }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [imageUnavailable, setImageUnavailable] = useState(false);
  const [isAutoPaused, setIsAutoPaused] = useState(false);
  const gallery = (images.length > 0 ? images : [""]).slice(0, 3).map((image, index) => ({
    image,
    title: index === 0 ? "Main image" : `Gallery image ${index + 1}`,
    chip: String(index + 1).padStart(2, "0")
  }));

  useEffect(() => {
    if (selectedIndex >= gallery.length) {
      setSelectedIndex(0);
    }
  }, [gallery.length, selectedIndex]);

  useEffect(() => {
    if (gallery.length < 2 || imageUnavailable || isAutoPaused) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setSelectedIndex((current) => (current + 1) % gallery.length);
    }, 4200);

    return () => window.clearInterval(intervalId);
  }, [gallery.length, imageUnavailable, isAutoPaused]);

  return (
    <div className="relative w-full overflow-hidden border-y border-black/10 bg-[#f1eee7]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(255,255,255,0.8),transparent_38%),radial-gradient(circle_at_90%_15%,rgba(255,255,255,0.55),transparent_28%)]" />
      <div
        className="mx-auto grid w-full max-w-[1580px] gap-4 px-4 py-4 md:gap-6 md:px-8 md:py-8 xl:grid-cols-[1fr_220px] xl:px-12"
        onMouseEnter={() => setIsAutoPaused(true)}
        onMouseLeave={() => setIsAutoPaused(false)}
        onFocusCapture={() => setIsAutoPaused(true)}
        onBlurCapture={() => setIsAutoPaused(false)}
      >
        <div className="relative h-[44vh] min-h-[280px] overflow-hidden border border-black/10 bg-white sm:h-[48vh] sm:min-h-[320px] md:h-[62vh] md:min-h-[460px]">
          {gallery.map((slide, index) => (
            <div
              key={slide.chip}
              className={`absolute inset-0 transition-all duration-700 ${
                selectedIndex === index ? "opacity-100 scale-100" : "pointer-events-none opacity-0 scale-105"
              }`}
            >
              <div className="absolute inset-0 bg-white" />
              {slide.image && !imageUnavailable ? (
                <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-12">
                  <Image
                    src={slide.image}
                    alt={`${title} ${slide.title.toLowerCase()}`}
                    fill
                    sizes="(min-width: 1536px) 1200px, (min-width: 1280px) calc(100vw - 320px), 100vw"
                    quality={100}
                    priority={index === 0}
                    className="object-contain p-4 sm:p-6 md:p-12"
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
              <div className="absolute left-4 top-4 md:left-6 md:top-6">
                <span className="inline-flex border border-black/15 bg-white/70 px-2.5 py-1 text-[8px] uppercase tracking-[0.2em] text-black/60 md:px-3 md:text-[9px] md:tracking-[0.22em]">
                  {title}
                </span>
              </div>
              <div className="absolute right-4 top-4 md:right-6 md:top-6">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1f6f43]/15 bg-[#f4f8f5] px-2.5 py-1 text-[8px] font-medium uppercase tracking-[0.14em] text-[#1f6f43] md:gap-2 md:px-3 md:py-1.5 md:text-[10px] md:tracking-[0.16em]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#1f6f43] md:h-2 md:w-2" aria-hidden="true" />
                  Usually in stock
                </span>
              </div>
              <div className="absolute bottom-3 left-3 flex items-center gap-2.5 md:bottom-6 md:left-6 md:gap-3">
                <span className="inline-flex h-7 w-7 items-center justify-center border border-black/20 bg-white/70 text-[9px] tracking-[0.12em] md:h-8 md:w-8 md:text-[10px] md:tracking-[0.14em]">
                  {slide.chip}
                </span>
                <p className="text-[10px] uppercase tracking-[0.14em] text-black/65 md:text-[11px] md:tracking-[0.18em]">{slide.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3 xl:grid-cols-1">
          {gallery.map((slide, index) => {
            const active = selectedIndex === index;
            return (
              <button
                key={`thumb-${slide.chip}`}
                onClick={() => setSelectedIndex(index)}
                className={`group relative h-[78px] overflow-hidden border text-left transition-all duration-300 sm:h-[96px] xl:h-[154px] ${
                  active ? "border-black shadow-[0_10px_25px_rgba(0,0,0,0.1)]" : "border-black/10 hover:border-black/35"
                }`}
                aria-label={`View ${slide.title}`}
              >
                <div className="absolute inset-0 bg-white" />
                {slide.image && !imageUnavailable ? (
                  <div className="absolute inset-0 flex items-center justify-center p-2.5 sm:p-3 xl:p-4">
                    <Image
                      src={slide.image}
                      alt={`${title} thumbnail ${index + 1}`}
                      fill
                      sizes="(min-width: 1280px) 220px, 33vw"
                      quality={95}
                      className="object-contain p-2.5 sm:p-3 xl:p-4"
                      onError={() => setImageUnavailable(true)}
                    />
                  </div>
                ) : null}
                <div className="absolute inset-0 bg-white/12 transition-opacity duration-300 group-hover:opacity-0" />
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between xl:bottom-3 xl:left-3 xl:right-3">
                  <span className="text-[8px] uppercase tracking-[0.16em] text-black/70 sm:text-[9px] sm:tracking-[0.2em]">{slide.chip}</span>
                  <span className="text-[8px] uppercase tracking-[0.12em] text-black/70 sm:text-[9px] sm:tracking-[0.14em]">{active ? "Active" : "View"}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
