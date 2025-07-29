import { Link } from "react-router";

export const ProfileItem = ({ profile }) => {
  const { id, child_age, city, strengths, needs } = profile;
  return (
    <div className="max-w-[400px] w-full h-full bg-white rounded-4xl border p-12 flex flex-col justify-between text-base">
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Child Age: {child_age}
        </h3>

        <p className="text-gray-600">
          <span className="font-medium opacity-80">City:</span> {city}
        </p>

        {strengths && (
          <div className="text-gray-700 mt-2">
            <span className="font-medium opacity-80">Strengths:</span>
            <p>
              {strengths.length > 100
                ? `${strengths.slice(0, 100)}...`
                : strengths}
            </p>
          </div>
        )}

        {needs && (
          <div className="text-gray-700 mt-1">
            <span className="font-medium opacity-80">Needs:</span>{" "}
            <p>{needs.length > 100 ? `${needs.slice(0, 100)}...` : needs}</p>
          </div>
        )}
      </div>

      <Link
        to={`/profiles/${id}`}
        className="inline-block mt-4 p-4 text-center rounded-4xl text-white bg-indigo-600 hover:bg-indigo-800 duration-300 font-medium"
      >
        View Details →
      </Link>
    </div>
  );
};
