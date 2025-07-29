import { useEffect, useState } from "react";

import { ProfileList } from "@/components/profiles/list";

import { mockProfiles } from "@/shared/constants";
import bg from "@/shared/assets/background.png";

export const MatchPage = () => {
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
      <img src={bg} className="w-full h-screen fixed inset-0" />
      <div className="relative z-10">
        <div className="max-w-[1300px] p-18 my-48 mx-auto rounded-4xl bg-white/80 border">
          <ProfileList loading={loading} error={error} profiles={profiles} />
        </div>
      </div>
    </div>
  );
};
