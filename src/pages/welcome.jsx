import { useState } from "react";
import { Link } from "react-router-dom";
import illustration from "@/shared/assets/welcome-illustration.png";

export const WelcomePage = () => {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <div className="w-full h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 text-indigo-900">
      <div className="flex flex-col md:flex-row h-full w-full">
        {/* Left Text Section */}
        <div className="flex-1 flex flex-col justify-center items-start px-8 md:px-16 py-12 space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Welcome!<br />
            To start, find community<br />
            learn <span className="underline cursor-pointer" onClick={() => setShowAbout(!showAbout)}>about</span> the project.
          </h1>

          {showAbout && (
            <div className="bg-white/90 text-gray-900 p-6 rounded-3xl shadow max-w-lg">
              <p>
                <strong>KIDNECT</strong> is an inclusive matching platform that connects families
                with children who have developmental differences. It promotes
                shared growth and community based on children's strengths and goals.
              </p>
            </div>
          )}

          <div>
            <p className="text-xl mt-6 mb-4">Ready to start?</p>
            <Link
              to="/login"
              className="bg-indigo-600 hover:bg-indigo-800 text-white px-6 py-3 rounded-full font-semibold shadow"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Right Illustration Section */}
        <div className="hidden md:flex flex-1 justify-center items-center px-8 py-12">
          <img
            src={illustration}
            alt="Inclusive illustration"
            className="max-h-[80%] object-contain"
          />
        </div>

        {/* Top-right Login */}
        <div className="absolute top-6 right-6">
          <Link
            to="/login"
            className="text-white bg-indigo-600 hover:bg-indigo-800 rounded-full px-6 py-2 font-medium shadow"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};