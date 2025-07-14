import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Loader from "@/Shared/Loader";


const AllTrainer = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all trainers
  const { data: trainers = [], isLoading, isError, error } = useQuery({
    queryKey: ["trainers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/trainers");
      return res.data;
    },
  });

  // Mutation to remove trainer role
  const { mutate: removeTrainer, isLoading: isMutating } = useMutation({
    mutationFn: async (trainerId) => {
      const res = await axiosSecure.patch(`/users/remove-trainer/${trainerId}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Removed!", "Trainer role revoked.", "success");
      queryClient.invalidateQueries(["trainers"]);
    },
    onError: (err) => {
      Swal.fire("Error!", err.response?.data?.message || "Failed to remove trainer", "error");
    },
  });

  const handleRemoveTrainer = (id) => {
    Swal.fire({
      title: "Remove Trainer?",
      text: "This will revoke trainer access and convert to a member.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove",
    }).then((result) => {
      if (result.isConfirmed) {
        removeTrainer(id);
      }
    });
  };

  if (isLoading) return <Loader />;

  if (isError) {
    return (
      <div className="text-center mt-10 text-red-500 font-semibold">
        Failed to load trainers: {error.message}
      </div>
    );
  }

  return (
    <div className="w-11/12 min-h-[calc(100vh-84px)] mx-auto mb-5 mt-8 md:py-10 rounded-lg shadow-lg">
      <h2 className="text-3xl md:text-4xl text-center text-lime-400 font-extrabold mb-6 dancing-font drop-shadow-lg">All Trainers</h2>

      <div className="overflow-x-auto rounded shadow border border-lime-300">
        <table className="min-w-full divide-y divide-lime-300 bg-lime-100">
          <thead className="bg-lime-200">
            <tr>
              <th className="px-4 py-3 text-left text-lime-700 font-bold uppercase">No</th>
              <th className="px-4 py-3 text-left text-lime-700 font-bold uppercase">Name</th>
              <th className="px-4 py-3 text-left text-lime-700 font-bold uppercase">Email</th>
              <th className="px-4 py-3 text-left text-lime-700 font-bold uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-lime-300">
            {trainers.map((trainer, index) => (
              <tr key={trainer._id} className="hover:bg-lime-300 transition-colors">
                <td className="px-4 py-2 font-medium text-lime-700">{index + 1}</td>
                <td className="px-4 py-2 font-medium text-lime-700">{trainer.name}</td>
                <td className="px-4 py-2 text-lime-700">{trainer.email}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleRemoveTrainer(trainer._id)}
                    disabled={isMutating}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete Trainer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllTrainer;
