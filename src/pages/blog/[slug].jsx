import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export async function getStaticPaths() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  // const response = await axios.get("http://localhost:8000/api/posts");
  const posts = await response.json();

  const paths = posts.map((post) => ({
    params: { slug: post.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${slug}`
  );

  // const response = await axios.get(`http://localhost:8000/api/post/${slug}`);
  const post = await response.json();

  return {
    props: {
      post,
    },
  };
}

const page = ({ post }) => {
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(`/api/comments?postId=${post.id}`);
      if (response.ok) {
        const data = await response.json();
        console.log(data);

        setComments(data);
      } else {
        console.error('Failed to fetch comments');
      }
    };

    fetchComments();
  }, [post.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!comment.trim()) {
      setMessage('Plesae enter a message');
      return;
    }

    const response = await fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        postId: post.id,
        comment,
      }),
    });

    if (response.ok) {
      setMessage("Comment submitted successfully!");
      setComment('');
      const newCommentsResponse = await fetch(`/api/comments?postId=${post.id}`);
      const newCommentsData = await newCommentsResponse.json();
      setComments(newCommentsData);
    } else {
      setMessage("Failed to submit the comment.");
    }


  }
  return (
    <div className="bg-gray-500 h-screen flex justify-center items-center  pb-100">
      <div className="max-w-3xl mx-auto p-6 bg-gray-100 shadow-md rounded-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          <i>Title:</i> {post.title}
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          <i>
            <strong>Body:</strong>
          </i>{" "}
          <br />
          {post.body}
        </p>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Leave a Comment
          </h2>
          <form onSubmit={handleSubmit}>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="4"
              cols="50"
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Write your comment here"
            />
            <br />
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Submit Comment
            </button>
          </form>

          {message && <p className="mt-4 text-gray-700">{message}</p>}

          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-gray-700">Comments</h3>
            {comments.length === 0 ? (
              <p>No comments yet.</p>
            ) : (
              <ul className="space-y-4">
                {comments.map((comment) => (
                  <li key={comment.id} className="p-4 border border-gray-300 rounded-md">
                    <p>{comment.comment}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
