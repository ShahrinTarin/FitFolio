import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaEye } from "react-icons/fa";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Loader from "@/Shared/Loader";
import FeedbackModal from "./FeedbackModal";
import { Helmet } from "react-helmet-async";

const ActivityLog = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [pageTitle, setPageTitle] = useState('FitFolio');

  useEffect(() => {
    const newTitle = 'FitFolio | ActivityLog';
    setPageTitle(newTitle);
    document.title = newTitle;

  }, [])

  const { data: applicants = [], isLoading } = useQuery({
    queryKey: ["activity-log"],
    queryFn: async () => {
      const res = await axiosSecure.get("/trainer/applications/activity-log");
      return res.data;
    },
  });

  const openModal = (feedback) => {
    setSelectedFeedback(feedback);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedFeedback(null);
    setModalOpen(false);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="w-11/12 min-h-[calc(100vh-84px)] mx-auto my-10 md:py-10 rounded-lg shadow-lg ">
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <h1 className="text-3xl md:text-4xl text-center text-lime-400 font-extrabold mb-8 dancing-font drop-shadow-lg">
        📋 Activity Log
      </h1>

      {applicants.length === 0 ? (
        <p className="text-center mt-20 text-lime-600 text-xl font-semibold">
          No pending or rejected applications.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md border border-lime-300 bg-white">
          <table className="min-w-full divide-y divide-lime-300">
            <thead className="bg-lime-200">
              <tr>
                <th className="px-6 py-3 text-left text-md font-bold text-lime-700 uppercase">
                  No
                </th>
                <th className="px-6 py-3 text-left text-md font-bold text-lime-700 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-md font-bold text-lime-700 uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-md font-bold text-lime-700 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-md font-bold text-lime-700 uppercase">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-lime-300">
              {applicants.map((applicant, idx) => (
                <tr
                  key={applicant._id || idx}
                  className="hover:bg-lime-100 transition-colors"
                >
                  <td className="px-6 py-4 text-lime-700 font-semibold">{idx + 1}</td>
                  <td className="px-6 py-4 text-lime-900 font-semibold whitespace-nowrap">
                    {applicant.fullName || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-lime-700">{applicant.email}</td>
                  <td className="px-6 py-4 text-lime-800 font-semibold">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${applicant.status === "rejected"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-600"
                        }`}
                    >
                      {applicant.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {applicant.status === "rejected" && (
                      <button
                        onClick={() => openModal(applicant.feedback)}
                        className="text-lg text-lime-700 hover:text-lime-900 transition"
                        title="View Feedback"
                      >
                        <FaEye />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <FeedbackModal feedback={selectedFeedback} onClose={closeModal} />
      )}
    </div>
  );
};

export default ActivityLog;
