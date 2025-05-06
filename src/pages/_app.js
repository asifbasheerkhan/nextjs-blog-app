import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { jwtDecode } from "jwt-decode";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
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
    if (loading) return;

    const currentPath = router.pathname;

    if (!isAuthenticated && currentPath !== "/login") {
      router.push("/login");
    } else if (isAuthenticated && currentPath === "/login") {
      router.replace("/");
    }
  }, [isAuthenticated, loading, router.pathname]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      {/* {isAuthenticated && <Navbar />} */}
      <Component {...pageProps} />
    </>
  );
}
