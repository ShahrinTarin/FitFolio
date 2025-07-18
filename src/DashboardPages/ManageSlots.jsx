import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { AuthContext } from '@/Provider/AuthProvider';
import Loader from '@/Shared/Loader';
import { Helmet } from 'react-helmet-async';

const ManageSlots = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [pageTitle, setPageTitle] = useState('FitFolio');

  useEffect(() => {
    const newTitle = 'FitFolio | ManageSlot';
    setPageTitle(newTitle);
    document.title = newTitle;

  }, [])

  const { data: slots = [], isLoading, refetch } = useQuery({
    queryKey: ['trainerSlots', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/slots/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to recover this slot!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/slot/${id}`);
        Swal.fire('Deleted!', 'Slot has been deleted.', 'success');
        refetch();
      } catch (err) {
        Swal.fire('Error!', 'Something went wrong.', 'error');
        console.error(err);
      }
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div>
       <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <div className="w-11/12 min-h-[calc(100vh-84px)] mx-auto  md:py-10 rounded-lg shadow-lg">
      <h2 className="text-3xl md:text-4xl text-center text-lime-400 font-extrabold mb-8 dancing-font drop-shadow-lg">
        Manage Your Slots
      </h2>

      {slots.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No slots created yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md border border-lime-300">
          <table className="min-w-full divide-y divide-lime-300">
            <thead className="bg-lime-200">
              <tr>
                <th className="px-4 py-3 text-left text-md font-bold text-lime-700 uppercase">
                  Days
                </th>
                <th className="px-4 py-3 text-left text-md font-bold text-lime-700 uppercase">
                  Time
                </th>
                <th className="px-4 py-3 text-left text-md font-bold text-lime-700 uppercase">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-md font-bold text-lime-700 uppercase hidden md:table-cell">
                  Booked By
                </th>
                <th className="px-4 py-3 text-left text-md font-bold text-lime-700 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-lime-300">
              {slots.map((slot) => (
                <tr
                  key={slot._id}
                  className="hover:bg-lime-100 transition-colors cursor-default"
                >
                  {/* Join days array if multiple days */}
                  <td className="px-4 py-4 text-lime-800 font-semibold whitespace-nowrap">
                    {Array.isArray(slot.days) ? slot.days.join(', ') : slot.days || '—'}
                  </td>

                  {/* Assuming your slot time is stored in slot.slotTime */}
                  <td className="px-4 py-4 text-lime-700">
                    {slot.slotTime || slot.time || '—'}
                  </td>

                  <td className="px-4 py-4">
                    {slot.isBooked ? (
                      <span className="text-red-600 font-semibold">Booked</span>
                    ) : (
                      <span className="text-green-600 font-semibold">Available</span>
                    )}
                  </td>

                  <td className="px-4 py-4 text-lime-700 hidden md:table-cell">
                    {slot.isBooked && slot.bookedBy ? (
                      // Adjust according to your bookedBy structure
                      <>
                        <p className="font-semibold">{slot.bookedBy.email || slot.bookedBy.name || 'Unknown'}</p>
                        {slot.bookedBy.transactionId && (
                          <p className="text-xs text-gray-500">Paid At: {new Date(slot.bookedBy.paidAt).toLocaleString()}</p>
                        )}
                      </>
                    ) : (
                      '—'
                    )}
                  </td>

                  <td className="px-4 py-4">
                    <button
                      onClick={() => handleDelete(slot._id)}
                      disabled={slot.isBooked}
                      className={`px-4 py-2 rounded text-white text-sm font-semibold transition ${slot.isBooked
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-red-500 hover:bg-red-600'
                        }`}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </div>
  );
};

export default ManageSlots;
