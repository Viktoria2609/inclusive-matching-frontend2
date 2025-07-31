import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";

import { ProfileList } from "@/components/profiles/list";
import bg from "@/shared/assets/background.png";

export const MainPage = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${import.meta.env.VITE_API_URL}/profiles`);
        if (!res.ok) throw new Error("Failed to fetch profiles");
        const data = await res.json();
        setProfiles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [location.pathname]);

  return (
    <div className="w-full">
      <div className="w-full h-screen relative">
        <div className="absolute z-10 w-full h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col items-center">
              <span className="text-white text-7xl text-center">Inclusive</span>
              <span className="text-white text-7xl text-center">Matching.</span>
            </div>
            <Link
              to="/create-profile"
              className="px-6 py-4 text-xl rounded-4xl bg-white text-indigo-700 hover:bg-indigo-100 font-semibold shadow-lg"
            >
              + Create New Profile
            </Link>
          </div>
        </div>
        <img src={bg} className="w-full h-screen object-cover" alt="Background" />
        <div className="absolute bottom-0 left-0 right-0 w-full h-64 bg-gradient-to-b from-transparent to-white" />
      </div>

      <div className="max-w-[1200px] py-48 mx-auto px-4">
        <ProfileList loading={loading} error={error} profiles={profiles} />
      </div>
    </div>
  );
};