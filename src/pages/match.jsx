import { useEffect, useMemo, useState } from "react";
import { ProfileList } from "@/components/profiles/list";
import { API_BASE, fetchJSON } from "@/lib/api";
import FiltersModal from "@/components/match/FiltersModal";
import AiModal from "@/components/match/AiModal";
import bg from "@/shared/assets/background.png";

export const MatchPage = () => {
  const [profiles, setProfiles] = useState([]);
  const [loadingProfiles, setLoadingProfiles] = useState(false);
  const [profilesError, setProfilesError] = useState(null);

  // filters
  const [ageFilter, setAgeFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");

  // ai controls
  const [selectedId, setSelectedId] = useState(null);
  const [mode, setMode] = useState("complementarity");
  const [topK, setTopK] = useState(3);
  const [sameCity, setSameCity] = useState(true);
  const [maxCandidates, setMaxCandidates] = useState(50);

  // ai data
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState(null);
  const [aiData, setAiData] = useState(null);

  // modals
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoadingProfiles(true);
        setProfilesError(null);
        const data = await fetchJSON(`${API_BASE}/profiles/`);
        setProfiles(data);
        if (data.length && !selectedId) setSelectedId(data[0].id);
      } catch (err) {
        setProfilesError(err.message || String(err));
      } finally {
        setLoadingProfiles(false);
      }
    })();
  }, []);

  const filteredProfiles = useMemo(() => {
    const ageVal = ageFilter ? parseInt(ageFilter, 10) : null;
    const cityVal = cityFilter.trim().toLowerCase();
    return profiles.filter((p) => {
      const okAge = ageVal === null || p.child_age === ageVal;
      const okCity = !cityVal || (p.city || "").toLowerCase().includes(cityVal);
      return okAge && okCity;
    });
  }, [profiles, ageFilter, cityFilter]);

  async function onFindAI() {
    try {
      setAiError(null);
      setAiLoading(true);
      if (!selectedId) throw new Error("Select your profile first");
      const url = new URL(`${API_BASE}/ai/match`);
      url.searchParams.set("target_id", String(selectedId));
      url.searchParams.set("mode", mode);
      url.searchParams.set("top_k", String(topK));
      url.searchParams.set("same_city", String(sameCity));
      url.searchParams.set("max_candidates", String(maxCandidates));
      url.searchParams.set("language", "en");
      const data = await fetchJSON(url.toString(), { method: "POST" });
      setAiData(data);
    } catch (e) {
      setAiError(e.message || String(e));
      setAiData(null);
    } finally {
      setAiLoading(false);
    }
  }

  return (
    <div className="w-full">
      <img src={bg} className="w-full h-screen fixed inset-0 object-cover" alt="Background" />
      <div className="relative z-10">
        <div className="max-w-[1300px] mx-auto px-6 md:px-10 py-10">

          {/* Toolbar with actions */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <button
              onClick={() => setFiltersOpen(true)}
              className="px-4 py-2 rounded-2xl border bg-white/80 hover:bg-white"
            >
              Filters
            </button>
            <button
              onClick={() => setAiOpen(true)}
              className="px-4 py-2 rounded-2xl bg-indigo-600 text-white hover:bg-indigo-700"
            >
              AI recommendations
            </button>
            {aiData && (
              <span className="text-sm text-gray-600">
                Last run: {aiData.results.length} result(s), mode: {aiData.mode}
              </span>
            )}
          </div>

          {/* Profiles block */}
          <section className="bg-white/90 rounded-3xl border shadow p-4 md:p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">All profiles</h2>
              {loadingProfiles && <span className="text-sm text-gray-500">Loading…</span>}
              {profilesError && <span className="text-sm text-red-600">{profilesError}</span>}
            </div>
            <ProfileList loading={loadingProfiles} error={profilesError} profiles={filteredProfiles} />
          </section>
        </div>
      </div>

      {/* Modals */}
      <FiltersModal
        isOpen={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        ageFilter={ageFilter} setAgeFilter={setAgeFilter}
        cityFilter={cityFilter} setCityFilter={setCityFilter}
      />
      <AiModal
        isOpen={aiOpen}
        onClose={() => setAiOpen(false)}
        profiles={profiles}
        selectedId={selectedId} setSelectedId={setSelectedId}
        mode={mode} setMode={setMode}
        sameCity={sameCity} setSameCity={setSameCity}
        topK={topK} setTopK={setTopK}
        maxCandidates={maxCandidates} setMaxCandidates={setMaxCandidates}
        aiLoading={aiLoading} aiError={aiError} aiData={aiData}
        onFindAI={onFindAI}
      />
    </div>
  );
};