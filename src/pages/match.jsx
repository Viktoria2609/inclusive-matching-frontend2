import { useEffect, useMemo, useState } from "react";
import { ProfileList } from "@/components/profiles/list";
import bg from "@/shared/assets/background.png";

const API_BASE = import.meta.env.VITE_API_URL || window.location.origin;

export const MatchPage = () => {
  const [profiles, setProfiles] = useState([]);
  const [loadingProfiles, setLoadingProfiles] = useState(false);
  const [profilesError, setProfilesError] = useState(null);

  const [ageFilter, setAgeFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");

  const [selectedId, setSelectedId] = useState(null);
  const [mode, setMode] = useState("complementarity"); 
  const [topK, setTopK] = useState(3);
  const [sameCity, setSameCity] = useState(true);
  const [maxCandidates, setMaxCandidates] = useState(50);

  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState(null);
  const [aiData, setAiData] = useState(null); 


  useEffect(() => {
    (async () => {
      try {
        setLoadingProfiles(true);
        setProfilesError(null);

        const res = await fetch(`${API_BASE}/profiles/`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
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

 
  const recommended = useMemo(() => {
    if (!aiData) return [];
    const byId = new Map(profiles.map((p) => [p.id, p]));
    return aiData.results.map((r) => ({
      item: r,
      profile: byId.get(r.candidate_id) || null,
    }));
  }, [aiData, profiles]);

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

      const res = await fetch(url.toString(), { method: "POST" });
      if (!res.ok) {
        let detail = `HTTP ${res.status}`;
        try { const j = await res.json(); if (j?.detail) detail = j.detail; } catch {}
        throw new Error(detail);
      }
      setAiData(await res.json());
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
          <div className="grid grid-cols-1 md:grid-cols-[320px_minmax(0,1fr)] gap-6">

            
            <aside className="bg-white/85 backdrop-blur rounded-3xl border shadow p-4 md:p-5 h-fit sticky top-6">
              <h2 className="text-lg font-semibold mb-3">Filters</h2>

              <div className="space-y-3">
                <label className="block">
                  <span className="text-sm text-gray-600">Filter by age</span>
                  <input
                    type="number"
                    min={0}
                    value={ageFilter}
                    onChange={(e) => setAgeFilter(e.target.value)}
                    className="mt-1 w-full p-2 border rounded-xl"
                    placeholder="Exact age"
                  />
                </label>

                <label className="block">
                  <span className="text-sm text-gray-600">Filter by city</span>
                  <input
                    type="text"
                    value={cityFilter}
                    onChange={(e) => setCityFilter(e.target.value)}
                    className="mt-1 w-full p-2 border rounded-xl"
                    placeholder="e.g. Seattle"
                  />
                </label>

                <div className="flex gap-2">
                  <button
                    onClick={() => { setAgeFilter(""); setCityFilter(""); }}
                    className="flex-1 px-3 py-2 rounded-xl border hover:bg-gray-50 text-sm"
                  >
                    Reset
                  </button>
                </div>
              </div>

              <div className="h-px bg-gray-200 my-5" />

              <h3 className="text-lg font-semibold mb-3">AI matching</h3>

              <label className="block mb-3">
                <span className="text-sm text-gray-600">Your profile</span>
                <select
                  className="mt-1 w-full rounded-xl border p-2"
                  value={selectedId ?? ""}
                  onChange={(e) => setSelectedId(Number(e.target.value))}
                >
                  {profiles.map((p) => (
                    <option key={p.id} value={p.id}>
                      #{p.id} · age {p.child_age} · {p.city}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block mb-3">
                <span className="text-sm text-gray-600">Mode</span>
                <select
                  className="mt-1 w-full rounded-xl border p-2"
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                >
                  <option value="complementarity">Complementarity</option>
                  <option value="similarity">Similarity</option>
                  <option value="goal_alignment">Goal alignment</option>
                </select>
              </label>

              <label className="flex items-center gap-2 mb-3">
                <input
                  type="checkbox"
                  className="size-4"
                  checked={sameCity}
                  onChange={(e) => setSameCity(e.target.checked)}
                />
                <span className="text-sm">Same city only</span>
              </label>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <label className="block">
                  <span className="text-xs text-gray-600">Top K</span>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={topK}
                    onChange={(e) => setTopK(Number(e.target.value))}
                    className="mt-1 w-full p-2 border rounded-xl"
                  />
                </label>
                <label className="block">
                  <span className="text-xs text-gray-600">Max candidates</span>
                  <input
                    type="number"
                    min={1}
                    max={200}
                    value={maxCandidates}
                    onChange={(e) => setMaxCandidates(Number(e.target.value))}
                    className="mt-1 w-full p-2 border rounded-xl"
                  />
                </label>
              </div>

              <button
                onClick={onFindAI}
                disabled={aiLoading || !selectedId}
                className="w-full px-4 py-2 rounded-2xl bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60"
              >
                {aiLoading ? "Searching…" : "Find matches (AI)"}
              </button>

              {aiError && (
                <div className="mt-3 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                  {aiError}
                </div>
              )}
            </aside>

            
            <main className="space-y-6">
            
              {aiData && (
                <section className="bg-white/90 rounded-3xl border shadow p-4 md:p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-semibold">
                      AI recommendations · {aiData.results.length}
                    </h2>
                    <span className="text-sm text-gray-500">mode: {aiData.mode}</span>
                  </div>

                  {recommended.length === 0 ? (
                    <div className="text-sm text-gray-600">
                      No matching profiles found in local list.
                    </div>
                  ) : (
                    <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {recommended.map(({ item, profile }) => (
                        <li key={item.candidate_id} className="rounded-2xl border bg-white p-4 shadow-sm">
                          <div className="flex items-center justify-between">
                            <div className="font-medium">
                              {profile ? (
                                <>
                                  #{profile.id} · age {profile.child_age}
                                  <span className="text-gray-500"> · {profile.city}</span>
                                </>
                              ) : (
                                <>Candidate #{item.candidate_id}</>
                              )}
                            </div>
                            <div className="text-xs px-2 py-1 rounded-full border">
                              Score {item.overall_score}/100
                            </div>
                          </div>

                          {item.rationale && (
                            <p className="mt-2 text-sm text-gray-800">{item.rationale}</p>
                          )}

                          
                          {item.shared_strengths?.length > 0 && (
                            <div className="mt-3">
                              <div className="text-xs uppercase tracking-wide text-gray-500">
                                Shared strengths
                              </div>
                              <div className="mt-1 flex flex-wrap gap-1.5">
                                {item.shared_strengths.map((s, i) => (
                                  <span
                                    key={i}
                                    className="px-2 py-1 text-xs rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200"
                                  >
                                    {s}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          
                          {item.complementary_pairs?.length > 0 && (
                            <div className="mt-3">
                              <div className="text-xs uppercase tracking-wide text-gray-500">
                                Complementary pairs
                              </div>
                              <ul className="mt-1 space-y-1.5">
                                {item.complementary_pairs.map((cp, idx) => (
                                  <li key={idx} className="text-sm flex flex-wrap items-center gap-1.5">
                                    <span
                                      className={`px-1.5 py-0.5 text-xs rounded-full border ${
                                        cp.from === "target"
                                          ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                                          : "bg-amber-50 text-amber-700 border-amber-200"
                                      }`}
                                      title={cp.from === "target" ? "from your child" : "from candidate"}
                                    >
                                      {cp.from}
                                    </span>
                                    <span className="px-2 py-0.5 text-xs rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                                      {cp.strength}
                                    </span>
                                    <span className="text-gray-500">covers</span>
                                    <span className="px-2 py-0.5 text-xs rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                                      {cp.covers_need}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {item.suggested_first_message && (
                            <div className="mt-3 p-3 rounded-xl bg-gray-50 border text-sm">
                              <div className="text-gray-500 mb-1">Suggested message:</div>
                              <div className="whitespace-pre-wrap">{item.suggested_first_message}</div>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              )}

              
              <section className="bg-white/90 rounded-3xl border shadow p-4 md:p-5">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-semibold">All profiles</h2>
                  {loadingProfiles && <span className="text-sm text-gray-500">Loading…</span>}
                </div>
                <ProfileList
                  loading={loadingProfiles}
                  error={profilesError}
                  profiles={filteredProfiles}
                />
              </section>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};