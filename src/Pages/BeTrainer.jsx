import React, { useState, useContext } from "react";
import Select from "react-select";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthProvider";

const BeTrainer = () => {
  const { user } = useContext(AuthContext); // your auth context
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    profileImage: "",
    skills: [],
    availableDays: [],
    availableTime: "",
    otherInfo: "",
  });

  const dayOptions = [
    { value: "Sun", label: "Sunday" },
    { value: "Mon", label: "Monday" },
    { value: "Tue", label: "Tuesday" },
    { value: "Wed", label: "Wednesday" },
    { value: "Thu", label: "Thursday" },
    { value: "Fri", label: "Friday" },
    { value: "Sat", label: "Saturday" },
  ];

  const skillOptions = ["Yoga", "Fitness", "Cardio", "Nutrition", "Pilates"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, value],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        skills: prev.skills.filter((skill) => skill !== value),
      }));
    }
  };

  const handleDaysChange = (selected) => {
    setFormData((prev) => ({
      ...prev,
      availableDays: selected.map((d) => d.value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trainerData = {
      ...formData,
      email: user?.email,
      status: "pending",
    };

    try {
      const res = await axios.post("http://localhost:3000/api/trainers", trainerData, {
        withCredentials: true,
      });

      if (res.data.success) {
        Swal.fire("Success", "Application submitted!", "success");
        setFormData({
          fullName: "",
          age: "",
          profileImage: "",
          skills: [],
          availableDays: [],
          availableTime: "",
          otherInfo: "",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", err.response?.data?.message || "Something went wrong!", "error");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Be a Trainer</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          required
          className="border p-2 w-full"
        />

        <input
          name="email"
          value={user?.email || ""}
          readOnly
          className="border p-2 w-full bg-gray-200"
        />

        <input
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Age"
          type="number"
          required
          className="border p-2 w-full"
        />

        <input
          name="profileImage"
          value={formData.profileImage}
          onChange={handleChange}
          placeholder="Profile Image URL"
          required
          className="border p-2 w-full"
        />

        <div>
          <p className="font-semibold mb-1">Skills:</p>
          {skillOptions.map((skill) => (
            <label key={skill} className="mr-4">
              <input
                type="checkbox"
                value={skill}
                checked={formData.skills.includes(skill)}
                onChange={handleSkillChange}
              />{" "}
              {skill}
            </label>
          ))}
        </div>

        <div>
          <p className="font-semibold mb-1">Available Days:</p>
          <Select
            isMulti
            options={dayOptions}
            value={dayOptions.filter((d) => formData.availableDays.includes(d.value))}
            onChange={handleDaysChange}
          />
        </div>

        <input
          name="availableTime"
          value={formData.availableTime}
          onChange={handleChange}
          placeholder="Available Time (ex: 2pm-5pm)"
          required
          className="border p-2 w-full"
        />

        <textarea
          name="otherInfo"
          value={formData.otherInfo}
          onChange={handleChange}
          placeholder="Other info"
          className="border p-2 w-full"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Apply
        </button>
      </form>
    </div>
  );
};

export default BeTrainer;
