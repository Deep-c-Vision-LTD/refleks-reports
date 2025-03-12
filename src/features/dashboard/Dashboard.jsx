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
    const { data, err } = await supabase
      .from(resultsType)
      .select()
      .gte("updated_at", fromDate)
      .lte("updated_at", toDate + "T23:59:59.999Z") // add time to toDate to include whole day
      .limit(10)
      .order("updated_at");
    if (err) {
      console.error("Error fetching results:", err);
      setError(err);
      return;
    }
    console.log(data);
    // export as CSV file
    const csv = data.map((entry) => {
      return Object.values(entry).join(",");
    });
    const headers =
      resultsType == "gppaq_entries"
        ? "id,created_at,updated_at,submitted_at,user_id,is_device_data,q1,q2,q3,q4,q5,device_q1,device_q2,device_q3,device_q4_5,compound,naids,painkillers,walking_pace,physical_activity_at_work,device_stair_ascent_speed,device_stair_descent_speed,device_stand_time,device_walking_asymmetry_percentage,device_walking_double_support_percentage,device_walking_speed"
        : "id,created_at,updated_at,submitted_at,user_id,pain_q1,pain_q2,pain_q3,pain_q4,pain_q5,stiffness_q1,stiffness_q2,pf_q1,pf_q2,pf_q3,pf_q4,pf_q5,pf_q6,pf_q7,pf_q8,pf_q9,pf_q10,pf_q11,pf_q12,pf_q13,pf_q14,pf_q15,pf_q16,pf_q17,qol_q1,qol_q2,qol_q3,qol_q4,qol_q5";
    const csvString = headers + "\n" + csv.join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const currentDateTime = new Date().toISOString().replace(/[:.]/g, "-");
    a.download = `${resultsType}-${currentDateTime}.csv`;
    a.click();
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
