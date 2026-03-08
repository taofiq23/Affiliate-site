import { permanentRedirect } from "next/navigation";
import { products } from "@/lib/site-data";

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export const dynamicParams = false;

export default function LegacyProductPage({ params }: Props) {
  permanentRedirect(`/reviews/${params.slug}`);
}
