import { ProfileItem } from "./item";

export const ProfileList = ({ loading, error, profiles }) => {
  return (
    <>
      <h1 className="text-4xl font-bold text-gray-800 mb-12 px-4 md:px-0">
        Profiles
      </h1>
      {loading ? (
        <p>Loading profiles...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="flex flex-wrap justify-center md:grid md:grid-cols-3 gap-4">
          {profiles?.map((profile) => (
            <ProfileItem key={profile.id + Math.random()} profile={profile} />
          ))}
        </div>
      )}
    </>
  );
};
