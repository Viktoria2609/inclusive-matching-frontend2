export default function AiControls({
  ageFilter, setAgeFilter,
  cityFilter, setCityFilter,
  selectedId, setSelectedId,
  mode, setMode,
  sameCity, setSameCity,
  topK, setTopK,
  maxCandidates, setMaxCandidates,
  aiLoading, aiError,
  onFindAI,
  profiles
}) {
  return (
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
  );
}