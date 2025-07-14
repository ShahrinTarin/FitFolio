import React, { useState, useMemo, useContext } from "react";
import Select from "react-select";
import Swal from "sweetalert2";
import { useMutation } from "@tanstack/react-query";
import { AuthContext } from "@/Provider/AuthProvider";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useRole from "@/hooks/useRole";

const daysOptions = [
  { value: "Sun", label: "Sunday" },
  { value: "Mon", label: "Monday" },
  { value: "Tue", label: "Tuesday" },
  { value: "Wed", label: "Wednesday" },
  { value: "Thu", label: "Thursday" },
  { value: "Fri", label: "Friday" },
  { value: "Sat", label: "Saturday" },
];

const skillsOptions = [
  { value: "Yoga", label: "Yoga" },
  { value: "Cardio", label: "Cardio" },
  { value: "Strength", label: "Strength Training" },
  { value: "Zumba", label: "Zumba" },
  { value: "Nutrition", label: "Nutrition" },
  { value: "Crossfit", label: "Crossfit" },
];

const BeTrainer = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [role] = useRole();
  const [formData, setFormData] = useState({
    fullName: user?.displayName || "",
    email: user?.email || "",
    age: "",
    profileImage: user?.photoURL || "",
    skills: [],
    availableDays: [],
    availableTime: "",
    experience: "",
    facebook: "",
    linkedin: "",
    otherInfo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDaysChange = (selected) => {
    setFormData((prev) => ({
      ...prev,
      availableDays: selected ? selected.map((d) => d.value) : [],
    }));
  };

  const handleSkillsChange = (selected) => {
    setFormData((prev) => ({
      ...prev,
      skills: selected ? selected.map((s) => s.value) : [],
    }));
  };

  const selectedDays = useMemo(
    () => daysOptions.filter((option) => formData.availableDays.includes(option.value)),
    [formData.availableDays]
  );

  const selectedSkills = useMemo(
    () => skillsOptions.filter((option) => formData.skills.includes(option.value)),
    [formData.skills]
  );

  const { mutate: applyTrainer, isPending } = useMutation({
    mutationFn: async () => {
      const { data } = await axiosSecure.post("/trainer/apply", formData);
      return data;
    },
    onSuccess: () => {
      Swal.fire("Success!", "Your application is submitted!", "success");
    },
    onError: (err) => {
      console.error(err);
      Swal.fire("Error", err.response?.data?.message || "Something went wrong", "error");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    applyTrainer();
  };

  return (
    <section className="relative p-5 flex items-center justify-center min-h-[calc(100vh-84px)] bg-[url('https://i.ibb.co/35PwkFY3/dumble.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      <div className="relative w-full max-w-4xl p-10 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-2xl">
        <h2 className="text-3xl font-bold mb-8 text-center text-white">Become a Trainer</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-white mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full p-3 rounded bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-lime-400"
              />
            </div>

            <div>
              <label className="block text-white mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                readOnly
                className="w-full p-3 rounded bg-white/20 border border-white/30 text-white opacity-70"
              />
            </div>

            <div>
              <label className="block text-white mb-1">Age</label>
              <input
                type="number"
                name="age"
                min={18}
                value={formData.age}
                onChange={handleChange}
                required
                className="w-full p-3 rounded bg-white/20 border border-white/30 text-white"
              />
            </div>

            <div>
              <label className="block text-white mb-1">Experience (Years)</label>
              <input
                type="number"
                name="experience"
                min={0}
                value={formData.experience}
                onChange={handleChange}
                required
                className="w-full p-3 rounded bg-white/20 border border-white/30 text-white"
              />
            </div>

            <div>
              <label className="block text-white mb-1">Profile Image URL</label>
              <input
                type="text"
                name="profileImage"
                value={formData.profileImage}
                onChange={handleChange}
                required
                className="w-full p-3 rounded bg-white/20 border border-white/30 text-white"
              />
            </div>

            <div>
              <label className="block text-white mb-1">Available Time</label>
              <input
                type="text"
                name="availableTime"
                value={formData.availableTime}
                onChange={handleChange}
                placeholder="Ex: 9 AM - 12 PM"
                required
                className="w-full p-3 rounded bg-white/20 border border-white/30 text-white"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-white mb-1">Skills</label>
              <Select
                isMulti
                options={skillsOptions}
                onChange={handleSkillsChange}
                value={selectedSkills}
                className="text-black"
              />
            </div>

            <div>
              <label className="block text-white mb-1">Available Days</label>
              <Select
                isMulti
                options={daysOptions}
                onChange={handleDaysChange}
                value={selectedDays}
                className="text-black"
              />
            </div>

            <div>
              <label className="block text-white mb-1">Facebook URL</label>
              <input
                type="text"
                name="facebook"
                value={formData.facebook}
                onChange={handleChange}
                placeholder="https://facebook.com/yourprofile"
                className="w-full p-3 rounded bg-white/20 border border-white/30 text-white"
              />
            </div>

            <div>
              <label className="block text-white mb-1">LinkedIn URL</label>
              <input
                type="text"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/yourprofile"
                className="w-full p-3 rounded bg-white/20 border border-white/30 text-white"
              />
            </div>

            <div>
              <label className="block text-white mb-1">Other Info</label>
              <textarea
                name="otherInfo"
                value={formData.otherInfo}
                onChange={handleChange}
                rows={3}
                className="w-full p-3 rounded bg-white/20 border border-white/30 text-white"
              />
            </div>

            <button
              disabled={role !== "member" || isPending}
              type="submit"
              className="w-full cursor-pointer px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed bg-lime-400 text-black font-bold rounded hover:bg-lime-500 transition duration-300"
            >
              {isPending ? "Submitting..." : "Apply"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default BeTrainer;
