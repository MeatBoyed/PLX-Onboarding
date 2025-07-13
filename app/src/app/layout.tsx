import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { pluxnetTheme } from "@/lib/theme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${pluxnetTheme.branding.companyName} - Sign Up for High-Speed Fibre Internet`,
  description: `Join ${pluxnetTheme.branding.companyName} and get lightning-fast fibre internet. ${pluxnetTheme.branding.tagline}. Simple onboarding process with multiple package options.`,
  keywords: [
    "fibre internet",
    "high-speed internet",
    "PluxNet",
    "fibre packages",
    "internet service provider",
    "unlimited data",
    "wifi router",
    "fast internet",
    "broadband",
    "fiber optic"
  ],
  authors: [{ name: pluxnetTheme.branding.companyName }],
  creator: pluxnetTheme.branding.companyName,
  publisher: pluxnetTheme.branding.companyName,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    title: `${pluxnetTheme.branding.companyName} - High-Speed Fibre Internet`,
    description: `${pluxnetTheme.branding.tagline}. Sign up for fast, reliable fibre internet with unlimited data.`,
    siteName: pluxnetTheme.branding.companyName,
    images: [
      {
        url: pluxnetTheme.images.logo,
        width: 1200,
        height: 630,
        alt: `${pluxnetTheme.branding.companyName} Logo`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${pluxnetTheme.branding.companyName} - High-Speed Fibre Internet`,
    description: `${pluxnetTheme.branding.tagline}. Get connected with reliable fibre internet.`,
    images: [pluxnetTheme.images.logo],
  },
  icons: {
    icon: pluxnetTheme.images.favicon,
    shortcut: pluxnetTheme.images.favicon,
    apple: '/apple-touch-icon.png',
  },
  metadataBase: new URL('https://pluxnet.co.za'), // Update with your actual domain
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              --brand-primary: ${pluxnetTheme.colors.brandPrimary};
              --brand-primary-hover: ${pluxnetTheme.colors.brandPrimaryHover};
              --brand-secondary: ${pluxnetTheme.colors.brandSecondary};
              --brand-accent: ${pluxnetTheme.colors.brandAccent};
              --text-primary: ${pluxnetTheme.colors.textPrimary};
              --text-secondary: ${pluxnetTheme.colors.textSecondary};
              --text-tertiary: ${pluxnetTheme.colors.textTertiary};
              --text-muted: ${pluxnetTheme.colors.textMuted};
              --surface-card: ${pluxnetTheme.colors.surfaceCard};
              --surface-white: ${pluxnetTheme.colors.surfaceWhite};
              --surface-border: ${pluxnetTheme.colors.surfaceBorder};
              --button-primary: ${pluxnetTheme.colors.buttonPrimary};
              --button-primary-hover: ${pluxnetTheme.colors.buttonPrimaryHover};
              --button-primary-text: ${pluxnetTheme.colors.buttonPrimaryText};
              --button-secondary: ${pluxnetTheme.colors.buttonSecondary};
              --button-secondary-hover: ${pluxnetTheme.colors.buttonSecondaryHover};
              --button-secondary-text: ${pluxnetTheme.colors.buttonSecondaryText};
            }
          `
        }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
