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

        <div className="max-w-[800px] w-full h-auto flex flex-col gap-4 p-8 md:p-18 bg-white rounded-4xl text-xl">
          <div>
            <span className="mb-2 text-base">City:</span>
            <p>{city}</p>
          </div>
          <div>
            <span className="mb-2 text-base">Strengths:</span>
            <p>{strengths}</p>
          </div>
          <div>
            <span className="mb-2 text-base">Needs:</span>
            <p>{needs}</p>
          </div>
          <div>
            <span className="mb-2 text-base">Notes:</span>
            <p>{notes}</p>
          </div>

          <div className="pt-4 flex gap-3 flex-wrap">
            <button
              onClick={onConnect}
              disabled={connecting}
              className="px-5 py-2 rounded-2xl bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60"
            >
              {connecting ? "Connecting…" : "Connect"}
            </button>

            <button
              onClick={() => window.history.back()}
              className="px-5 py-2 rounded-2xl border hover:bg-gray-50"
            >
              Back
            </button>

            <button
              onClick={handleDelete}
              disabled={deleting}
              className="px-5 py-2 rounded-2xl bg-red-600 text-white hover:bg-red-700 disabled:opacity-60"
            >
              {deleting ? "Deleting…" : "Delete"}
            </button>
          </div>
        </div>
      </div>

      <img src={bg} alt="" className="absolute inset-0 w-full h-screen" />
    </div>
  );
};