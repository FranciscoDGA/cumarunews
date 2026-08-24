import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/config";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    images: [{ url: SITE.defaultImage, width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { types: { "application/rss+xml": `${SITE.url}/api/rss` } },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "NewsMediaOrganization",
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/logo.svg`,
  description: SITE.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: SITE.city,
    addressRegion: SITE.state,
    addressCountry: SITE.country,
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: SITE.email,
    contactType: "editorial",
  },
  sameAs: [SITE.social.instagram, SITE.social.facebook].filter(Boolean),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={SITE.language}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="font-sans bg-gray-50 text-gray-900 antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
