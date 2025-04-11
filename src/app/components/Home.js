import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <Link href={"/"} className="underline hover:bg-gray-400">
      Home
    </Link>
  );
}
