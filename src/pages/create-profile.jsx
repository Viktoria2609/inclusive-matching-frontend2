import { ProfileForm } from "@/components/profiles/form";

export const CreateProfilePage = () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-white py-20">
      <div className="w-full max-w-[700px] px-4">
        <ProfileForm />
      </div>
    </div>
  );
};