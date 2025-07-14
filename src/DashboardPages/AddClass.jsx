import React, { useState } from "react";
import Swal from "sweetalert2";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxiosSecure from "@/hooks/useAxiosSecure"; // your custom hook

const AddClass = () => {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    details: "",
    extraInfo: "",
  });

  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

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
    <section className="w-full relative min-h-screen overflow-hidden">
      {/* Dark black gradient background */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #000000, #050505 40%, #0a0a0a 80%)",
        }}
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Lime accent floating curves */}
      <FloatingCurve
        color="rgba(163, 230, 53, 0.03)"
        top="20%"
        left="15%"
        scaleDuration={30}
        rotateDuration={45}
      />
      <FloatingCurve
        color="rgba(163, 230, 53, 0.04)"
        top="50%"
        left="75%"
        scaleDuration={35}
        rotateDuration={50}
      />
      <FloatingCurve
        color="rgba(163, 230, 53, 0.05)"
        top="70%"
        left="30%"
        scaleDuration={40}
        rotateDuration={60}
      />

      {/* Form */}
      <div className="relative flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-8">
        <motion.div
          className="w-full max-w-4xl p-8 bg-transparent backdrop-blur-2xl rounded-xl shadow-2xl text-white"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-lime-400 animate-pulse">
            Add New Class
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <InputField label="Class Name" name="name" value={formData.name} onChange={handleChange} />
            <InputField label="Image URL" name="image" value={formData.image} onChange={handleChange} />
            <TextareaField label="Details" name="details" value={formData.details} onChange={handleChange} />
            <InputField label="Additional Info (optional)" name="extraInfo" value={formData.extraInfo} onChange={handleChange} />

            <div className="text-center pt-2">
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 cursor-pointer bg-lime-500 text-black font-bold rounded hover:bg-lime-600 transition duration-300"
              >
                {isLoading ? "Adding..." : "Add Class"}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

const FloatingCurve = ({ color, top, left, scaleDuration, rotateDuration }) => (
  <motion.svg
    className="absolute blur-2xl"
    style={{
      top: top,
      left: left,
      width: "400px",
      height: "400px",
    }}
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
    <label className="block text-lime-300 mb-1">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      required={name !== "extraInfo"}
      className="w-full p-3 rounded bg-gray-800 border border-gray-600 focus:outline-lime-400"
      placeholder={`Enter ${label.toLowerCase()}`}
    />
  </div>
);

const TextareaField = ({ label, name, value, onChange }) => (
  <div>
    <label className="block text-lime-300 mb-1">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      required
      className="w-full p-3 rounded bg-gray-800 border border-gray-600 focus:outline-lime-400"
      rows={4}
      placeholder={`Enter ${label.toLowerCase()}`}
    />
  </div>
);

export default AddClass;
