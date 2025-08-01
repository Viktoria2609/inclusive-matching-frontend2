// export const LoginPage = () => {
//   return (
//     <div className="w-full h-screen flex items-center justify-center">
//       <h1 className="text-4xl font-bold">Login Page</h1>
//     </div>
//   );
// };

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "test@example.com" && password === "password123") {
      alert("Login successful!");
      navigate("/profiles");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-lg max-w-md w-full space-y-6"
      >
        <h1 className="text-3xl font-extrabold text-indigo-900 text-center">
          Login to KIDNECT
        </h1>

        <div>
          <label className="block text-indigo-900 font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label className="block text-indigo-900 font-medium mb-1">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-800 text-white py-2 rounded-full font-semibold"
        >
          Login
        </button>
      </form>
    </div>
  );
};




