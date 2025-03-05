import React, { useEffect, useState } from "react";

import { supabase } from "../../../supabaseClient";

const ProfileList = () => {
  const [profiles, setProfiles] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    getProfiles();
  }, []);

  async function getProfiles() {
    const { data, err } = await supabase.from("profiles").select().limit(10);
    if (err) {
      console.error("Error fetching profiles:", err);
      setError(err);
      return;
    }
    setProfiles(data);
  }
  var session = supabase.auth.getSession()?.user?.user_metadata;

  return (
    <div>
      <h1>Profile List</h1>
      <ul>
        {profiles.map((profile) => (
          <li key={profile.id}>{profile.id}</li>
        ))}
      </ul>
      {error && <p className="text-red-600 text-center pt-4">{error}</p>}
      {session}
    </div>
  );
};

export default ProfileList;
