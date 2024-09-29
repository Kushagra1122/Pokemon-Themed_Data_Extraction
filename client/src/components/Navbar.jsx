import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">MyNavbar</div>

        <div
          className={`md:flex md:items-center md:space-x-4 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <Link to={"/"} className="block px-2 py-1 hover:bg-gray-700 rounded">
            Stats
          </Link>
          <Link
            to={"/inventory"}
            className="block px-2 py-1 hover:bg-gray-700 rounded"
          >
            Inventory
          </Link>
          <Link
            to={"/performance"}
            className="block px-2 py-1 hover:bg-gray-700 rounded"
          >
            Performance
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
