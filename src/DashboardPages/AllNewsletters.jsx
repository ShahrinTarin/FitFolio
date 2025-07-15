import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Loader from "@/Shared/Loader";

const AllNewsletters = () => {
  const axiosSecure = useAxiosSecure();

  const { data: subscribers = [], isLoading, isError } = useQuery({
    queryKey: ["newsletterSubscribers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/newsletter/all");
      return res.data;
    },
  });

  if (isLoading)
    return <Loader />
   
    

  if (isError)
    return (
      <div className="text-center text-red-600 font-semibold py-8">
        Failed to load subscribers.
      </div>
    );

  if (subscribers.length === 0)
    return (
      <div className="text-center mt-20 text-lime-600">
        <p className="text-xl font-semibold mb-2">No subscribers found 😕</p>
        <p>Please check again later.</p>
      </div>
    );

  return (
    <div className="mx-2 md:w-11/12 min-h-[calc(100vh-84px)] md:mx-auto mb-5 mt-8 md:py-10 rounded-lg shadow-lg">
      <h1 className="text-3xl md:text-4xl text-center text-lime-400 font-extrabold mb-6 dancing-font drop-shadow-lg">
        All Newsletter Subscribers
      </h1>

      <div className="overflow-x-auto rounded-lg shadow-md border border-lime-300">
        <table className="min-w-full bg-lime-100 divide-y divide-lime-300">
          <thead className="bg-lime-200">
            <tr>
              <th className="px-4 py-3 text-left text-md font-bold  text-lime-700 uppercase">
                No
              </th>
              <th className="px-2 py-3 text-left text-md font-bold  text-lime-700 uppercase">
                Name
              </th>
              <th className="px-2 py-3 text-left text-md font-bold  text-lime-700 uppercase">
                Email
              </th>
              <th className="px-2 py-3 text-left text-md font-bold text-lime-700 uppercase hidden md:table-cell">
                Subscribed At
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-lime-300">
            {subscribers.map((subscriber, index) => (
              <tr
                key={subscriber._id || subscriber.email || index}
                className="hover:bg-lime-300 transition-colors"
              >
                <td className="px-4 py-4 text-lime-700 font-medium">{index + 1}</td>
                <td className="px-2 py-4 text-lime-800 font-semibold whitespace-nowrap">
                  {subscriber.name || "N/A"}
                </td>
                <td className="px-2 py-4 text-lime-700">{subscriber.email}</td>
                <td className="px-2 py-4 text-lime-600 hidden md:table-cell">
                  {subscriber.subscribedAt
                    ? new Date(subscriber.subscribedAt).toLocaleDateString()
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllNewsletters;