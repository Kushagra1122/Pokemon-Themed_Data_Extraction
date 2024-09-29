import React, { useEffect, useState } from "react";
import axios from "axios";

const PokemonPerformance = () => {
  const [performanceData, setPerformanceData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/pokemon-performance"
        ); // Adjust the endpoint as needed
        setPerformanceData(response.data);
        console.log(response.data)
      } catch (err) {
        setError("Error fetching data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPerformanceData();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Pokémon Companies Stats
      </h1>
      <div className="space-y-8">
        {Object.entries(performanceData).map(([company, yearlyData]) => (
          <div
            key={company}
            className="border border-gray-200 p-6 rounded-lg shadow-lg bg-gray-50 hover:shadow-xl transition-shadow duration-200 ease-in-out"
          >
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              {company}
            </h2>
            <div className="space-y-6">
              {Object.entries(yearlyData).map(([year, data]) => (
                <div
                  key={year}
                  className="p-4 bg-white border rounded-lg shadow-md"
                >
                  <h3 className="text-xl font-medium text-gray-800 mb-3">
                    {year}
                  </h3>
                  {console.log(data)}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-gray-700">
                    <div>
                      <span className="font-medium">Sales:</span> {data.Sales}
                    </div>
                    <div>
                      <span className="font-medium">Net Profit:</span>{" "}
                      {data["Net Profit"]}
                    </div>
                    <div>
                      <span className="font-medium">OPM:</span> {data["OPM"]}
                    </div>
                    <div>
                      <span className="font-medium">EPS:</span> {data.EPS}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonPerformance;
