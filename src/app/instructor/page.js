"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLazyGetInstructorByEmailQuery } from "../../redux/features/lectureSchedulerApi";

export default function InstructorLoginPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const [getInstructorByEmail] = useLazyGetInstructorByEmailQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Email is required.");
      return;
    }

    try {
      const instructor = await getInstructorByEmail(email).unwrap();
      console.log(`/instructor/${instructor._id}`);
      router.push(`/instructor/${instructor._id}`);
      console.log(`/instructor/${instructor._id}`);
    } catch (err) {
      console.error("Login failed:", err);
      setError("Instructor not found. Please check the email.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center text-blue-600">
          Instructor Login
        </h1>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="instructor@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-medium"
        >
          Login
        </button>
      </form>
    </div>
  );
}
