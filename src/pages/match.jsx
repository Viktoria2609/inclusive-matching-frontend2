import { useEffect, useState } from "react";
import { ProfileList } from "@/components/profiles/list";
import bg from "@/shared/assets/background.png";

export const MatchPage = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [ageFilter, setAgeFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");

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
  }, []);


  const filteredProfiles = profiles.filter((profile) => {
    const matchesAge =
      ageFilter === "" || profile.child_age === parseInt(ageFilter, 10);
    const matchesCity =
      cityFilter === "" ||
      profile.city.toLowerCase().includes(cityFilter.toLowerCase());
    return matchesAge && matchesCity;
  });

  return (
    <div className="w-full">
      <img src={bg} className="w-full h-screen fixed inset-0" alt="Background" />
      <div className="relative z-10">
        <div className="max-w-[1300px] p-18 my-48 mx-auto rounded-4xl bg-white/80 border">
        
          <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            <div>
              <label htmlFor="age" className="block font-medium mb-1">
                Filter by Age
              </label>
              <input
                id="age"
                type="number"
                min={0}
                value={ageFilter}
                onChange={(e) => setAgeFilter(e.target.value)}
                className="p-2 border rounded-lg w-48"
              />
            </div>
            <div>
              <label htmlFor="city" className="block font-medium mb-1">
                Filter by City
              </label>
              <input
                id="city"
                type="text"
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="p-2 border rounded-lg w-48"
              />
            </div>
          </div>

          <ProfileList
            loading={loading}
            error={error}
            profiles={filteredProfiles}
          />
        </div>
      </div>
    </div>
  );
};