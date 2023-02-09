import React from "react";
import { FaSearch } from "react-icons/fa";

function PizzaSearch({setQuery}) {

  return (
    <div className="relative flex items-center mb-2">
      <input
        className="rounded-xl w-full pl-3 outline-none p-3"
        type="Search"
        placeholder="Search pizzas..."
        onChange={e => setQuery(e.target.value)}
        />
      <FaSearch className="absolute right-0 mr-3" />
    </div>
  );
}

export default PizzaSearch;
