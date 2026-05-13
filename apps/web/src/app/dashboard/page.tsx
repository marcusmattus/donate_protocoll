'use client';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome to your Donate Protocol dashboard.</p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="card">
            <h3 className="text-sm font-medium text-gray-600">Total Donated</h3>
            <p className="mt-2 text-3xl font-bold text-primary">$523.45</p>
            <p className="mt-1 text-xs text-gray-500">+12% this month</p>
          </div>
          <div className="card">
            <h3 className="text-sm font-medium text-gray-600">Trades Processed</h3>
            <p className="mt-2 text-3xl font-bold text-secondary">1,245</p>
            <p className="mt-1 text-xs text-gray-500">All time</p>
          </div>
          <div className="card">
            <h3 className="text-sm font-medium text-gray-600">Recipients Supported</h3>
            <p className="mt-2 text-3xl font-bold text-accent">47</p>
            <p className="mt-1 text-xs text-gray-500">Organizations</p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900">Donation Rules</h2>
          <div className="mt-4 space-y-4">
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Regular Contribution</h3>
                  <p className="text-sm text-gray-600">0.1% of every trade</p>
                </div>
                <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
