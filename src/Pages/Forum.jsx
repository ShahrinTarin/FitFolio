import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Loader from '@/Shared/Loader';
import Swal from 'sweetalert2';
import useAxiosSecure from '@/hooks/useAxiosSecure';

const Forum = () => {
  const [page, setPage] = useState(1);
  const axiosSecure = useAxiosSecure();
  const [userEmail, setUserEmail] = useState(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUserEmail(payload.email);
      } catch {
        setUserEmail(null);
      }
    }
  }, []);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['forums', page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/forums?page=${page}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  const voteForum = async ({ postId, vote }) => {
    const res = await axiosSecure.post(`/forums/${postId}/vote`, { vote });
    return res.data;
  };

  const mutation = useMutation({
    mutationFn: voteForum,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forums', page] });
    },
    onError: (error) => {
      Swal.fire('Error!', error.response?.data?.message || 'Failed to vote.', 'error');
    },
  });

  const handleVote = (postId, voteValue) => {
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire('Error!', 'Please log in to vote.', 'warning');
      return;
    }
    mutation.mutate({ postId, vote: voteValue });
  };

  if (isLoading) return <Loader />;
  if (isError) return <p className="text-red-500 text-center">Failed to load forum posts.</p>;

  const { posts, pagination } = data;

  const userVotes = {};
  posts.forEach(post => {
    if (post.votes?.voters && userEmail) {
      userVotes[post._id] = post.votes.voters[userEmail] || 0;
    }
  });

  return (
    <div className="min-h-screen max-w-6xl mx-auto px-4 py-10 text-white">
      <h1 className="text-3xl lg:text-5xl dancing-font font-bold text-center text-lime-400 mb-8">
        📚 Forum Posts
      </h1>

      {posts.length === 0 ? (
        <p className="text-center text-gray-400">No forum posts found.</p>
      ) : (
        posts.map(post => {
          const isOwner = userEmail === post.authorEmail;

          return (
            <div
              key={post._id}
              className="bg-gradient-to-br from-[#121212] to-[#1c1c1c] border border-lime-500/40 shadow-lg shadow-lime-400/20 p-6 rounded-2xl mb-8 flex items-start gap-5 transition duration-300 hover:scale-[1.02]"
            >
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-32 h-32 object-cover rounded-xl shadow-md border border-lime-400/30"
                />
              )}

              <div className="flex-1 space-y-3">
                <h3 className="text-2xl font-bold text-lime-300">{post.title}</h3>
                <p className="text-gray-300 leading-relaxed">{post.description}</p>

                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mt-2">
                  <p>🗓 {new Date(post.createdAt).toLocaleDateString()}</p>
                  <p className="flex items-center gap-2">
                    👤 {post.authorEmail || 'Anonymous'}
                    {post.authorRole === 'admin' && (
                      <span className="ml-2 px-2 py-0.5 rounded bg-red-600 text-white text-xs font-semibold">
                        Admin
                      </span>
                    )}
                    {post.authorRole === 'trainer' && (
                      <span className="ml-2 px-2 py-0.5 rounded bg-green-600 text-white text-xs font-semibold">
                        Trainer
                      </span>
                    )}
                  </p>
                </div>

                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => handleVote(post._id, 1)}
                    disabled={mutation.isLoading || isOwner}
                    className={`px-4 py-2 rounded-full font-semibold flex items-center gap-2 transition cursor-pointer duration-300
                      ${
                        userVotes[post._id] === 1
                          ? 'bg-lime-400 text-black shadow-md'
                          : 'bg-gray-900 text-lime-400 border border-lime-400 hover:bg-lime-500/20'
                      }
                      ${isOwner ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                    title={isOwner ? "You cannot vote on your own post" : "Upvote"}
                  >
                    👍 {post.votes?.up || 0}
                  </button>

                  <button
                    onClick={() => handleVote(post._id, -1)}
                    disabled={mutation.isLoading || isOwner}
                    className={`px-4 cursor-pointer py-2 rounded-full font-semibold flex items-center gap-2 transition duration-300
                      ${
                        userVotes[post._id] === -1
                          ? 'bg-red-400 text-black shadow-md'
                          : 'bg-gray-900 text-red-400 border border-red-400 hover:bg-red-500/20'
                      }
                      ${isOwner ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                    title={isOwner ? "You cannot vote on your own post" : "Downvote"}
                  >
                    👎 {post.votes?.down || 0}
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}

      <div className="flex justify-center items-center gap-6 mt-8">
        <button
          onClick={() => setPage(p => Math.max(p - 1, 1))}
          disabled={page === 1}
          className={`px-4 py-2 rounded-lg font-medium border border-lime-400 text-lime-300 
            ${page === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-lime-500/20'}`}
        >
          Previous
        </button>

        <span className="text-lime-400 font-semibold">
          Page {page} of {pagination.pages}
        </span>

        <button
          onClick={() => setPage(p => Math.min(p + 1, pagination.pages))}
          disabled={page === pagination.pages}
          className={`px-4 py-2 rounded-lg font-medium border border-lime-400 text-lime-300 
            ${page === pagination.pages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-lime-500/20'}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Forum;
