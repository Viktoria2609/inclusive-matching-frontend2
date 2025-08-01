import { useState } from "react";
import { Link } from "react-router";
import bg from "@/shared/assets/background.png";

export const WelcomePage = () => {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <div className="w-full h-screen relative text-white">
      {/* Background */}
      <img
        src={bg}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Top-right login */}
      <div className="absolute top-4 right-6 z-10">
        <Link
          to="/login"
          className="text-white bg-indigo-600 hover:bg-indigo-800 rounded-4xl px-6 py-3 font-medium"
        >
          Login
        </Link>
      </div>

      {/* Centered content */}
      <div className="z-10 relative w-full h-full flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-7xl font-bold mb-8">KIDNECT</h1>

        <p className="text-xl max-w-xl">
          To start, find community, learn{" "}
          <button
            onClick={() => setShowAbout(!showAbout)}
            className="underline font-semibold hover:text-indigo-300 transition"
          >
            about
          </button>{" "}
          the project.
        </p>

        {/* Expandable About section */}
        {showAbout && (
          <div className="mt-6 max-w-2xl text-lg bg-white/80 text-gray-800 p-6 rounded-4xl shadow">
            <p>
              KIDNECT is an inclusive matching platform that connects families
              with children who have developmental differences. It promotes
              shared growth and community based on children's strengths and goals.
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-10 flex flex-col items-center">
          <p className="text-2xl mb-4">Ready to start?</p>
          <Link
            to="/login"
            className="bg-indigo-600 hover:bg-indigo-800 text-white rounded-4xl px-8 py-4 text-lg font-medium transition"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};