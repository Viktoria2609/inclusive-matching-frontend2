import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

import { useToast } from "@/components/toast/context";

import { supabase } from "@/lib/supabaseClient";
import { routes } from "@/shared/routes";

export const SignUpPage = () => {
  const navigate = useNavigate();
  const { success, error: toastError } = useToast();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, email, password } = data;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });

    if (error) {
      toastError(error.message);
    } else {
      success("Registration successful!");
      navigate(routes.login, { replace: true });
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-lg max-w-md w-full space-y-6"
      >
        <h1 className="text-3xl font-extrabold text-indigo-900 text-center">
          Sign Up to KIDNECT
        </h1>

        <div>
          <label className="block text-indigo-900 font-medium mb-1">
            Full Name
          </label>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: "Full name is required" }}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            )}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-indigo-900 font-medium mb-1">
            Email
          </label>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email format",
              },
            }}
            render={({ field }) => (
              <input
                {...field}
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            )}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-indigo-900 font-medium mb-1">
            Password
          </label>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum 6 characters",
              },
            }}
            render={({ field }) => (
              <input
                {...field}
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            )}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-800 text-white py-2 rounded-full font-semibold"
        >
          Sign Up
        </button>

        <div className="flex flex-wrap gap-2">
          <span>Have account?</span>
          <Link to={routes.login} className="text-indigo-600 underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};
