import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/components/toast/context";

import bg from "@/shared/assets/background.png";

export const ProfileDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { success } = useToast();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [connecting, setConnecting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${import.meta.env.VITE_API_URL}/profiles/${id}`);
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  function onConnect() {
    setConnecting(true);
    success("Connect request: coming soon!");
    setTimeout(() => setConnecting(false), 800);
  }

  async function handleDelete() {
    const confirmed = window.confirm("Are you sure you want to delete this profile?");
    if (!confirmed) return;

    setDeleting(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/profiles/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete profile");

      success("Profile deleted successfully");
      navigate("/profiles");
    } catch (err) {
      alert(err.message);
    } finally {
      setDeleting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!profile) return null;

  const { child_age, city, strengths, needs, notes } = profile;

  return (
    <div className="w-full h-screen relative py-48">
      <div className="relative z-10 flex flex-col items-center">
        <div className="max-w-[800px] w-full mb-6">
          <h1 className="text-7xl text-white">Child Age: {child_age}</h1>
        </div>

        <div className="max-w-[800px] w-full flex flex-col gap-4 p-8 md:p-18 bg-white rounded-4xl text-xl shadow-xl">
          <div>
            <span className="mb-2 text-base font-semibold">City:</span>
            <p className="text-lg">{city}</p>
          </div>
          <div>
            <span className="mb-2 text-base font-semibold">Strengths:</span>
            <p className="text-lg">{strengths}</p>
          </div>
          <div>
            <span className="mb-2 text-base font-semibold">Needs:</span>
            <p className="text-lg">{needs}</p>
          </div>
          <div>
            <span className="mb-2 text-base font-semibold">Notes:</span>
            <p className="text-lg">{notes}</p>
          </div>

          <div className="pt-6 flex flex-wrap justify-center gap-4">
            <button
              onClick={onConnect}
              disabled={connecting}
              className="px-6 py-2 rounded-full text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 transition"
            >
              {connecting ? "🔗 Connecting…" : "🔗 Connect"}
            </button>

            <button
              onClick={() => window.history.back()}
              className="px-6 py-2 rounded-full border border-black text-black hover:bg-gray-100 transition"
            >
              🔙 Back
            </button>

            <button
              onClick={handleDelete}
              disabled={deleting}
              className="px-6 py-2 rounded-full text-white bg-red-600 hover:bg-red-700 disabled:opacity-60 transition"
            >
              {deleting ? "🗑️ Deleting…" : "🗑️ Delete"}
            </button>
          </div>
        </div>
      </div>

      <img src={bg} alt="" className="absolute inset-0 w-full h-screen object-cover" />
    </div>
  );
};