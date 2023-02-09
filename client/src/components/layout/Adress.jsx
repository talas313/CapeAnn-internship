import React, { useState, useEffect } from "react";

function Adress({cityName, setCityName}) {
  const [data, setData] = useState([]);
  const [city, setCity] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json"
        );
        const res = await response.json();
        setData(res);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  // Uklanja duplikate
  const country = [...new Set(data.map((item) => item.country))];
  country.sort();

  const handleCountry = (e) => {
    let SingleCountry  = data.filter((item) => item.country === e.target.value);
    let states = [...new Set(SingleCountry.map((item) => item.name))];
    states.sort();
    setCity(states);
  };

  return (
    <div className="">
      <div className="mb-3">
        <label>Country: </label>
        <select onChange={(e) => handleCountry(e)} className="p-2 rounded-xl overflow-x-auto w-[200px]">
          <option>Select Country</option>
          {country?.map((item, index) => (
            <option key={index} value={item} className="text-sm md:text-lg overflow-x-auto max-w-[200px]">
              {item}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>City: </label>
        <select className="p-2 rounded-xl" value={cityName} onChange={e => setCityName(e.target.value)}>
          <option>Select city</option>
          {city !== 'Select city' && city?.map((item, index) => (
            <option key={index} value={item?.name}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
export default Adress;
