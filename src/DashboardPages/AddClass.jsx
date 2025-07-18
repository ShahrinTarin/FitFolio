import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const AddClass = () => {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    details: "",
    extraInfo: "",
  });

  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
    const [pageTitle, setPageTitle] = useState('FitFolio');

  useEffect(() => {
    const newTitle = 'FitFolio | AddClass';
    setPageTitle(newTitle);
    document.title = newTitle;

  }, [])

  const { mutate, isLoading } = useMutation({
    mutationFn: async (newClass) => {
      const res = await axiosSecure.post("/classes", newClass);
      return res.data;
    },
    onSuccess: (data) => {
      if (data.insertedId) {
        Swal.fire("Success!", "New class added successfully!", "success");
        setFormData({ name: "", image: "", details: "", extraInfo: "" });
        queryClient.invalidateQueries(["classes"]);
      } else {
        Swal.fire("Error", "Failed to add class.", "error");
      }
    },
    onError: (error) => {
      Swal.fire("Error", error.message || "Something went wrong!", "error");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newClass = { ...formData, createdAt: new Date().toISOString() };
    mutate(newClass);
  };

  return (
    <section className="relative min-h-screen bg-black flex items-center justify-center px-4 py-12 overflow-hidden">
 <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      {/* Floating neon curves */}
      <FloatingCurve
        color="rgba(163, 230, 53, 0.08)"
        top="10%"
        left="12%"
        scaleDuration={38}
        rotateDuration={62}
      />
      <FloatingCurve
        color="rgba(163, 230, 53, 0.1)"
        top="72%"
        left="78%"
        scaleDuration={43}
        rotateDuration={68}
      />

      {/* Glass card */}
      <motion.div
        className="w-full max-w-4xl p-10 bg-black bg-opacity-50 rounded-3xl border border-lime-400 border-opacity-40 backdrop-blur-md shadow-[0_0_20px_rgba(163,230,53,0.3)]"
        initial={{ opacity: 0, y: 25, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-4xl font-extrabold text-lime-400 mb-10 text-center font-mono tracking-wider select-none drop-shadow-[0_0_5px_rgba(163,230,53,0.8)]">
          Add New Class
        </h2>

        <form onSubmit={handleSubmit} className="space-y-7">
          <InputField label="Class Name" name="name" value={formData.name} onChange={handleChange} />
          <InputField label="Image URL" name="image" value={formData.image} onChange={handleChange} />
          <TextareaField label="Details" name="details" value={formData.details} onChange={handleChange} />
          <InputField label="Additional Info (optional)" name="extraInfo" value={formData.extraInfo} onChange={handleChange} />

          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.06, boxShadow: "0 0 15px #a3e635" }}
            whileTap={{ scale: 0.97 }}
            className="w-full cursor-pointer py-4 bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600 text-black font-bold rounded-2xl shadow-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed select-none"
          >
            {isLoading ? "Adding..." : "Add Class"}
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

const FloatingCurve = ({ color, top, left, scaleDuration, rotateDuration }) => (
  <motion.svg
    className="absolute blur-3xl pointer-events-none select-none"
    style={{ top: top, left: left, width: "380px", height: "380px" }}
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    animate={{
      scale: [1, 1.1, 1],
      rotate: [0, 360],
    }}
    transition={{
      scale: {
        duration: scaleDuration,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      },
      rotate: {
        duration: rotateDuration,
        repeat: Infinity,
        ease: "linear",
      },
    }}
  >
    <path
      d="M50,0 C77,30 123,30 150,0 C177,-30 223,-30 250,0 L250,250 L0,250 Z"
      fill={color}
    />
  </motion.svg>
);

const InputField = ({ label, name, value, onChange }) => (
  <div>
    <label
      htmlFor={name}
      className="block mb-1 text-lime-300 text-sm font-semibold tracking-wide select-none"
    >
      {label}
    </label>
    <input
      id={name}
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      required={name !== "extraInfo"}
      autoComplete="off"
      spellCheck="false"
      className="w-full rounded-xl bg-transparent border border-lime-600 px-5 py-3 text-white placeholder-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-400 shadow-[0_0_8px_rgba(163,230,53,0.5)] transition duration-300"
      placeholder={`Enter ${label.toLowerCase()}`}
    />
  </div>
);

const TextareaField = ({ label, name, value, onChange }) => (
  <div>
    <label
      htmlFor={name}
      className="block mb-1 text-lime-300 text-sm font-semibold tracking-wide select-none"
    >
      {label}
    </label>
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required
      rows={4}
      spellCheck="false"
      className="w-full rounded-xl bg-transparent border border-lime-600 px-5 py-3 text-white placeholder-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-400 shadow-[0_0_8px_rgba(163,230,53,0.5)] transition duration-300 resize-none"
      placeholder={`Enter ${label.toLowerCase()}`}
    />
  </div>
);

export default AddClass;
