import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Loader from "@/Shared/Loader";

const AllClasses = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: classes = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["all-classes"],
    queryFn: async () => {
      const res = await axiosSecure.get("/classes");
      return res.data;
    },
  });

  if (isLoading) return <Loader />;
  if (isError)
    return <p className="text-red-500 text-center mt-4">Error: {error.message}</p>;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {classes.map((cls) => (
        <div
          key={cls._id}
          className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <img
            src={cls.image}
            alt={cls.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold">{cls.name}</h2>
            <p className="text-gray-600 mt-2">{cls.details}</p>
            <p className="text-sm text-gray-500 mt-2">
              Booked: {cls.bookingCount || 0}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllClasses;
