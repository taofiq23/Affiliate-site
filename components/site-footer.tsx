import Link from "next/link";

const footerSections = [
  {
    title: "Picks",
    links: [
      { href: "/collection", label: "Top Picks" },
      { href: "/product/velvet-oud", label: "Featured Review" },
      { href: "/faq", label: "FAQ" }
    ]
  },
  {
    title: "Guides",
    links: [
      { href: "/story", label: "Buying Guide" },
      { href: "/contact", label: "Contact" },
      { href: "/disclosure", label: "Affiliate Disclosure" }
    ]
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms & Conditions" }
    ]
  }
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/10 bg-secondary text-base-2">
      <div className="container-luxe py-12 md:py-16">
        <div className="grid gap-10 border-b border-base-2/20 pb-10 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-8">
          <div>
            <p className="font-display text-2xl">
              <span className="tracking-[0.24em]">SCENT</span>
              <span className="ml-2 tracking-[0.18em] text-accent/90">PICKS</span>
            </p>
            <p className="mt-4 max-w-xs text-xs uppercase leading-relaxed tracking-[0.12em] text-base-2/70">
              Editorial fragrance picks, partner offers, and practical buying notes for people who want the right scent faster.
            </p>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs uppercase tracking-[0.2em] text-base-2/55">{section.title}</h3>
              <div className="mt-4 flex flex-col gap-3">
                {section.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-xs uppercase tracking-[0.14em] text-base-2/75 transition hover:text-base-2"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3 text-xs uppercase tracking-[0.12em] text-base-2/60 md:flex-row md:items-center md:justify-between">
          <p>Copyright {year} Scent Picks. All rights reserved.</p>
          <p>Affiliate links may earn a commission at no extra cost to the visitor.</p>
        </div>
      </div>
    </footer>
  );
}
