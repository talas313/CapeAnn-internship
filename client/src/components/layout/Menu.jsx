import React, { useState } from "react";
import PizzaSearch from "./PizzaSearch";
import PizzaResults from "./PizzaResults";

function Menu({ pizzas, loading, error, setCart }) {
  const [query, setQuery] = useState("");
  
  return (
    <div className="w-full h-[100vh] relative" id="menu">
      <div className="container mx-auto">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col text-white items-center">
          <h1 className="pb-10 text-3xl text-red-500">MENU</h1>
          <div className="">
            <div className="flex  mb-5 btn-group">
              <button className="btn cursor-pointer text-red-500 hover:text-white " onClick={() => setQuery("")}>ALL</button>
              <button className="btn text-red-500 hover:text-white border " onClick={() => setQuery("Veg")}>VEGETARIAN</button>
              <button className="btn text-red-500 hover:text-white border" onClick={() =>setQuery("Non-Veg")}>NON-VEG</button>
            </div>
            <PizzaSearch setQuery={setQuery} />
          </div>
          <div className="bg-neutral rounded-xl p-5 overflow-y-auto h-[60vh] mx-2">
            <PizzaResults pizzas={pizzas} query={query} loading={loading} error={error} setCart={setCart} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
