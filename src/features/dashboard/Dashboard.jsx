import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../auth/context/AuthContext";
import Header from "./components/Header";

import { supabase } from "../../supabaseClient";
const Dashboard = () => {
  const [resultsType, setResultsType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [error, setError] = useState("");

  const { session } = UserAuth();
  const navigate = useNavigate();

  // Redirect to the sign-in page if there's no session
  if (!session) {
    navigate("/");
  }

  const handleExport = async (e) => {
    e.preventDefault();
    console.log("Exporting data...");
    // log form data
    console.log(resultsType, fromDate, toDate);
    const { data, err } = await supabase.from(resultsType).select().limit(10);
    if (err) {
      console.error("Error fetching results:", err);
      setError(err);
      return;
    }
    console.log(data);
  };

  return (
    <div>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-base-200">
        <div className="w-full max-w-sm p-8 bg-base-300 rounded-lg shadow-md">
          <form onSubmit={handleExport}>
            <div className="form-control flex flex-row justify-center space-x-16 mb-4">
              <label className="label cursor-pointer">
                <span className="label-text">GPPAQ</span>
                <input
                  type="radio"
                  name="resultsType"
                  className="radio checked:bg-blue-500"
                  value="gppaq_entries"
                  onChange={(e) => setResultsType(e.target.value)}
                />
              </label>
              <label className="label cursor-pointer">
                <span className="label-text">WOMAC</span>
                <input
                  type="radio"
                  name="resultsType"
                  className="radio checked:bg-blue-500"
                  value="womac_entries"
                  onChange={(e) => setResultsType(e.target.value)}
                />
              </label>
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">From</span>
              </label>
              <input
                type="date"
                className="input input-bordered"
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">To</span>
              </label>
              <input
                type="date"
                className="input input-bordered"
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary mt-5">
              Submit
            </button>
          </form>
          {error && <p className="text-red-600 text-center pt-4">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
