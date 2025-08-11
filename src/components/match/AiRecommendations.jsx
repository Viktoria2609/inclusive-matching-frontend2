import AiCard from "./AiCard";

export default function AiRecommendations({ aiData, profiles }) {
  if (!aiData) return null;

  const byId = new Map(profiles.map((p) => [p.id, p]));
  const recommended = aiData.results.map((r) => ({
    item: r,
    profile: byId.get(r.candidate_id) || null,
  }));

  return (
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
            <AiCard key={item.candidate_id} item={item} profile={profile} />
          ))}
        </ul>
      )}
    </section>
  );
}