import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type Props = {
  items: BreadcrumbItem[];
};

export function SiteBreadcrumbs({ items }: Props) {
  return (
    <nav className="mb-4 flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.16em] text-black/45" aria-label="Breadcrumb">
      {items.map((item, index) => (
        <span
          key={`${item.label}-${index}`}
          className="flex items-center gap-2"
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          {index > 0 ? <span>/</span> : null}
          {item.href ? (
            <Link href={item.href} className="hover:text-black" itemProp="item">
              <span itemProp="name">{item.label}</span>
            </Link>
          ) : (
            <span className="text-black/80" itemProp="name">
              {item.label}
            </span>
          )}
          <meta itemProp="position" content={String(index + 1)} />
        </span>
      ))}
    </nav>
  );
}
