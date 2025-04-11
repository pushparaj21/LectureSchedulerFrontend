import React from "react";

import Link from "next/link";
export default function Admin() {
  return (
    <div className="p-4 grid items-center justify-center h-screen w-screen">
      <div className=" flex flex-col justify-center">
        <Link
          href={"/admin/courses"}
          className=" hover:border-b-2 hover:bg-gray-400 hover:text-black px-2.5 py-1.5"
        >
          <h2>Course Management</h2>
        </Link>
        <Link
          href={"/admin/instructors"}
          className=" hover:border-b-2 hover:bg-gray-400 hover:text-black px-2.5 py-1.5"
        >
          <h2>Instructors Management</h2>
        </Link>
        <Link
          href={"/admin/lectures"}
          className=" hover:border-b-2 hover:bg-gray-400 hover:text-black px-2.5 py-1.5"
        >
          <h2>Lecture Scheduler</h2>
        </Link>
      </div>
    </div>
  );
}
