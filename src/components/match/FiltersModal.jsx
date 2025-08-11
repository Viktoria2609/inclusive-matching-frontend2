import Modal from "@/components/ui/Modal";

export default function FiltersModal({
  isOpen, onClose,
  ageFilter, setAgeFilter,
  cityFilter, setCityFilter,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Profile filters" width="max-w-md">
      <div className="space-y-4">
        <label className="block">
          <span className="text-sm text-gray-600">Filter by age</span>
          <input
            type="number" min={0}
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
          <button onClick={onClose} className="flex-1 px-3 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 text-sm">
            Apply
          </button>
        </div>
      </div>
    </Modal>
  );
}