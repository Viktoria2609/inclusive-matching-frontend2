import { useState } from "react";
import { Link } from "react-router-dom";

export default function AiCard({ item, profile }) {
  const [copied, setCopied] = useState(false);

  async function copyMsg() {
    try {
      await navigator.clipboard.writeText(item.suggested_first_message || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    } catch {}
  }

  const profileId = profile?.id ?? item.candidate_id;

  return (
    <li className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="font-medium">
          <div className="inline-flex items-center gap-2">
            {profile ? (
              <>
                <span>#{profile.id} · age {profile.child_age}</span>
                <span className="text-gray-500">· {profile.city}</span>
              </>
            ) : (
              <span>Candidate #{item.candidate_id}</span>
            )}
            <span className="text-[11px] bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded-full">
              Recommended by AI
            </span>
          </div>
        </div>
        <div className="text-xs px-2 py-1 rounded-full border whitespace-nowrap">
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
              <span key={i}
                className="px-2 py-1 text-xs rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
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

      <div className="mt-4 pt-3 border-t flex items-center gap-2">
        <Link
          to={`/profiles/${profileId}`}
          className="inline-block px-4 py-2 rounded-2xl bg-indigo-600 text-white hover:bg-indigo-700"
        >
          View Details →
        </Link>
        {item.suggested_first_message && (
          <button
            onClick={copyMsg}
            className="px-3 py-2 rounded-2xl border hover:bg-gray-50 text-sm"
          >
            {copied ? "Copied!" : "Copy message"}
          </button>
        )}
      </div>
    </li>
  );
}