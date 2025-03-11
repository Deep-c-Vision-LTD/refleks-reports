import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "./context/AuthContext";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { session, signInUser } = UserAuth();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const { session, error } = await signInUser(email, password);

    if (error) {
      setError(error);
      setTimeout(() => {
        setError("");
      }, 3000);
    } else {
      navigate("/dashboard");
    }

    if (session) {
      setError("");
    }
  };

  if (session) {
    navigate("/dashboard");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-md">
        <h1 className="mb-6 text-3xl font-bold text-center">Refleks Reports</h1>{" "}
        {/* App name header */}
        <form onSubmit={handleSignIn}>
          <h2 className="mb-6 text-2xl font-bold text-center">Sign in</h2>
          <div className="mb-4">
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-md"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
            />
          </div>
          <div className="mb-4">
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-md"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
          </div>
          <button className="w-full p-3 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600">
            Sign In
          </button>
          {error && <p className="mt-4 text-center text-red-600">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Signin;
