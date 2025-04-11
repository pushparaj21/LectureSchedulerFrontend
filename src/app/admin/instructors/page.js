// "use client";
// import { useState } from "react";
// import {
//   useGetInstructorsQuery,
//   useCreateInstructorMutation,
// } from "../../../redux/features/lectureSchedulerApi";

// export default function InstructorsPage() {
//   const { data: instructors = [], isLoading, error } = useGetInstructorsQuery();
//   const [createInstructor] = useCreateInstructorMutation();

//   const [form, setForm] = useState({ name: "", email: "" });
//   const [formError, setFormError] = useState("");

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Basic validation
//     if (!form.name || !form.email) {
//       setFormError("Both name and email are required.");
//       return;
//     }

//     try {
//       await createInstructor(form).unwrap();
//       setForm({ name: "", email: "" });
//       setFormError("");
//     } catch (err) {
//       console.error("Error creating instructor:", err);
//       setFormError("Failed to create instructor.");
//     }
//   };

//   if (isLoading) return <p>Loading instructors...</p>;
//   if (error) return <p>Error loading instructors</p>;

//   return (
//     <div className="p-4 max-w-2xl mx-auto">
//       <h2 className="text-xl font-semibold mb-4">Add Instructor</h2>

//       <form onSubmit={handleSubmit} className="space-y-2 mb-6">
//         <input
//           className="border p-2 w-full"
//           placeholder="Name"
//           name="name"
//           value={form.name}
//           onChange={handleChange}
//         />
//         <input
//           className="border p-2 w-full"
//           placeholder="Email"
//           name="email"
//           type="email"
//           value={form.email}
//           onChange={handleChange}
//         />
//         {formError && <p className="text-red-500 text-sm">{formError}</p>}

//         <button type="submit" className="bg-blue-500 text-white px-4 py-2">
//           Create
//         </button>
//       </form>

//       <h2 className="text-xl font-semibold mb-2">All Instructors</h2>
//       <ul className="space-y-2">
//         {instructors.map((instructor) => (
//           <li key={instructor._id} className="border p-2 rounded">
//             <strong>{instructor.name}</strong> - {instructor.email}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import {
  useGetInstructorsQuery,
  useCreateInstructorMutation,
} from "../../../redux/features/lectureSchedulerApi";

export default function InstructorsPage() {
  const { data: instructors = [], isLoading, error } = useGetInstructorsQuery();
  const [createInstructor] = useCreateInstructorMutation();

  const [form, setForm] = useState({ name: "", email: "" });
  const [formError, setFormError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email) {
      setFormError("Both name and email are required.");
      return;
    }

    try {
      await createInstructor(form).unwrap();
      setForm({ name: "", email: "" });
      setFormError("");
    } catch (err) {
      console.error("Error creating instructor:", err);
      setFormError("Failed to create instructor.");
    }
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-600">Loading instructors...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-red-600">Error loading instructors</p>
      </div>
    );

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
        Instructors Management
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 mb-8 space-y-4"
      >
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Add New Instructor
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Name
          </label>
          <input
            className="w-full border rounded p-2 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Instructor's name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email
          </label>
          <input
            className="w-full border rounded p-2 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Instructor's email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        {formError && <p className="text-red-500 text-sm">{formError}</p>}

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-200"
        >
          Create Instructor
        </button>
      </form>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          All Instructors
        </h2>
        {instructors.length === 0 ? (
          <p className="text-gray-500">No instructors found.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {instructors.map((instructor) => (
              <li key={instructor._id} className="py-3">
                <p className="text-gray-800">
                  <span className="font-semibold text-blue-600">
                    {instructor.name}
                  </span>{" "}
                  — <span className="text-gray-600">{instructor.email}</span>
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
