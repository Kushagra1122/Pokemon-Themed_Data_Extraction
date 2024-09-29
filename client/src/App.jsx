// src/App.js
import React, { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Stats from "./pages/Stats";
import ItemInventory from "./pages/Inventory";
import BattlePerformance from "./pages/Performance";

const App = () => {


  return (
    <div>
      <div>
        <Navbar />

        <Routes>
          <Route exact path="/" element={<Stats />} />
          <Route exact path="/inventory" element={<ItemInventory />} />
          <Route exact path="/performance" element={<BattlePerformance />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
