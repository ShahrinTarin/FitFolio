import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { AuthContext } from "@/Provider/AuthProvider";
import axios from "axios";

const dayOptions = [
  { label: "Saturday", value: "Saturday" },
  { label: "Sunday", value: "Sunday" },
  { label: "Monday", value: "Monday" },
  { label: "Tuesday", value: "Tuesday" },
  { label: "Wednesday", value: "Wednesday" },
  { label: "Thursday", value: "Thursday" },
  { label: "Friday", value: "Friday" },
];

const AddSlot = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { register, handleSubmit, setValue, watch } = useForm();
  const selectedClassId = watch("classId", "");

  const { data: trainer, isLoading: trainerLoading } = useQuery({
    queryKey: ["trainerProfile", user?.email],
    queryFn: async () => {
      const res = await axios.get("/trainers/approved");
      return res.data.find((t) => t.email === user.email);
    },
    enabled: !!user?.email,
  });

  const { data: classes = [], isLoading: classesLoading } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await axiosSecure.get("/classes");
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: (slotData) => axiosSecure.post("/add-slot", slotData),
    onSuccess: () => {
      queryClient.invalidateQueries(["slots"]);
      Swal.fire("Success", "Slot added successfully!", "success");
    },
    onError: () => {
      Swal.fire("Error", "Failed to add slot", "error");
    },
  });

  const onSubmit = (data) => {
    if (!data.days || data.days.length === 0) {
      Swal.fire("Warning", "Please select at least one day", "warning");
      return;
    }
    if (!selectedClassId) {
      Swal.fire("Warning", "Please select a class", "warning");
      return;
    }

    mutation.mutate({
      email: user.email,
      slotName: data.slotName,
      slotTime: data.slotTime,
      days: data.days.map((d) => d.value),
      classId: selectedClassId,
      otherInfo: data.otherInfo || "",
    });
  };

  if (trainerLoading || classesLoading) return <p className="text-center mt-10">Loading...</p>;
  if (!trainer) return <p className="text-center text-red-600 mt-10">No trainer profile found.</p>;

  return (
    <div className="max-w-3xl mb-8 mx-auto p-8 bg-[#0f0f0f] text-gray-200 rounded-2xl shadow-[inset_5px_5px_15px_#0a0a0a,inset_-5px_-5px_15px_#1a1a1a] mt-12">
      <h2 className="text-3xl font-bold text-center text-lime-400 mb-8">Add New Slot</h2>

      {/* Trainer Info */}
      <div className="bg-[#111] rounded-xl p-5 border border-[#1e1e1e] shadow-[inset_3px_3px_10px_#0a0a0a,inset_-3px_-3px_10px_#1c1c1c] mb-8">
        <h3 className="text-lg font-semibold mb-2 text-lime-300">Trainer Information</h3>
        <ul className="text-sm text-gray-400 space-y-1">
          <li><strong className="text-gray-300">Name:</strong> {trainer.fullName}</li>
          <li><strong className="text-gray-300">Email:</strong> {trainer.email}</li>
          <li><strong className="text-gray-300">Experience:</strong> {trainer.experience} years</li>
          <li><strong className="text-gray-300">Available Days:</strong> {trainer.availableDays?.join(", ")}</li>
          <li><strong className="text-gray-300">Available Time:</strong> {trainer.availableTime}</li>
        </ul>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Slot Name */}
        <div>
          <label className="block font-medium text-lime-300 mb-1">Slot Name</label>
          <input
            {...register("slotName", { required: true })}
            className="w-full bg-[#121212] text-white border-none rounded-lg shadow-[inset_3px_3px_10px_#0a0a0a,inset_-3px_-3px_10px_#1f1f1f] px-4 py-2 focus:outline-none"
            placeholder="e.g. Morning Slot"
          />
        </div>

        {/* Slot Time */}
        <div>
          <label className="block font-medium text-lime-300 mb-1">Slot Duration</label>
          <input
            {...register("slotTime", { required: true })}
            className="w-full bg-[#121212] text-white border-none rounded-lg shadow-[inset_3px_3px_10px_#0a0a0a,inset_-3px_-3px_10px_#1f1f1f] px-4 py-2 focus:outline-none"
            placeholder="e.g. 1 hour"
          />
        </div>

        {/* Select Days */}
        <div>
          <label className="block font-medium text-lime-300 mb-1">Select Days</label>
          <div className="bg-[#121212] rounded-lg px-2 py-1 shadow-[inset_2px_2px_6px_#0a0a0a,inset_-2px_-2px_6px_#1f1f1f]">
            <Select
              isMulti
              options={dayOptions}
              onChange={(selected) => setValue("days", selected)}
              className="text-black"
              theme={(theme) => ({
                ...theme,
                borderRadius: 6,
                colors: {
                  ...theme.colors,
                  primary25: '#2a2a2a',
                  primary: '#84cc16',
                  neutral0: '#121212',
                  neutral80: '#ffffff',
                },
              })}
            />
          </div>
        </div>

        {/* Select Class */}
        <div>
          <label className="block font-medium text-lime-300 mb-2">Select Class</label>
          <div className="flex flex-wrap gap-3">
            {classes.map((cls) => (
              <button
                type="button"
                key={cls._id}
                onClick={() => setValue("classId", cls._id, { shouldValidate: true })}
                className={`px-4 py-2 rounded-lg text-sm border shadow-md transition duration-200 
                  ${
                    selectedClassId === cls._id
                      ? "bg-lime-500 text-black shadow-inner"
                      : "bg-[#1b1b1b] text-white border-[#2a2a2a] hover:bg-[#2c2c2c]"
                  }`}
              >
                {cls.name}
              </button>
            ))}
          </div>
        </div>

        {/* Other Info */}
        <div>
          <label className="block font-medium text-lime-300 mb-1">Other Info (optional)</label>
          <textarea
            {...register("otherInfo")}
            className="w-full bg-[#121212] text-white border-none rounded-lg shadow-[inset_3px_3px_10px_#0a0a0a,inset_-3px_-3px_10px_#1f1f1f] px-4 py-2 focus:outline-none"
            rows={3}
            placeholder="Any special notes..."
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={mutation.isLoading}
          className="w-full py-3 rounded-xl bg-lime-500 text-black font-semibold hover:bg-lime-400 transition duration-200 shadow-[2px_2px_6px_#0a0a0a,-2px_-2px_6px_#1f1f1f]"
        >
          {mutation.isLoading ? "Adding Slot..." : "Add Slot"}
        </button>
      </form>
    </div>
  );
};

export default AddSlot;
