import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { FaUserCircle, FaDollarSign } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';

const COLORS = ['#84cc16', '#facc15']; 

const Balance = () => {
  const axiosSecure = useAxiosSecure();
    const [pageTitle, setPageTitle] = useState('FitFolio');

  useEffect(() => {
    const newTitle = 'FitFolio | Balance';
    setPageTitle(newTitle);
    document.title = newTitle;

  }, [])

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
    return (
      <div className="p-6 text-red-500 text-center font-semibold">
        ⚠️ Error loading data
      </div>
    );
  }

  const chartData = [
    { name: 'Newsletter Subscribers', value: overview.subscriberCount || 0 },
    { name: 'Paid Members', value: overview.memberCount || 0 },
  ];

  return (
    <div className="p-8 max-w-11/12 mx-auto text-white space-y-12">
       <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <h2 className="text-4xl font-extrabold text-lime-400 text-center mb-8">
        💰 Admin Balance Overview
      </h2>

      {/* Total Balance Card */}
      <div
        className="bg-gradient-to-r from-lime-900 via-lime-800 to-lime-900
          rounded-3xl p-8 shadow-[0_10px_20px_rgba(132,204,22,0.4)]
          border border-lime-600 flex flex-col items-center"
      >
        <h3 className="text-2xl font-semibold mb-2 tracking-wide">
          Total Balance
        </h3>
        <p className="text-5xl font-bold text-white flex items-center gap-2">
          <FaDollarSign className="text-lime-300" />
          ${summary.totalBalance?.toFixed(2) || '0.00'}
        </p>
      </div>

      {/* Last 6 Transactions */}
      <div
        className="bg-gradient-to-tr from-gray-900 to-gray-800 rounded-2xl p-6
          shadow-lg border border-lime-600"
      >
        <h3 className="text-xl font-semibold mb-5 text-lime-400 flex items-center gap-2">
          <FaUserCircle /> Last 6 Transactions
        </h3>
        <ul className="divide-y divide-gray-700">
          {summary.lastSixTransactions?.map((tx, idx) => (
            <li
              key={idx}
              className="flex justify-between py-3 px-4 hover:bg-lime-700/20 rounded-lg transition cursor-pointer"
              title={`Transaction by ${tx.userEmail}`}
            >
              <span className="truncate max-w-[70%]">{tx.userEmail}</span>
              <span className="font-semibold text-lime-300">${tx.price}</span>
            </li>
          )) || (
            <li className="text-center text-gray-400 py-4">
              No transactions found.
            </li>
          )}
        </ul>
      </div>

      {/* Pie Chart */}
      <div
        className="bg-gradient-to-tr from-gray-900 to-gray-800 rounded-2xl p-6
          shadow-lg border border-lime-600"
      >
        <h3 className="text-xl font-semibold mb-5 text-lime-400 flex items-center gap-2">
          📊 Newsletter Subscribers vs Paid Members
        </h3>

        <div className="h-72 w-full max-w-md mx-auto">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                labelLine={false}
                fill="#8884d8"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke="#1f2937"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#111827',
                  borderRadius: '8px',
                  border: 'none',
                  color: 'white',
                  fontWeight: 'bold',
                }}
                itemStyle={{ color: '#84cc16' }}
              />
              <Legend
                verticalAlign="bottom"
                wrapperStyle={{ color: 'white', fontWeight: '600' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Balance;
