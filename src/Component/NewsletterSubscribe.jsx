import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const NewsletterSubscribe = () => {
  const axiosSecure = useAxiosSecure();
  const [email, setEmail] = useState("");

  const subscribeMutation = useMutation(
    async (email) => {
      const res = await axiosSecure.post("/newsletter/subscribe", { email });
      return res.data;
    },
    {
      onSuccess: (data) => {
        Swal.fire("Success", data.message || "Subscribed successfully!", "success");
        setEmail("");
      },
      onError: (error) => {
        Swal.fire(
          "Error",
          error.response?.data?.message || "Subscription failed. Try again later.",
          "error"
        );
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      Swal.fire("Error", "Please enter your email address.", "error");
      return;
    }
    subscribeMutation.mutate(email);
  };

  return (
    <section className="bg-lime-500 rounded-[2rem] p-10 max-w-4xl mx-auto mt-10 text-center">
      <h2 className="text-5xl font-extrabold mb-4">Connect Engage Transform</h2>
      <p className="text-white mb-8">
        Join A Vibrant Community For Fuel Motivation, Engagement Drives Progress, And Transformation
      </p>

      <form onSubmit={handleSubmit} className="flex justify-center gap-4 max-w-md mx-auto">
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-grow rounded-md px-4 py-3 text-black placeholder-gray-700 focus:outline-none"
          required
        />
        <button
          type="submit"
          disabled={subscribeMutation.isLoading}
          className="bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-800 transition"
        >
          {subscribeMutation.isLoading ? "Joining..." : "Join Now"}
        </button>
      </form>
    </section>
  );
};

export default NewsletterSubscribe;
