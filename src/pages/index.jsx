import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);

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
      if (isAuthenticated) {
        router.push("/");
      } else {
        router.push("/login");
      }
    }
  }, [isAuthenticated, loading, router]);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch("https://picsum.photos/200/200?random");
        const url = response.url;
        setImageUrl(url);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };
    fetchImage();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-emerald-100 p-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold">Welcome to the Blog Website</h1>
        <p className="mt-2 text-lg">
          Here's a random image fetched from <b>picsum.photos</b>.
        </p>
      </div>

      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Random Blog Image"
          className="w-full h-64 object-cover rounded-lg shadow-md"
        />
      ) : (
        <p>Loading image...</p>
      )}

      {isAuthenticated && userEmail && (
        <div className="mt-6">
          <p className="text-xl">Logged in as: {userEmail}</p>
        </div>
      )}
    </div>
  );
}
