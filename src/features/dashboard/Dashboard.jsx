import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { UserAuth } from "../auth/context/AuthContext";
import ProfileList from "./components/ProfileList";

const Dashboard = () => {
  const { session, signOut } = UserAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleSignOut = async (e) => {
    e.preventDefault();

    try {
      await signOut();
      navigate("/");
    } catch (err) {
      setError(`An unexpected error occurred: ${err}`); // Catch unexpected errors
    }
  };
  console.log(session);
  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Welcome, {session?.user?.email}</h2>
      <ProfileList />
      <div>
        <p
          onClick={handleSignOut}
          className="hover:cursor-pointer  border inline-block px-4 py-3 mt-4 "
        >
          Sign out
        </p>
        {error && <p className="text-red-600 text-center pt-4">{error}</p>}
      </div>
    </div>
  );
};

export default Dashboard;
