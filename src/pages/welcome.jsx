import { useState } from "react";
import { Link } from "react-router-dom";

import illustration from "@/shared/assets/welcome-illustration5.png";
import { useAuth } from "@/hooks/AuthContext";
import { routes } from "../shared/routes";

export const WelcomePage = () => {
  const [showAbout, setShowAbout] = useState(false);
  const [dropDown, setDropDown] = useState(false);

  const { user, logout } = useAuth();

  return (
    <div
      className="w-full h-screen bg-cover bg-no-repeat bg-[position:right_bottom] text-indigo-900"
      style={{
        backgroundImage: `url(${illustration})`,
      }}
    >
      <div className="absolute top-6 left-6 z-10">
        <h1 className="text-2xl monument-font font-bold tracking-wide">
          KIDNECT
        </h1>
      </div>

      <div className="absolute top-6 right-6 z-10 space-x-4 flex items-center">
        <Link
          to="/profiles"
          className="text-indigo-900 bg-white hover:bg-gray-200 rounded-full px-5 py-2 font-medium shadow"
        >
          See All Profiles
        </Link>
        {!user ? (
          <Link
            to="/login"
            className="text-white bg-indigo-600 hover:bg-indigo-800 rounded-full px-5 py-2 font-medium shadow"
          >
            Login
          </Link>
        ) : (
          <div className="relative">
            <button
              onClick={() => setDropDown(!dropDown)}
              className="text-white bg-indigo-600 hover:bg-indigo-800 rounded-full px-5 py-2 font-medium shadow flex items-center"
              type="button"
            >
              <span>{user.user_metadata.name}</span>
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            {dropDown && (
              <div className="absolute top-12 right-0 min-w-44 w-full z-50 bg-white rounded-lg shadow-sm">
                <ul className="py-2 text-base text-black">
                  <li>
                    <Link
                      to={routes.createProfile}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Create profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={routes.match}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Find match
                    </Link>
                  </li>
                  <li>
                    <button
                      className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                      onClick={logout}
                    >
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex h-full w-full">
        <div className="flex flex-col justify-start items-start w-full px-6 md:px-12">
          <div className="w-full max-w-4xl mt-24 md:mt-28 lg:mt-32">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-left ml-8">
              Welcome!
            </h1>

            <p className="mt-4 md:mt-6 text-3xl md:text-5xl font-extrabold leading-tight tracking-tight text-left">
              To{" "}
              <Link
                to="/signup"
                className="underline font-semibold hover:text-indigo-500"
              >
                start
              </Link>
              , find community — {" "}
                <span className="whitespace-nowrap ml-8">
                learn{" "}
                <button
                  onClick={() => setShowAbout(!showAbout)}
                  className="underline font-semibold hover:text-indigo-500"
                >
                  about
                </button>{" "}
                the project !
              </span>
            </p>

            {showAbout && (
              <div className="mt-6 md:mt-8 bg-purple-500/15 text-gray-900 py-10 px-6 rounded-3xl shadow max-w-xl">
                <p>
                  <strong>KIDNECT</strong> is a warm, inclusive space for
                  children of all ages and abilities. Here, families can find a
                  community that shares their child’s strengths, supports their
                  goals, and celebrates their uniqueness. Whether you're
                  looking for peers who just <em>get it</em> or seeking to grow
                  something new — KIDNECT helps you connect, belong, and thrive
                  together.
                  We keep kids’ <strong>privacy</strong>, and let guardians 
                  decide the way to connect. 
                  AI recommends matches based on your child’s needs! 
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};