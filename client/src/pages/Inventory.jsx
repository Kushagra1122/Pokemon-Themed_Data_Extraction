// Inventory.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const Inventory = () => {
  const [inventory, setInventory] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/pokemon-inventory"
        );
        console.log(response);
        setInventory(response.data);
        console.log(inventory)
      } catch (err) {
        setError("Error fetching data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  if (loading)
    return <div className="text-center text-lg text-blue-600">Loading...</div>;
  if (error) return <div className="text-red-600 text-lg">{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Pokémon Companies Item Inventory
      </h1>
      <ul className="space-y-4">
        {Object.entries(inventory).map(([company, data]) => (
          <li
            key={company}
            className="border border-gray-300 p-4 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200"
          >
            <h2 className="text-2xl font-semibold text-gray-700">{company}</h2>
            <ul className="list-disc ml-6 mt-2">
              <li className="text-gray-600">
                <strong>Reserves:</strong> {data.reserves || "N/A"}
              </li>
              <li className="text-gray-600">
                <strong>Borrowings:</strong> {data.borrowings || "N/A"}
              </li>
              <li className="text-gray-600">
                <strong>Total Liabilities:</strong>{" "}
                {data.totalLiabilities || "N/A"}
              </li>
              <li className="text-gray-600">
                <strong>Fixed Assets:</strong> {data.fixedAssets || "N/A"}
              </li>
              <li className="text-gray-600">
                <strong>Investments:</strong> {data.investments || "N/A"}
              </li>
              <li className="text-gray-600">
                <strong>Total Assets:</strong> {data.totalAssets || "N/A"}
              </li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inventory;
