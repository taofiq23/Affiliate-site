import Link from "next/link";

type Item = {
  title: string;
  description: string;
  href: string;
  label?: string;
};

type Props = {
  title: string;
  kicker: string;
  items: Item[];
};

export function InternalLinkGrid({ title, kicker, items }: Props) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-black/10 bg-[#f8f6f1]">
      <div className="mx-auto w-full max-w-[1580px] px-4 py-12 md:px-8 md:py-14 xl:px-12">
        <div className="mb-8 border-b border-black/10 pb-6 text-center">
          <div className="mx-auto max-w-2xl">
            <p className="text-xs uppercase tracking-[0.16em] text-black/45">{kicker}</p>
            <h2 className="mt-3 font-display text-3xl leading-[0.95] md:text-4xl">{title}</h2>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <article key={item.href} className="border border-black/10 bg-white p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-black/45">{item.label ?? "Internal Link"}</p>
              <h3 className="mt-3 font-display text-2xl leading-[0.96]">{item.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-black/68">{item.description}</p>
              <Link href={item.href} className="mt-5 inline-block text-xs uppercase tracking-[0.14em] text-black/70 transition-colors hover:text-black">
                Open Page
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
