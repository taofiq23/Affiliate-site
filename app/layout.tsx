import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/lib/site-data";

const impactVerificationMeta = {
  name: "impact-site-verification",
  value: "9175c59e-bdba-463a-8f34-13a2d6fc7e87"
} as const;

const googleVerificationMeta = {
  name: "google-site-verification",
  content: "zdb5OyBtZOxfXTFaVcyJjuLblft-TD52wAlHoBa77v4"
} as const;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Affiliate SEO Framework`,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta {...(impactVerificationMeta as any)} />
        <meta {...googleVerificationMeta} />
      </head>
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
