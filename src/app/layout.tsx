import type { Metadata } from 'next';
import './globals.css';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import ToasterClient from '@/components/ToasterClient'; // client component with 'use client'

export const metadata: Metadata = {
  title: 'Cinefolio - A Creative Portfolio',
  description: 'A minimalist, cinematic portfolio website for showcasing creative projects.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-grow pt-16">{children}</main>
          <SiteFooter />
        </div>
        <ToasterClient />
      </body>
    </html>
  );
}
