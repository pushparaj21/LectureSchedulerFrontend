"use client";
import { useState } from "react";
import {
  useGetCoursesQuery,
  useCreateCourseMutation,
} from "../../../redux/features/lectureSchedulerApi";
import Home from "../../components/home";

export default function CoursesPage() {
  const { data: courses = [], isLoading, error } = useGetCoursesQuery();
  const [createCourse] = useCreateCourseMutation();

  const [form, setForm] = useState({
    name: "",
    level: "",
    description: "",
    image: "",
  });

  const [formError, setFormError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.level || !form.description) {
      setFormError("Please fill out all required fields.");
      return;
    }

    try {
      await createCourse(form).unwrap();
      setForm({ name: "", level: "", description: "", image: "" });
      setFormError("");
    } catch (err) {
      console.error("Course creation failed:", err);
      setFormError("Failed to create course.");
    }
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-600">Loading courses...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-red-600">Error loading courses</p>
      </div>
    );

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl flex font-bold text-center mb-8 text-blue-600">
        <div className="mr-3">
          <Home />
        </div>
        Course Management
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 mb-8 space-y-4"
      >
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Create a New Course
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Course Name
          </label>
          <input
            className="w-full border rounded p-2 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Course Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Level
          </label>
          <select
            name="level"
            value={form.level}
            onChange={handleChange}
            className="w-full border rounded p-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Description
          </label>
          <input
            className="w-full border rounded p-2 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Course Description"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Image URL (optional)
          </label>
          <input
            className="w-full border rounded p-2 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="https://example.com/image.jpg"
            name="image"
            value={form.image}
            onChange={handleChange}
          />
        </div>

        {formError && <p className="text-red-500 text-sm">{formError}</p>}

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-200"
        >
          Create Course
        </button>
      </form>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          All Courses
        </h2>

        {courses.length === 0 ? (
          <p className="text-gray-500">No courses created yet.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {courses.map((course) => (
              <li key={course._id} className="py-4">
                <div className="flex items-start space-x-4">
                  {course.image && (
                    <img
                      src={course.image}
                      alt={course.name}
                      className="w-16 h-16 object-cover rounded border"
                    />
                  )}
                  <div>
                    <h3 className="text-lg font-semibold text-blue-600">
                      {course.name}
                    </h3>
                    <p className="text-sm text-gray-600">{course.level}</p>
                    <p className="text-sm text-gray-700 mt-1">
                      {course.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
