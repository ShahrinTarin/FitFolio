import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useAuth from '@/hooks/useAuth'; // Assuming you have a context that gives the user

const ManageSlots = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // ✅ Fetch trainer's slots
  const { data: slots = [], isLoading, refetch } = useQuery({
    queryKey: ['trainerSlots', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/slots/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // ✅ Delete handler
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
        refetch(); // Invalidate and re-fetch slots
      } catch (err) {
        Swal.fire('Error!', 'Something went wrong.', 'error');
        console.log(err);
      }
    }
  };

  // 🔄 Loading State
  if (isLoading) return <div className="text-center py-10">Loading slots...</div>;

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-lime-600 mb-6 text-center">Manage Your Slots</h2>

      {slots.length === 0 ? (
        <p className="text-gray-500 text-center">No slots created yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full table-auto border border-gray-200">
            <thead className="bg-lime-100 text-lime-800">
              <tr>
                <th className="p-3 text-left">Day</th>
                <th className="p-3 text-left">Time</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Booked By</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {slots.map((slot) => (
                <tr key={slot._id} className="border-b hover:bg-lime-50 transition">
                  <td className="p-3">{slot.day}</td>
                  <td className="p-3">{slot.time}</td>
                  <td className="p-3">
                    {slot.isBooked ? (
                      <span className="text-red-500 font-semibold">Booked</span>
                    ) : (
                      <span className="text-green-600 font-semibold">Available</span>
                    )}
                  </td>
                  <td className="p-3">{slot.isBooked ? slot.bookedBy : '—'}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(slot._id)}
                      className={`px-4 py-1 text-white text-sm rounded ${
                        slot.isBooked
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-red-500 hover:bg-red-600'
                      }`}
                      disabled={slot.isBooked}
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
  );
};

export default ManageSlots;
