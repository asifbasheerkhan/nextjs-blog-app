import Link from "next/link";
import React from "react";

const Navbar = () => {

  return (
    <div className="flex justify-between items-center px-6 py-2 gap-2">
      <div className="justify-center">
        <img
          className="rounded-full w-40 h-40 p-10"
          src="../../images/logo.jpeg"
          alt="logo image"
        />
      </div>
      <div className="flex space-x-10 justify-center px-40">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/blog">Blog</Link>
      </div>
    </div>
  );
};

export default Navbar;
