import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const lectureSchedulerApi = createApi({
  reducerPath: "lectureSchedulerApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/api" }),
  tagTypes: ["Courses", "Instructors", "Lectures", "LecturesbyId"],
  endpoints: (builder) => ({
    // 📘 COURSES
    getCourses: builder.query({
      query: () => "/courses",
      providesTags: ["Courses"],
    }),
    createCourse: builder.mutation({
      query: (newCourse) => ({
        url: "/courses",
        method: "POST",
        body: newCourse,
      }),
      invalidatesTags: ["Courses"],
    }),

    getInstructors: builder.query({
      query: () => "/instructors",
      providesTags: ["Instructors"],
    }),
    getInstructorByEmail: builder.query({
      query: (email) => `/instructors/email/${email}`,
    }),

    createInstructor: builder.mutation({
      query: (instructorData) => ({
        url: "/instructors",
        method: "POST",
        body: instructorData,
      }),
      invalidatesTags: ["Instructors"],
    }),

    getLectures: builder.query({
      query: () => "/lectures",
      providesTags: ["Lectures"],
    }),
    createLecture: builder.mutation({
      query: (lectureData) => ({
        url: "/lectures",
        method: "POST",
        body: lectureData,
      }),
      invalidatesTags: ["Lectures"],
    }),
    getInstructorLectures: builder.query({
      query: (instructorId) => `/lectures/${instructorId}`,
      providesTags: ["LecturesbyId"],
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useCreateCourseMutation,
  useGetInstructorsQuery,
  useCreateInstructorMutation,
  useGetLecturesQuery,
  useCreateLectureMutation,
  useGetInstructorLecturesQuery,
  useLazyGetInstructorByEmailQuery,
} = lectureSchedulerApi;
