import Navbar from "@/components/Navbar";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import login from "../login";

export async function getStaticPaths() {
  // const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  try {
    const response = await axios.get(
      "https://nextjs-blog-app-2.onrender.com/api/posts"
    );
    const posts = await response.data;

    const paths = posts.map((post) => ({
      params: { slug: post.id.toString() },
    }));

    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    console.error("Failed to fetch paths:", error);
    return {
      paths: [],
      fallback: false,
    };
  }
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  // const response = await fetch(
  //   `https://jsonplaceholder.typicode.com/posts/${slug}`
  // );
  try {
    const response = await axios.get(
      `https://nextjs-blog-app-2.onrender.com/api/post/${slug}`
    );
    const post = await response.data;

    return {
      props: {
        post,
      },
    };
  } catch (error) {
    console.error(`Failed to fetch post ${slug}:`, error);
    return {
      props: {
        post: null,
      },
    };
  }
}

const page = ({ post }) => {
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(`/api/comments?postId=${post.id}`);
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      } else {
        console.error("Failed to fetch comments");
      }
    };

    fetchComments();
  }, [post.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      setMessage("Plesae enter a message");
      return;
    }

    const response = await fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: post.id,
        comment,
      }),
    });

    console.log(response);

    if (response.ok) {
      setMessage("Comment submitted successfully!");
      setComment("");
      const newCommentsResponse = await fetch(
        `/api/comments?postId=${post.id}`
      );
      const newCommentsData = await newCommentsResponse.json();
      setComments(newCommentsData);
    } else {
      setMessage("Failed to submit the comment.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen flex justify-center items-start pt-16 pb-4">
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg w-full h-full overflow-y-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            <i>Title:</i> {post.title}
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            <i>
              <strong>Body:</strong>
            </i>
            <br />
            {post.body}
          </p>

          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Leave a Comment
            </h2>
            <form onSubmit={handleSubmit}>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write your comment here"
              />
              <br />
              <button
                type="submit"
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Submit Comment
              </button>
            </form>

            {message && <p className="mt-4 text-gray-600">{message}</p>}

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-800">Comments</h3>
              <div className="max-h-96 overflow-y-auto mt-4 space-y-4">
                {comments.length === 0 ? (
                  <p className="text-gray-500">No comments yet.</p>
                ) : (
                  <ul>
                    {comments.map((comment) => (
                      <li
                        key={comment.id}
                        className="p-4 border border-gray-200 rounded-md bg-gray-50"
                      >
                        <p className="text-gray-700">{comment.comment}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

};

export default page;
