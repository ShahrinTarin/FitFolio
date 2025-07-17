import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useAxiosSecure from '@/hooks/useAxiosSecure';

const COLORS = ['#34d399', '#facc15'];

const Balance = () => {
  const axiosSecure = useAxiosSecure();

  const { data: summary = {}, error: summaryError } = useQuery({
    queryKey: ['admin-balance'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/booking-summary');
      return res.data;
    },
  });

  const { data: overview = {}, error: overviewError } = useQuery({
    queryKey: ['admin-overview-counts'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/overview-counts');
      return res.data;
    },
  });

  if (summaryError || overviewError) {
    return <div className="p-6 text-red-500">Error loading data</div>;
  }

  const chartData = [
    { name: 'Newsletter Subscribers', value: overview.subscriberCount || 0 },
    { name: 'Paid Members', value: overview.memberCount || 0 },
  ];

  return (
    <div className="p-6 text-white space-y-8">
      <h2 className="text-3xl font-bold text-lime-400">💰 Admin Balance</h2>

      <div className="bg-gray-900 rounded-lg p-4 border border-lime-400 shadow">
        <h3 className="text-xl font-semibold mb-2">Total Balance</h3>
        <p className="text-2xl text-lime-300">
          ${summary.totalBalance?.toFixed(2) || 0}
        </p>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-3 text-lime-400">
          🧾 Last 6 Transactions
        </h3>
        <ul className="space-y-2 text-sm">
          {summary.lastSixTransactions?.map((tx, idx) => (
            <li
              key={idx}
              className="flex justify-between border-b border-gray-600 pb-1"
            >
              <span>{tx.userEmail}</span>
              <span>${tx.price}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-3 text-lime-400">
          📊 Newsletter vs Paid Members
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Balance;
