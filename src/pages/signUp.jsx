export const SignUpPage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4">Create an Account</h1>
        <form className="space-y-4">
          <input type="text" placeholder="Full Name" className="w-full border p-2 rounded" />
          <input type="email" placeholder="Email" className="w-full border p-2 rounded" />
          <input type="password" placeholder="Password" className="w-full border p-2 rounded" />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white w-full py-2 rounded"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};