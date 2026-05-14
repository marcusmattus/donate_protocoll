import type {Metadata} from 'next';
import { Outfit, Space_Grotesk } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  weight: ['300', '400', '600', '800'],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['500', '700'],
});

export const metadata: Metadata = {
  title: 'Donate Protocol | Trade for Good',
  description: 'The social impact trading platform that enables traders to automatically donate micro-amounts from their trades. High-velocity trading meets high-impact living.',
  keywords: ['trading', 'donation', 'crypto', 'social impact', 'fintech', 'Web3'],
  openGraph: {
    title: 'Donate Protocol | Trade for Good',
    description: 'Your Trades, Their Transformation. Donate Protocol automatically channels micro-contributions from every trade into real-world impact.',
    type: 'website',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="scroll-smooth bg-brand-surface">
      <body className={`${outfit.variable} ${spaceGrotesk.variable} font-sans text-brand-dark min-h-screen selection:bg-brand-accent/30 overflow-x-hidden antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
