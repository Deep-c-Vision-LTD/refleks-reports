import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { UserAuth } from "../auth/context/AuthContext";
import Header from "./components/Header";

const Dashboard = () => {
  const { session } = UserAuth();
  const navigate = useNavigate();

  //const [error, setError] = useState("");

  // Redirect to the sign-in page if there's no session
  if (!session) {
    navigate("/");
  }

  return (
    <div>
      <Header />
      <h2 className="text-2xl text-gray-800 mt-5">
        Welcome, {session?.user?.email}
      </h2>
    </div>
  );
};

export default Dashboard;
