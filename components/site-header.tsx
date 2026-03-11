"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/site-data";

const links = [
  { href: "/", label: "Home" },
  { href: "/best/top-picks", label: "Best" },
  { href: "/guides", label: "Guides" },
  { href: "/disclosure", label: "Disclosure" }
];

const menuSections = [
  {
    title: "Navigation",
    links
  }
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const pathname = usePathname();
  const lastYRef = useRef(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    lastYRef.current = window.scrollY;

    const onScroll = () => {
      if (frameRef.current !== null) {
        return;
      }

      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;

        const currentY = window.scrollY;
        if (currentY < 40) {
          setCompact(false);
        } else if (currentY > lastYRef.current) {
          setCompact(true);
        } else if (currentY < lastYRef.current) {
          setCompact(false);
        }
        lastYRef.current = currentY;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    lastYRef.current = window.scrollY;
    setCompact(window.scrollY > 40);
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-black/10 bg-base/95 backdrop-blur-sm">
        <div
          className={`hidden overflow-hidden border-b border-black/10 transition-all duration-300 md:block ${
            compact ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
          }`}
        >
          <div className="container-luxe flex h-9 items-center justify-between text-[11px] uppercase tracking-[0.2em] text-secondary/78">
            <p>Home Product Reviews / Updated Weekly</p>
            <div className="flex items-center gap-6">
              <Link href="/faq">FAQ</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>
        </div>

        <div className="container-luxe flex h-16 items-center justify-between text-xs uppercase tracking-[0.2em] md:h-[86px]">
          <button className="hidden md:inline-block" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            Menu
          </button>
          <Link href="/" className="font-display text-[22px] font-semibold text-black md:text-[30px]">
            <span className="tracking-[0.2em]">{siteConfig.shortName.toUpperCase()}</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/best/top-picks" className="hidden md:inline-flex">
              Top Picks
            </Link>
            <button
              className="inline md:hidden"
              onClick={() => setMenuOpen((state) => !state)}
              aria-label="Toggle side menu"
              aria-expanded={menuOpen}
            >
              Menu
            </button>
          </div>
        </div>

        <div
          className={`hidden overflow-hidden border-t border-black/10 transition-all duration-300 md:block ${
            compact ? "max-h-0 opacity-0" : "max-h-16 opacity-100"
          }`}
        >
          <nav className="container-luxe flex h-[50px] items-center justify-center gap-16">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs uppercase tracking-[0.24em] text-secondary/82 transition hover:text-secondary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {menuOpen ? (
        <div className="fixed inset-0 z-[70] transition-all duration-500">
          <button className="absolute inset-0 bg-black/25 backdrop-blur-sm" onClick={() => setMenuOpen(false)} aria-label="Close menu overlay" />
          <aside className="absolute left-0 top-0 h-full w-[92vw] max-w-[440px] overflow-y-auto border-r border-black/10 bg-[#f8f6f1] p-5 shadow-2xl md:p-7">
          <div className="mb-6 flex items-center justify-between border-b border-black/10 pb-4">
            <p className="font-display text-xl font-semibold text-black">
              <span className="tracking-[0.22em]">{siteConfig.shortName.toUpperCase()}</span>
            </p>
            <button
              onClick={() => setMenuOpen(false)}
              className="inline-flex h-9 w-9 items-center justify-center border border-black/20 text-black/70 hover:border-black hover:text-black"
              aria-label="Close side menu"
            >
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
                <path d="M3 3L13 13M13 3L3 13" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </button>
          </div>

          <div className="grid gap-7">
            {menuSections.map((section) => (
              <section key={section.title}>
                <h3 className="text-xs uppercase tracking-[0.18em] text-black/50">{section.title}</h3>
                <div className="mt-3 flex flex-col">
                  {section.links.map((link, linkIndex) => (
                    <Link
                      key={`${section.title}-${link.label}`}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="group flex items-center justify-between border-b border-black/10 py-3 text-sm uppercase tracking-[0.12em] text-black/88 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-black"
                      style={{ transitionDelay: `${70 + linkIndex * 35}ms` }}
                    >
                      <span>{link.label}</span>
                      <span className="translate-x-0 text-black/55 transition-transform duration-200 group-hover:translate-x-1">-&gt;</span>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-8 border-t border-black/10 pt-5">
            <p className="text-xs uppercase tracking-[0.16em] text-black/50">Quick Access</p>
            <div className="mt-3 grid gap-2">
              <Link
                href="/guides"
                onClick={() => setMenuOpen(false)}
                className="text-sm uppercase tracking-[0.12em] text-black/88 hover:text-black"
              >
                Guides Hub
              </Link>
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="text-sm uppercase tracking-[0.12em] text-black/88 hover:text-black"
              >
                Contact
              </Link>
            </div>
          </div>
          </aside>
        </div>
      ) : null}
    </>
  );
}
