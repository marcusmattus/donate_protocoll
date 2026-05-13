'use client';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen">
      <nav className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-indigo-600">Donate Protocol Admin</h1>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>

        <div className="mt-8 grid gap-6 md:grid-cols-4">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="text-sm font-medium text-gray-600">Total Users</h3>
            <p className="mt-2 text-3xl font-bold">45,320</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="text-sm font-medium text-gray-600">Active Donations</h3>
            <p className="mt-2 text-3xl font-bold">$2.5M</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="text-sm font-medium text-gray-600">Recipients</h3>
            <p className="mt-2 text-3xl font-bold">1,200+</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="text-sm font-medium text-gray-600">API Health</h3>
            <p className="mt-2 text-3xl font-bold text-green-600">99.9%</p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-900">Quick Links</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <a href="/admin/dashboard" className="rounded-lg bg-white p-4 hover:shadow-md">
              <h4 className="font-semibold text-gray-900">Platform Metrics</h4>
              <p className="text-sm text-gray-600">View analytics and performance</p>
            </a>
            <a href="/admin/partners" className="rounded-lg bg-white p-4 hover:shadow-md">
              <h4 className="font-semibold text-gray-900">Manage Partners</h4>
              <p className="text-sm text-gray-600">Review and approve integrations</p>
            </a>
            <a href="/admin/recipients" className="rounded-lg bg-white p-4 hover:shadow-md">
              <h4 className="font-semibold text-gray-900">Manage Recipients</h4>
              <p className="text-sm text-gray-600">Verify and manage nonprofits</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
