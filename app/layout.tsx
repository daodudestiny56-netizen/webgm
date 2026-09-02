import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bricolage',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jakarta',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'Crit Studio // WebMCP Design Canvas Engine',
  description:
    'Crit Studio exposes design canvases as WebMCP tools so AI agents can flag, drag, resize, and rebalance UI issues live.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bricolage.variable} ${jakarta.variable}`}>
      <body className="bg-[#F6F5F1] text-[#14161A] font-sans antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
