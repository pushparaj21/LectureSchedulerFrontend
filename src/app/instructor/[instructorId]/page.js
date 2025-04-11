"use client";
import Home from "@/app/components/home";
import {
  useGetCoursesQuery,
  useGetInstructorsQuery,
  useGetInstructorLecturesQuery,
} from "../../../redux/features/lectureSchedulerApi";

export default function InstructorDashboard({ params }) {
  const { instructorId } = params;

  const { data: lectures = [], isLoading: loadingLectures } =
    useGetInstructorLecturesQuery(instructorId);

  const { data: courses = [], isLoading: loadingCourses } =
    useGetCoursesQuery();
  const { data: instructors = [] } = useGetInstructorsQuery();

  const instructor = instructors.find((i) => i._id === instructorId);

  if (loadingLectures || loadingCourses) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-600">Loading lectures...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl flex font-bold text-center mb-8 text-blue-600">
        <div className="mr-3">
          <Home />
        </div>

        {instructor?.name
          ? `${instructor.name}'s Schedule`
          : "Instructor Dashboard"}
      </h1>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Upcoming Lectures
        </h2>

        {lectures.length === 0 ? (
          <p className="text-gray-500">No lectures scheduled yet.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {lectures.map((lecture) => (
              <li key={lecture._id} className="py-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <div>
                    <p className="text-gray-800 font-medium">
                      Course: {lecture.course?.name || "N/A"}
                    </p>
                    <p className="text-sm text-gray-600">
                      Date:{" "}
                      <span className="text-blue-600 font-semibold">
                        {new Date(lecture.date).toLocaleDateString("en-GB")}
                      </span>
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
