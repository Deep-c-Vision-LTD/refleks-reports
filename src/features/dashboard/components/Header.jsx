import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../auth/context/AuthContext";

const Header = () => {
  const { signOut } = UserAuth();
  const navigate = useNavigate();
  const [_, setError] = useState("");

  const handleSignOut = async (e) => {
    e.preventDefault();

    try {
      await signOut();
      navigate("/");
    } catch (err) {
      setError(`An unexpected error occurred: ${err}`); // Catch unexpected errors
    }
  };

  return (
    <header className="bg-primary text-primary-content p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Refleks Reports</h1>
      <button className="btn btn-secondary" onClick={handleSignOut}>
        Sign Out
      </button>
    </header>
  );
};

export default Header;
