import React, { useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const categories = [
  'Nutrition',
  'Workout',
  'Lifestyle',
  'Mental Health',
  'Supplements',
  'Other',
];

const AddForum = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [description, setDescription] = useState('');

  const { mutate, isPending } = useMutation({
    mutationFn: async (newPost) => {
      const res = await axiosSecure.post('/forums', newPost);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forums'] });

      Swal.fire({
        icon: 'success',
        title: 'Forum added!',
        text: 'Your post has been successfully added.',
        timer: 2000,
        showConfirmButton: false,
      });

    },
    onError: (error) => {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Failed!',
        text: 'Something went wrong. Please try again.',
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing fields',
        text: 'Title and Description are required!',
      });
      return;
    }

    const newPost = {
      title,
      image: imageUrl.trim(),
      category,
      description,
      createdAt: new Date().toISOString(),
    };

    mutate(newPost);
  };

  return (
    <div className="min-h-screen py-5 flex items-center justify-center bg-black px-4">
      <div className="max-w-4xl w-full p-10 bg-gradient-to-br from-[#121212] to-[#0a0a0a] rounded-3xl shadow-lg text-white">
        <h2 className="text-4xl font-extrabold mb-8 text-lime-400 text-center">
          Add New Forum Post
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          {/* Title */}
          <div>
            <label className="block mb-2 font-semibold text-lime-300">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-4 rounded-xl bg-gray-900 border border-lime-600 placeholder-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
              required
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block mb-2 font-semibold text-lime-300">
              Image URL
            </label>
            <input
              type="url"
              placeholder="Paste image URL here"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full p-4 rounded-xl bg-gray-900 border border-lime-600 placeholder-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
            />
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Preview"
                className="mt-4 rounded-xl max-h-48 mx-auto object-contain border border-lime-400 shadow-lg"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block mb-2 font-semibold text-lime-300">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-4 rounded-xl bg-gray-900 border border-lime-600 text-white focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
              required
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-gray-900">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 font-semibold text-lime-300">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="Write your forum post description here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-4 rounded-xl bg-gray-900 border border-lime-600 placeholder-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-400 min-h-[160px] resize-none transition"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="bg-lime-500 cursor-pointer hover:bg-lime-600 text-black font-bold py-4 rounded-xl shadow-lg transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isPending ? 'Posting...' : 'Add Post'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddForum;
