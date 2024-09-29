// Stats.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Papa from 'papaparse'
const Stats = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/stats"
        );
        setStats(response.data);
        console.log(response.data)
      } catch (err) {
        setError("Error fetching data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading)
    return <div className="text-center text-lg text-blue-600">Loading...</div>;
  if (error) return <div className="text-red-600 text-lg">{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Pokémon Companies Stats
      </h1>
      <ul className="space-y-4">
        {Object.entries(stats).map(([company, data]) => (
          <li
            key={company}
            className="border border-gray-300 p-4 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200"
          >
            <h2 className="text-2xl font-semibold text-gray-700">{company}</h2>
            <ul className="list-disc ml-6 mt-2">
              {Object.entries(data).map(([stat, value]) => (
                <li key={stat} className="text-gray-600">
                  <span className="font-medium">{stat}:</span> {value || "N/A"}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Stats;
