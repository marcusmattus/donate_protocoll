import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Donate Protocol - Trade for Impact',
  description: 'Automatically donate micro-amounts from your trades to support communities',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">{children}</body>
    </html>
  );
}
