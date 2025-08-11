import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

import { useToast } from "@/components/toast/context";
import { supabase } from "@/lib/supabaseClient";
import { routes } from "@/shared/routes";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { error: toastError, success } = useToast();

  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/";

  const {
    handleSubmit,
    control,
    getValues, 
    formState: { errors },
  } = useForm();

  // forgot password UI state
  const [resetOpen, setResetOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);

  const onSubmit = async (data) => {
    const { email, password } = data;
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) toastError(error.message);
    else {
      success("Login successful!");
      navigate(redirectTo, { replace: true });
    }
  };

  async function onForgotPassword(e) {
    e.preventDefault();
    const email = (resetEmail || getValues("email") || "").trim();
    if (!email) {
      toastError("Please enter your email first");
      return;
    }
    try {
      setResetLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      success("If this email exists, we sent a reset link.");
      setResetOpen(false);
    } catch (err) {
      toastError(err.message || "Could not send reset email");
    } finally {
      setResetLoading(false);
    }
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-lg max-w-md w-full space-y-6"
      >
        <h1 className="text-3xl font-extrabold text-indigo-900 text-center">
          Login to KIDNECT
        </h1>

        {/* Email */}
        <div>
          <label className="block text-indigo-900 font-medium mb-1">Email</label>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            }}
            render={({ field }) => (
              <input
                {...field}
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="you@example.com"
              />
            )}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between">
            <label className="block text-indigo-900 font-medium mb-1">
              Password
            </label>
            <button
              type="button"
              onClick={() => {
                setResetEmail(getValues("email") || "");
                setResetOpen((v) => !v);
              }}
              className="text-sm text-indigo-600 hover:underline"
            >
              {resetOpen ? "Hide" : "Forgot password?"}
            </button>
          </div>

          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: "Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" },
            }}
            render={({ field }) => (
              <input
                {...field}
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="••••••••"
              />
            )}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Forgot password inline panel */}
        {resetOpen && (
          <div className="rounded-2xl border p-4 bg-gray-50">
            <label className="block text-sm text-gray-700 mb-1">
              Email for reset link
            </label>
            <input
              type="email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="you@example.com"
            />
            <button
              onClick={onForgotPassword}
              className="mt-3 w-full bg-indigo-600 hover:bg-indigo-800 text-white py-2 rounded-full font-semibold disabled:opacity-60"
              disabled={resetLoading}
            >
              {resetLoading ? "Sending…" : "Send reset link"}
            </button>
            <p className="mt-2 text-xs text-gray-500">
              We’ll email you a secure link to set a new password.
            </p>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-800 text-white py-2 rounded-full font-semibold"
        >
          Login
        </button>

        <div className="flex flex-wrap gap-2 justify-center text-sm">
          <span>Don’t have an account?</span>
          <Link to={routes.signup} className="text-indigo-600 underline">
            Create account
          </Link>
        </div>
      </form>
    </div>
  );
};
