import { useEffect, useState } from "react";

import { ProfileForm } from "@/components/profiles/form";
import { ProfileList } from "@/components/profiles/list";

import { mockProfiles } from "@/shared/constants";
import bg from "@/shared/assets/background.png";

export const MainPage = () => {
  const [profiles, setProfiles] = useState(mockProfiles);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await fetch("/profiles");
        if (!res.ok) throw new Error("Failed to fetch profiles");
        const data = await res.json();
        setProfiles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (!profiles?.length) {
      fetchProfiles();
    }
  }, [profiles]);

  return (
    <div className="w-full">
      <div className="w-full h-screen relative">
        <div className="absolute z-10 w-full h-screen flex items-center">
          <div className="w-full md:w-[60%] h-full md:bg-white/80 flex items-center justify-center">
            <ProfileForm />
          </div>
          <div className="w-[40%] h-full hidden md:flex items-center justify-center">
            <div className="flex flex-col items-start">
              <span className="text-white text-7xl text-center">Inclusive</span>
              <span className="text-white text-7xl text-center">Matching.</span>
            </div>
          </div>
        </div>
        <img src={bg} className="w-full h-screen" />
        <div className="absolute bottom-0 left-0 right-0 w-full h-64 bg-gradient-to-b from-transparent to-white"></div>
      </div>
      <div className="max-w-[1200px] py-48 mx-auto">
        <ProfileList loading={loading} error={error} profiles={profiles} />
      </div>
    </div>
  );
};
