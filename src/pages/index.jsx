import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";
import Navbar from "@/components/Navbar";

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState("");
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserEmail(decodedToken.email);
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      const currentPath = router.pathname;

      if (isAuthenticated && currentPath !== "/") {
        router.push("/");
      } else if (!isAuthenticated && currentPath !== "/login") {
        router.push("/login");
      }
    }
  }, [isAuthenticated, loading, router]);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch("https://picsum.photos/800/400?random");
        setImageUrl(response.url);
        setImageLoading(false);
      } catch (error) {
        console.error("Error fetching image:", error);
        setImageLoading(false);
      }
    };

    fetchImage();
  }, []);

  if (loading) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-teal-400 to-emerald-500 p-6">
        <div className="text-center mb-12 max-w-4xl">
          <h1 className="text-4xl sm:text-5xl font-semibold text-white leading-tight">
            Welcome to the Blog Website
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-100">
            Discover random images and blogs, all in one place!
          </p>
        </div>

        <div className="flex justify-center w-full mb-12">
          {imageLoading ? (
            <div className="text-white text-lg text-6xl">⏳⏳⏳⏳⏳</div>
          ) : (
            <img
              src={imageUrl}
              alt="Random Blog Image"
              className="w-full max-w-4xl h-64 object-cover rounded-lg shadow-xl transition-transform duration-500 hover:scale-105"
            />
          )}
        </div>

        {isAuthenticated && userEmail && (
          <div className="mt-8 bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
            <p className="text-xl font-semibold text-gray-800">Logged in as:</p>
            <p className="mt-2 text-lg text-blue-600">{userEmail}</p>
          </div>
        )}
      </div>
    </>
  );
}
