import React, { useState, useContext, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '@/Provider/AuthProvider';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import Loader from '@/Shared/Loader';
import { Helmet } from 'react-helmet-async';

const StarRating = ({ rating, setRating }) => {
    return (
        <div className="flex gap-1 cursor-pointer text-2xl text-lime-400">
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    onClick={() => setRating(star)}
                    className={star <= rating ? 'text-lime-400' : 'text-gray-600'}
                >
                    ★
                </span>
            ))}
        </div>
    );
};

const BookedTrainer = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [pageTitle, setPageTitle] = useState('FitFolio');

    useEffect(() => {
        const newTitle = 'FitFolio | BookedTrainer';
        setPageTitle(newTitle);
        document.title = newTitle;

    }, [])

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentBooking, setCurrentBooking] = useState(null);
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');

    const { data: bookings = [], isPending, isError } = useQuery({
        queryKey: ['bookings', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get('/bookings');
            return res.data;
        },
    });

    const reviewMutation = useMutation({
        mutationFn: (newReview) => axiosSecure.post('/reviews', newReview),
        onSuccess: () => {
            Swal.fire({
                title: "Congratulation!",
                text: "Your review has been added successfully !",
                icon: "success"
            });
            queryClient.invalidateQueries({ queryKey: ['bookings', user?.email] });
            closeModal();
        },
        onError: (err) => {
            console.error(err);
            Swal.fire({
                title: "Oops!",
                text: 'Failed to submit review.',
                icon: "warning"
            });
        },
    });

    const openReviewModal = (booking) => {
        setCurrentBooking(booking);
        setRating(0);
        setFeedback('');
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setCurrentBooking(null);
    };

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        if (!rating || !feedback.trim()) {
            Swal.fire({
                title: "Oops!",
                text: 'Please provide a rating and feedback.',
                icon: "warning"
            });
            return;
        }
        reviewMutation.mutate({
            bookingId: currentBooking._id,
            userEmail: user?.email,
            userphoto: user?.photoURL || "/default-user.png",
            userName: user?.displayName || "Anonymous",
            rating,
            feedback,
        });
    };

    if (isPending) return <Loader></Loader>;
    if (isError) return <div className="p-6 text-red-500 text-center font-semibold">
        ⚠️ Error loading data
    </div>
    if (bookings.length === 0) return <p className="text-center mt-20 text-gray-300">You haven’t booked any classes yet.</p>;

    return (
        <div className="p-6 space-y-6">
            <Helmet>
                <title>{pageTitle}</title>
            </Helmet>
            <h2 className="text-3xl font-bold text-center text-lime-400 dancing-font">Your Booked Trainers</h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {bookings.map((booking) => (
                    <div
                        key={booking._id}
                        className="bg-gradient-to-br from-black to-gray-900 border border-lime-500 text-white p-6 rounded-2xl shadow-xl hover:shadow-lime-500/30 transition duration-300"
                    >
                        <h3 className="text-2xl font-semibold text-lime-400 mb-2">
                            {booking.trainer.fullName}
                        </h3>
                        <p><span className="text-lime-300 font-medium">Trainer's Email:</span> {booking.trainer.email}</p>
                        <p><span className="text-lime-300 font-medium">Trainer's Age:</span> {booking.trainer.age} yrs</p>
                        <p><span className="text-lime-300 font-medium">Trainer's Experience:</span> {booking.trainer.experience} yrs</p>
                        <p><span className="text-lime-300 font-medium">Class:</span> {booking.class.name}</p>
                        <p><span className="text-lime-300 font-medium">Slot:</span> {booking.slot.slotName}  || {booking.slot.slotTime} hour</p>
                        <p><span className="text-lime-300 font-medium">Booked on:</span> {new Date(booking.paidAt).toLocaleString()}</p>

                        <button
                            onClick={() => openReviewModal(booking)}
                            className="mt-4 cursor-pointer bg-lime-400 hover:bg-lime-500 text-black font-semibold py-2 px-4 rounded-lg transition"
                        >
                            Leave Review
                        </button>
                    </div>
                ))}
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                ariaHideApp={false}
                className="bg-black max-w-2xl w-[95%] p-8 rounded-xl border border-lime-500 text-white"
                overlayClassName="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
            >
                <h3 className="text-2xl font-bold text-lime-400 mb-4">Leave a Review</h3>
                <form onSubmit={handleReviewSubmit}>
                    <div className="mb-4">
                        <label className="block text-lime-300 mb-1">Rating:</label>
                        <StarRating rating={rating} setRating={setRating} />
                    </div>
                    <div className="mb-6">
                        <label className="block text-lime-300 mb-1">Feedback:</label>
                        <textarea
                            className="w-full p-3 rounded-md bg-gray-900 border border-lime-500 text-white resize-none"
                            rows={5}
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            required
                            placeholder="Write your thoughts..."
                        />
                    </div>
                    <div className="flex justify-end gap-4">
                        <button
                            type="submit"
                            className="bg-lime-400 cursor-pointer hover:bg-lime-500 text-black font-bold py-2 px-5 rounded"
                            disabled={reviewMutation.isPending}
                        >
                            {reviewMutation.isPending ? 'Submitting...' : 'Submit'}
                        </button>
                        <button
                            type="button"
                            onClick={closeModal}
                            className="bg-gray-700 cursor-pointer hover:bg-gray-600 text-white font-bold py-2 px-5 rounded"
                            disabled={reviewMutation.isPending}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default BookedTrainer;
