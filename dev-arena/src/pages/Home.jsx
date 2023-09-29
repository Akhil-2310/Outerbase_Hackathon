import React from "react";
import { useState, useEffect } from "react";
import supabase from "../config/supabaseClient";
import HackathonCard from "../components/HackathonCard";

const Home = () => {
  const [error, setError] = useState(null);
  const [hackathons, setHackathons] = useState(null);

  useEffect(() => {
    const fetchHackathons = async () => {
      const { data, error } = await supabase.from("hackathons").select();

      if (error) {
        setError("Could not fetch hackathons");
        setHackathons(null);
        console.log(error);
      }

      if (data) {
        setHackathons(data);
        setError(null);
      }
    };

    fetchHackathons();
  }, []);

  return (
    <>
      {error && <p>{error}</p>}
      {hackathons && (
        <div>
          {hackathons.map((hackathon) => (
            <HackathonCard key={hackathon.id} hackathon={hackathon} />
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
