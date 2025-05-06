import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";

export async function getStaticProps() {
  // const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const response = await axios.get("https://nextjs-blog-app-2.onrender.com/api/posts");
  const posts = await response.data;
  return {
    props: {
      posts,
    },
  };
}

const blog = ({ posts }) => {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }
  }, [router]);

  if (!posts) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Blogs</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden border"
            >
              <div className="relative h-48 bg-gray-200">
                <Image
                  src={`https://picsum.photos/200/200?random=${post.id}`}
                  alt="Blog Post"
                  width={200}
                  height={200}
                  className="w-full h-full"
                  loading="lazy"
                />
              </div>

              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {post.title}
                </h2>
                <p className="text-gray-600 text-sm mt-2">
                  {post.body.slice(0, 100)}...
                </p>
                <Link
                  href={`/blog/${post.id}`}
                  className="inline-block mt-4 text-blue-600 hover:text-blue-800"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default blog;
