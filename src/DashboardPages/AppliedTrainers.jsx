import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Loader from "@/Shared/Loader";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const AppliedTrainers = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
    const [pageTitle, setPageTitle] = useState('FitFolio');

  useEffect(() => {
    const newTitle = 'FitFolio | AppliedTrainers';
    setPageTitle(newTitle);
    document.title = newTitle;

  }, [])

  const [selectedApp, setSelectedApp] = useState(null);
  const [feedback, setFeedback] = useState("");

  // Fetch all trainer applications with refetch function
  const {
    data: applications = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["trainerApplications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/trainer/applications");
      return res.data;
    },
  });

  // Approve mutation, calls refetch on success
  const {
    mutate: approveMutation,
    isLoading: isApproving,
  } = useMutation({
    mutationFn: async (applicationId) => {
      const { data } = await axiosSecure.patch(
        `/trainer/applications/${applicationId}/approve`
      );
      return data;
    },
    onSuccess: () => {
      Swal.fire("Approved!", "Trainer application approved.", "success");
      refetch();
    },
    onError: (err) => {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Failed to approve",
        "error"
      );
    },
  });

  // Reject mutation, calls refetch on success
  const {
    mutate: rejectMutation,
    isLoading: isRejecting,
  } = useMutation({
    mutationFn: async ({ applicationId, feedback }) => {
      const { data } = await axiosSecure.patch(
        `/trainer/applications/${applicationId}/reject`,
        { feedback }
      );
      return data;
    },
    onSuccess: () => {
      Swal.fire("Rejected!", "Trainer application rejected.", "success");
      closeModal();
      refetch();
    },
    onError: (err) => {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Failed to reject",
        "error"
      );
    },
  });

  const handleApprove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Approve this trainer application?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, approve!",
    }).then((result) => {
      if (result.isConfirmed) {
        approveMutation(id);
      }
    });
  };

  const handleOpenRejectModal = (application) => {
    setSelectedApp(application);
    setFeedback(""); // reset feedback each time
  };

  const closeModal = () => {
    setSelectedApp(null);
    setFeedback("");
  };

  const handleSubmitRejection = () => {
    if (!feedback.trim()) {
      Swal.fire("Validation Error", "Feedback is required", "warning");
      return;
    }
    rejectMutation({ applicationId: selectedApp._id, feedback });
  };

  if (isLoading) return <Loader />;

  if (isError)
    return (
      <div className="text-center text-red-600 font-semibold py-8">
        Error: {error.message}
      </div>
    );

  if (applications.length === 0)
    return (
      <div className="text-center mt-20 text-gray-500">
        <p className="text-xl font-semibold mb-2">No trainer applications found.</p>
      </div>
    );

  return (
    <div className="w-11/12 min-h-[calc(100vh-84px)] mx-auto mb-5  md:py-10 rounded-lg shadow-lg">
       <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <h1 className="text-3xl md:text-4xl text-center text-lime-400 font-extrabold mb-6 dancing-font drop-shadow-lg">
        Applied Trainer Requests
      </h1>

      <div className="overflow-x-auto rounded-lg shadow-md border border-lime-300">
        <table className="min-w-full bg-lime-100 divide-y divide-lime-300">
          <thead className="bg-lime-200">
            <tr>
              <th className="px-4 py-3 text-left text-md font-bold text-lime-700 uppercase">
                No
              </th>
              <th className="px-4 py-3 text-left text-md font-bold text-lime-700 uppercase">
                Name
              </th>
              <th className="px-4 py-3 text-left text-md font-bold text-lime-700 uppercase">
                Email
              </th>
              <th className="px-4 py-3 text-left text-md font-bold text-lime-700 uppercase hidden md:table-cell">
                Status
              </th>
              <th className="px-4 py-3 text-left text-md font-bold text-lime-700 uppercase">
                Applied At
              </th>
              <th className="px-4 py-3 text-left text-md font-bold text-lime-700 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-lime-300">
            {applications.map((app, index) => (
              <tr
                key={app._id}
                className="hover:bg-lime-300 transition-colors"
              >
                <td className="px-4 py-4 text-lime-700 font-medium">
                  {index + 1}
                </td>
                <td className="px-6 py-4 text-lime-700 font-medium">
                  {app.fullName || "N/A"}
                </td>
                <td className="px-6 py-4 text-lime-700 ">{app.email}</td>
                <td className="px-6 py-4 text-lime-700 hidden md:table-cell capitalize">
                  {app.status || "pending"}
                </td>
                <td className="px-6 py-4 text-lime-700">
                  {new Date(app.appliedAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 space-x-2 whitespace-nowrap">
                  <button
                    onClick={() => navigate(`/admin/trainer-applications/${app._id}`)}
                    className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => handleApprove(app._id)}
                    disabled={isApproving}
                    className="bg-green-500 cursor-pointer hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleOpenRejectModal(app)}
                    disabled={isRejecting}
                    className="bg-red-500 cursor-pointer hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedApp && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-lime-50 rounded-2xl shadow-lg max-w-lg w-full p-6 md:p-8 mx-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Trainer Photo */}
            <div className="flex justify-center mb-6">
              <img
                src={selectedApp.profileImage || "/default-avatar.png"}
                alt={`${selectedApp.fullName || "Trainer"} photo`}
                className="w-24 h-24 rounded-full object-cover border-4 border-lime-400 shadow-md"
              />
            </div>

            <h2 className="text-2xl font-extrabold text-lime-700 mb-6 dancing-font drop-shadow-md text-center">
              Reject Trainer Application
            </h2>

            <div className="mb-6 space-y-2 text-lime-800 text-center">
              <p>
                <span className="font-semibold">Name:</span> {selectedApp.fullName || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {selectedApp.email}
              </p>
              {/* Add more profile fields here if needed */}
            </div>

            <label
              htmlFor="feedback"
              className="block text-lime-700 font-semibold mb-2"
            >
              Rejection Feedback
            </label>
            <textarea
              id="feedback"
              className="w-full border-2 border-lime-400 focus:border-lime-600 rounded-lg p-3 text-gray-800 placeholder-lime-400 resize-y transition-colors"
              placeholder="Provide rejection feedback..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={5}
            />

            <div className="mt-8 flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="px-5 py-2 rounded-lg border border-lime-400 text-lime-600 font-semibold hover:bg-lime-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitRejection}
                disabled={isRejecting}
                className={`px-5 py-2 rounded-lg font-bold text-white shadow-md transition
                  ${
                    isRejecting
                      ? "bg-lime-300 cursor-not-allowed"
                      : "bg-lime-600 hover:bg-lime-700"
                  }`}
              >
                {isRejecting ? "Submitting..." : "Submit Rejection"}
              </button>
            </div>

            {/* Close icon top-right */}
            <button
              onClick={closeModal}
              aria-label="Close modal"
              className="absolute top-4 right-4 text-lime-600 hover:text-lime-800 transition text-2xl font-bold"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppliedTrainers;
