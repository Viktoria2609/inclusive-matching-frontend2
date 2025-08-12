import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useToast } from "@/components/toast/context";

export const ProfileForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const { success, error } = useToast();

const onSubmit = async (data) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/profiles`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create profile");
    const profile = await res.json();
    success("Successful created profile");
    navigate(`/profiles/${profile.id}`);
  } catch (err) {
    console.error(err);
    error("Could not create profile");
  }
};

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-[700px] p-8 md:p-18 bg-white rounded-4xl border space-y-5"
    >
      <h2 className="text-2xl font-semibold text-gray-800">New Profile</h2>

      <div>
        <label
          htmlFor="child_age"
          className="block text-sm font-medium text-gray-700"
        >
          Child Age <span className="text-red-500">*</span>
        </label>
        <input
          id="child_age"
          type="number"
          {...register("child_age", {
            required: "Child age is required",
            min: { value: 0, message: "Age must be 0 or greater" },
          })}
          className={`mt-1 block w-full rounded-4xl border ${
            errors.child_age && "border-red-500"
          } p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
        />
        {errors.child_age && (
          <p className="mt-1 text-sm text-red-600">
            {errors.child_age.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="city"
          className="block text-sm font-medium text-gray-700"
        >
          City <span className="text-red-500">*</span>
        </label>
        <input
          id="city"
          type="text"
          {...register("city", { required: "City is required" })}
          className={`mt-1 block w-full rounded-4xl border ${
            errors.city && "border-red-500"
          } p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
        />
        {errors.city && (
          <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="strengths"
          className="block text-sm font-medium text-gray-700"
        >
          Strengths <span className="text-red-500">*</span>
        </label>
        <textarea
          id="strengths"
          rows={3}
          {...register("strengths", {
            required: "Strengths is required",
            maxLength: { value: 500, message: "Max length is 500 characters" },
          })}
          className={`mt-1 block w-full rounded-4xl border ${
            errors.strengths && "border-red-500"
          } p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
        />
        {errors.strengths && (
          <p className="mt-1 text-sm text-red-600">
            {errors.strengths.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="needs"
          className="block text-sm font-medium text-gray-700"
        >
          Needs <span className="text-red-500">*</span>
        </label>
        <textarea
          id="needs"
          rows={3}
          {...register("needs", {
            required: "Needs is required",
            maxLength: { value: 500, message: "Max length is 500 characters" },
          })}
          className={`mt-1 block w-full rounded-4xl border ${
            errors.needs && "border-red-500"
          } p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
        />
        {errors.needs && (
          <p className="mt-1 text-sm text-red-600">{errors.needs.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="notes"
          className="block text-sm font-medium text-gray-700"
        >
          Notes
        </label>
        <textarea
          id="notes"
          rows={3}
          {...register("notes", {
            maxLength: {
              value: 1000,
              message: "Max length is 1000 characters",
            },
          })}
          className={`mt-1 block w-full rounded-4xl border ${
            errors.notes && "border-red-500"
          } p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
        />
        {errors.notes && (
          <p className="mt-1 text-sm text-red-600">{errors.notes.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-6 text-white font-medium rounded-4xl bg-indigo-600 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 duration-300"
      >
        {isSubmitting ? "Submitting..." : "Create Profile"}
      </button>
    </form>
  );
};
