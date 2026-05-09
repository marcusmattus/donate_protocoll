import type {Metadata} from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Donate Protocol | Trade for Good',
  description: 'The social impact trading platform that enables traders to automatically donate micro-amounts from their trades.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${spaceGrotesk.variable} text-brand-dark min-h-screen selection:bg-brand-accent/30 overflow-x-hidden font-sans bg-brand-bg antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
