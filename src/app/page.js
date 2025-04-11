import Link from "next/link";

export default function Home() {
  return (
    <div className="p-4 grid items-center justify-center h-screen w-screen">
      <div>
        <h1 className="text-2xl">Welcome to the Lecture Scheduler</h1>
        <div className="flex gap-4 justify-center mt-6">
          <Link
            href={"/admin"}
            className=" hover:border-b-2 hover:bg-gray-400 hover:text-black px-2.5 py-1.5"
          >
            <h2>Admin</h2>
          </Link>
          <Link
            href={"/instructor"}
            className=" hover:border-b-2 hover:bg-gray-400 hover:text-black px-2.5 py-1.5"
          >
            <h2>Instructor</h2>
          </Link>
        </div>
      </div>
    </div>
  );
}
