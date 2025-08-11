import { useEffect } from "react";
import Modal from "@/components/ui/Modal";
import AiRecommendations from "./AiRecommendations";

export default function AiModal({
  isOpen, onClose,
  profiles,
  selectedId, setSelectedId,
  mode, setMode,
  sameCity, setSameCity,
  topK, setTopK,
  maxCandidates, setMaxCandidates,
  aiLoading, aiError, aiData,
  onFindAI,
}) {

  useEffect(() => {
    if (isOpen && !aiLoading && !aiData && selectedId) onFindAI();
    
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="AI matching" width="max-w-4xl">
      <div className="grid gap-5 md:grid-cols-[280px_minmax(0,1fr)]">
        {/* Controls */}
        <div className="rounded-2xl border p-3">
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
                type="number" min={1} max={20}
                value={topK}
                onChange={(e) => setTopK(Number(e.target.value))}
                className="mt-1 w-full p-2 border rounded-xl"
              />
            </label>
            <label className="block">
              <span className="text-xs text-gray-600">Max candidates</span>
              <input
                type="number" min={1} max={200}
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
        </div>

        <div className="min-h-[200px]">
          {aiData ? (
            <AiRecommendations aiData={aiData} profiles={profiles} />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500 text-sm">
              Run a search to see recommendations here.
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}