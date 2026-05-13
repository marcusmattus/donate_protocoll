'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold text-primary">Donate Protocol</h1>
              <div className="hidden md:flex gap-4">
                <Link href="/features" className="text-gray-600 hover:text-gray-900">
                  Features
                </Link>
                <Link href="/how-it-works" className="text-gray-600 hover:text-gray-900">
                  How It Works
                </Link>
                <Link href="/impact" className="text-gray-600 hover:text-gray-900">
                  Impact
                </Link>
              </div>
            </div>
            <div className="flex gap-4">
              {session ? (
                <>
                  <Link href="/dashboard" className="btn-primary">
                    Dashboard
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="text-gray-600 hover:text-gray-900">
                    Sign In
                  </Link>
                  <Link href="/auth/register" className="btn-primary">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
          <div className="flex flex-col justify-center">
            <h2 className="text-5xl font-bold tracking-tight text-gray-900">Trade for Impact</h2>
            <p className="mt-6 text-lg text-gray-600">
              Automatically donate micro-amounts from your trades to support real people and
              communities. Every trade makes a difference.
            </p>
            <div className="mt-8 flex gap-4">
              <Link href="/auth/register" className="btn-primary px-8 py-3">
                Start Donating
              </Link>
              <Link href="#learn-more" className="btn-secondary px-8 py-3">
                Learn More
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 p-8">
            <div className="space-y-4 text-center">
              <div className="text-6xl font-bold text-primary">$2.5M+</div>
              <p className="text-gray-600">Total donated through trades</p>
              <div className="mt-8 flex justify-around">
                <div>
                  <div className="text-3xl font-bold text-secondary">45K+</div>
                  <p className="text-sm text-gray-600">Active users</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent">1200+</div>
                  <p className="text-sm text-gray-600">Recipients</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-gray-900">How It Works</h3>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <div className="text-3xl font-bold text-primary">1</div>
              <h4 className="mt-4 text-xl font-semibold text-gray-900">Connect Account</h4>
              <p className="mt-2 text-gray-600">Link your brokerage or exchange account securely.</p>
            </div>
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <div className="text-3xl font-bold text-secondary">2</div>
              <h4 className="mt-4 text-xl font-semibold text-gray-900">Create Rules</h4>
              <p className="mt-2 text-gray-600">Set automatic donation rules for your trades.</p>
            </div>
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <div className="text-3xl font-bold text-accent">3</div>
              <h4 className="mt-4 text-xl font-semibold text-gray-900">Make Impact</h4>
              <p className="mt-2 text-gray-600">Your donations support verified organizations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h4 className="font-semibold text-gray-900">Product</h4>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="#" className="text-gray-600 hover:text-gray-900">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-gray-900">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Company</h4>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="#" className="text-gray-600 hover:text-gray-900">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-gray-900">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Legal</h4>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="#" className="text-gray-600 hover:text-gray-900">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-gray-900">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Contact</h4>
              <p className="mt-4 text-gray-600">support@donate-protocol.com</p>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-200 pt-8 text-center text-gray-600">
            <p>&copy; 2024 Donate Protocol. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
