import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "@/components/toast/context";

export default function ResetPasswordPage() {
  const { success, error } = useToast();
  const navigate = useNavigate();

  const [pwd, setPwd] = useState("");
  const [pwd2, setPwd2] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [linkErr, setLinkErr] = useState("");

  
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    const params = new URLSearchParams(hash);
    if (params.get("error")) {
      setLinkErr(params.get("error_code") || params.get("error"));
    }
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    if (pwd.length < 6) return error("Password must be at least 6 characters");
    if (pwd !== pwd2) return error("Passwords do not match");

    setSubmitting(true);
    const { error: err } = await supabase.auth.updateUser({ password: pwd });
    setSubmitting(false);

    if (err) return error(err.message);
    success("Password updated. Please sign in.");
    navigate("/login", { replace: true });
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white/90 border rounded-3xl p-6">
        <h1 className="text-xl font-semibold mb-4">Set a new password</h1>

        {linkErr && (
          <div className="mb-4 p-3 rounded-xl border border-amber-300 bg-amber-50 text-amber-800 text-sm">
            Link error: <b>{linkErr}</b>. Please request a new reset email.
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-3">
          <input
            type="password"
            placeholder="New password"
            className="w-full p-2 border rounded-xl"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
          <input
            type="password"
            placeholder="Repeat new password"
            className="w-full p-2 border rounded-xl"
            value={pwd2}
            onChange={(e) => setPwd2(e.target.value)}
          />
          <button
            disabled={submitting}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-2xl"
          >
            {submitting ? "Saving…" : "Save new password"}
          </button>
        </form>

        <div className="mt-4 text-sm">
          <Link className="text-indigo-600 underline" to="/login">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}