import React from "react";
import Navbar from "@/components/Navbar";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-4xl w-full bg-white shadow-xl rounded-xl overflow-hidden md:flex">
          <div className="md:w-1/2">
            <img
              src="https://img.freepik.com/free-photo/technology-communication-icons-symbols-concept_53876-120314.jpg?t=st=1746559068~exp=1746562668~hmac=cbdf3b0522016f33d44370c223f02ab12f457cd69b811f411d6496e5b2bc4333&w=826"
              alt="Team"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="md:w-1/2 p-8 flex flex-col justify-center">
            <h1 className="text-4xl font-extrabold text-blue-600 mb-4">
              About Me
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Hi, I'm <strong>Asif Basheer Khan</strong>, a passionate software developer with over 2 years of experience in the tech industry. Currently working in Ksolves India Limited I specialize in creating innovative and user-friendly solutions that solve real-world problems.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Currently, I'm diving deep into <i>Next.js</i>and <i>FastAPI</i>, exploring new and exciting technologies. I'm constantly learning and growing, always looking for the next big challenge to tackle.
            </p>

            <div className="flex flex-col space-y-2">
              <p className="text-lg text-gray-700 font-semibold">My Vision:</p>
              <p className="text-gray-600">
                To continuously grow as a developer, push the boundaries of technology, and build applications that help improve lives and drive innovation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
