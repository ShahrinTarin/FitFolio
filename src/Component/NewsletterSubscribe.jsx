import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '@/hooks/useAxiosSecure';


export default function NewsletterSubscribe() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
const axiosSecure =useAxiosSecure()
  const { mutate: subscribeNewsletter, isLoading } = useMutation({
    mutationFn: async () => {
      const { data } = await axiosSecure.post('/newsletter/subscribe', { name, email });
      return data;
    },
    onSuccess: () => {
      Swal.fire('Success!', 'You have subscribed to the newsletter!', 'success');
      setName('');
      setEmail('');
    },
    onError: (err) => {
      console.error(err);
      Swal.fire('Error', err.response?.data?.message || 'Subscription failed. Please try again.', 'error');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    subscribeNewsletter();
  };


 return (
  <section className="bg-lime-500 rounded-3xl px-4 md:px-8 py-20 w-10/12 mx-auto my-16 text-center">
    <h1 className="text-4xl md:text-6xl text-center text-gray-900 font-extrabold mb-6 dancing-font">
      Connect Engage Transform
    </h1>
    <p className="mb-8 text-white opacity-90 max-w-xl mx-auto">
      Join a vibrant community where fuel meets motivation, engagement drives progress, and transformation happens together.
    </p>

    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 w-full max-w-3xl mx-auto"
    >
      <input
        type="text"
        placeholder="Your Name"
        className="bg-white rounded-full px-6 py-4 flex-1 min-w-[200px] text-black placeholder-gray-500 focus:outline-none"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Your Email"
        className="bg-white rounded-full px-6 py-4 flex-1 min-w-[200px] text-black placeholder-gray-500 focus:outline-none"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        type="submit"
        disabled={isLoading}
        className="bg-black cursor-pointer text-white px-8 py-4 rounded-full hover:bg-gray-200 hover:text-black transition disabled:opacity-70 min-w-[150px]"
      >
        {isLoading ? 'Subscribing...' : 'Join Now'}
      </button>
    </form>
  </section>
);

}
