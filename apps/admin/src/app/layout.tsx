import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard - Donate Protocol',
  description: 'Administrative dashboard for Donate Protocol',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">{children}</body>
    </html>
  );
}
