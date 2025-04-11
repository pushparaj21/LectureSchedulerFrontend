"use client";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  useGetInstructorsQuery,
  useGetCoursesQuery,
  useGetLecturesQuery,
  useCreateLectureMutation,
} from "../../../redux/features/lectureSchedulerApi";
import "react-toastify/dist/ReactToastify.css";
import Home from "@/app/components/home";

export default function LecturesPage() {
  const { data: instructors = [], isLoading: loadingInstructors } =
    useGetInstructorsQuery();
  const { data: courses = [], isLoading: loadingCourses } =
    useGetCoursesQuery();
  const { data: lectures = [], isLoading: loadingLectures } =
    useGetLecturesQuery();

  const [createLecture] = useCreateLectureMutation();

  const [form, setForm] = useState({
    instructorId: "",
    courseId: "",
    date: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createLecture(form).unwrap();
      setForm({ instructorId: "", courseId: "", date: "" });
      setError("");
      toast.success("Lecture scheduled successfully!");
    } catch (err) {
      setError("Could not schedule lecture.");
      toast.error(err?.data?.msg || "Something went wrong.");
    }
  };

  if (loadingCourses || loadingInstructors || loadingLectures)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <ToastContainer />
      <h1 className="text-3xl flex font-bold text-center mb-8 text-blue-600">
        <div className="mr-3">
          <Home />
        </div>{" "}
        Lecture Scheduler
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 mb-8 space-y-4"
      >
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Schedule a Lecture
        </h2>

        {/* Instructor Select */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Instructor
          </label>
          <select
            name="instructorId"
            value={form.instructorId}
            onChange={handleChange}
            className="w-full border rounded p-2 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Instructor</option>
            {instructors.map((i) => (
              <option key={i._id} value={i._id}>
                {i.name}
              </option>
            ))}
          </select>
        </div>

        {/* Course Select */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Course
          </label>
          <select
            name="courseId"
            value={form.courseId}
            onChange={handleChange}
            className="w-full border rounded p-2 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Course</option>
            {courses.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Date Input */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border rounded p-2 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-200"
        >
          Schedule Lecture
        </button>
      </form>

      {/* Scheduled Lectures List */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Scheduled Lectures
        </h2>
        {lectures.length === 0 ? (
          <p className="text-gray-500">No lectures scheduled yet.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {lectures.map((lecture) => {
              return (
                <li key={lecture._id} className="py-3">
                  <p className="text-gray-800">
                    <span className="font-medium">
                      {new Date(lecture.date).toLocaleDateString("en-GB")}
                    </span>{" "}
                    — Course : {"  "}
                    <span className="text-blue-600 font-semibold">
                      {lecture?.course?.name}
                    </span>{" "}
                    To{" "}
                    <span className="text-green-600 font-semibold">
                      {lecture?.instructor?.name}
                    </span>
                  </p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
