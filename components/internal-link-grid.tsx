import Image from "next/image";
import Link from "next/link";

type Item = {
  title: string;
  description: string;
  href: string;
  label?: string;
  imageUrl?: string;
  tone?: string;
  priceText?: string;
  stockText?: string;
  rating?: number;
  reviewCount?: number;
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

  const reviewCountFormatter = new Intl.NumberFormat("en-US");
  const cleanDescription = (description: string) =>
    description
      .split(/(?<=[.!?])\s+/)
      .filter((sentence) => !/\b\d+(?:,\d{3})*\s+(?:shopper\s+)?reviews?\b/i.test(sentence))
      .filter((sentence) => !/\b\d(?:\.\d)?\/5\b/i.test(sentence))
      .filter((sentence) => !/\bcarries?\s+a\s+\d(?:\.\d)?\s+rating\b/i.test(sentence))
      .join(" ")
      .trim();
  const compactDescription = (description: string) => {
    const cleaned = cleanDescription(description);
    const sentences = cleaned.split(/(?<=[.!?])\s+/).filter(Boolean);
    let result = "";

    for (const sentence of sentences) {
      const candidate = result ? `${result} ${sentence}` : sentence;

      if (candidate.length > 190 && result) {
        break;
      }

      result = candidate;
    }

    if (!result) {
      return cleaned;
    }

    return result.length < cleaned.length ? `${result.replace(/[.!?]+$/, "")}.` : result;
  };

  const ctaLabelForItem = (label?: string) => {
    switch ((label ?? "").toLowerCase()) {
      case "review":
        return "Read Review";
      case "guide":
        return "Read Guide";
      case "comparison":
        return "Open Comparison";
      case "best":
        return "See Top Picks";
      case "category":
        return "Browse Category";
      default:
        return "Read More";
    }
  };

  return (
    <section className="border-t border-black/10 bg-[#f8f6f1]">
      <div className="mx-auto w-full max-w-[1580px] px-4 py-10 md:px-8 md:py-14 xl:px-12">
        <div className="mb-7 border-b border-black/10 pb-5 text-center md:mb-8 md:pb-6">
          <div className="mx-auto max-w-2xl">
            <p className="text-xs uppercase tracking-[0.16em] text-black/60">{kicker}</p>
            <h2 className="mt-3 font-display text-[2rem] leading-[0.95] sm:text-3xl md:text-4xl">{title}</h2>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => {
            const isGuide = (item.label ?? "").toLowerCase() === "guide";

            return (
            <Link key={item.href} href={item.href} className="group block h-full">
              <article className="flex h-full flex-col overflow-hidden border border-black/10 bg-white transition-colors duration-200 hover:bg-[#fbfaf6]">
                {item.imageUrl ? (
                  <div className="relative overflow-hidden border-b border-black/10 bg-[#f7f3ec]">
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.tone ?? "from-[#ece5d9] to-[#cab59a]"} opacity-[0.22]`} />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.92),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.64))]" />
                    <div className="relative aspect-[4/3] md:aspect-[16/10]">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
                        quality={95}
                        className={isGuide ? "object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]" : "object-contain p-4 transition-transform duration-500 group-hover:scale-[1.03]"}
                      />
                    </div>
                    <div className="absolute left-4 top-4">
                      <span className="inline-flex items-center border border-black/10 bg-white/92 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-black/70">
                        {item.label ?? "Internal Link"}
                      </span>
                    </div>
                  </div>
                ) : null}
                <div className="flex h-full flex-col p-4 md:p-5">
                  {!item.imageUrl ? <p className="text-xs uppercase tracking-[0.16em] text-black/60">{item.label ?? "Internal Link"}</p> : null}
                  <h3 className="mt-3 font-display text-[1.38rem] leading-[1] text-black sm:text-[1.55rem] md:min-h-[3.2rem] md:text-[1.7rem]">{item.title}</h3>
                  <p className="mt-3 text-[14px] leading-6 text-black/78 sm:mt-3.5 sm:text-[15px] sm:leading-7 md:min-h-[6rem]">
                    {compactDescription(item.rating || item.reviewCount ? cleanDescription(item.description) : item.description)}
                  </p>
                  {item.priceText || item.rating || item.reviewCount ? (
                    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-black/10 pt-4 text-sm">
                      {item.priceText ? <p className="font-medium text-black">{item.priceText}</p> : null}
                      {item.stockText ? (
                        <div className="inline-flex items-center gap-2 font-medium text-[#1f6f43]">
                          <span className="h-2.5 w-2.5 rounded-full bg-[#1f6f43]" aria-hidden="true" />
                          {item.stockText}
                        </div>
                      ) : null}
                      {item.rating ? (
                        <div className="inline-flex items-center gap-2 text-black/72">
                          <span className="inline-flex items-center gap-[1px] text-[#f59e0b]" aria-hidden="true">
                            {Array.from({ length: 5 }).map((_, starIndex) => (
                              <span key={`${item.href}-star-${starIndex}`} className="text-[12px] leading-none">
                                &#9733;
                              </span>
                            ))}
                          </span>
                          <span className="font-semibold text-black">{item.rating.toFixed(1)}/5</span>
                        </div>
                      ) : null}
                      {item.reviewCount ? <p className="text-xs leading-5 text-black/68">{reviewCountFormatter.format(item.reviewCount)} reviews</p> : null}
                    </div>
                  ) : null}
                  <span className="btn-commerce-primary mt-4 min-h-[44px] px-5 py-3 text-[10px] tracking-[0.14em] sm:min-h-[46px] sm:text-[11px] sm:tracking-[0.16em]">
                    {ctaLabelForItem(item.label)}
                  </span>
                </div>
              </article>
            </Link>
          );
          })}
        </div>
      </div>
    </section>
  );
}
