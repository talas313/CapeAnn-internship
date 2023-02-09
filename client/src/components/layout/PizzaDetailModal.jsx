import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import Star from "./Star";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";

function PizzaDetailModal({
  onClosePizzaDetail,
  visiblePizzaDetail,
  pizza,
  handleAddToCart,
}) {
  const [optionSize, setOptionSize] = useState();
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState([""]);
  const [price, setPrice] = useState();
  const pizzaArray = [];

  let priceV = null;
  let total_price = 0;

  const pizzaV = {
    pizza,
    quantity: quantity,
    size: optionSize,
    price: price,
    total_price,
  };

  pizzaArray.push(pizzaV);

  useEffect(() => {
    fetch("http://localhost:5000/pizza-size/" + pizza.id)
      .then((data) => data.json())
      .then((val) => setSize(val));
  }, [pizza.id]);
  
  console.log(size, "values");

  if (size.data) {
    priceV = size.data
      .filter((opts) => opts.size.includes(optionSize))
      .map((opts) => opts.price)[0];
  }

  if (!visiblePizzaDetail) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-10">
      <div className="border border-gray-500 rounded-lg p-10 w-full bg-zinc-900/80 backdrop-blur-sm">
        <MdClose
          onClick={onClosePizzaDetail}
          className="absolute top-0 right-0 m-10 text-2xl sm:text-4xl md:text-4xl lg:text-6xl cursor-pointer text-orange-500"
        />
        <h1 className="text-center text-3xl mb-5 underline text-red-500">
          PIZZA DETAILS
        </h1>
        <div className="sm:block md:flex items-center justify-between pl-5 pr-5 mb-10">
          <div
            className="text-center md:text-left"
            onMouseOver={() => setPrice(priceV)}
          >
            <h2 className="text-red-500">NAME</h2>
            <p className="mb-5">{pizza.name}</p>
            <h2 className="text-red-500">INGREDIENTS</h2>
            <p className="mb-5">{pizza.ingredients}</p>
            <h2 className="text-red-500">AVAILABLE SIZE</h2>
            <select
              className="mb-5 border border-white p-2"
              onChange={(e) => {
                setOptionSize(e.target.value);
              }}
            >
              <option>Select size</option>
              {size.data.map((opts, i) => (
                <option key={i}>{opts.size}</option>
              ))}
            </select>
            <h2 className="text-red-500">PRICE</h2>
            <div className="mb-5">{price} KM</div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <img
              src={pizza.picture}
              alt="#"
              style={{ width: 300, height: 150 }}
              className="w-full h-full object-cover my-4"
            />
            <div className="text-amber-400 mb-4">
              <Star stars={pizza.rating}></Star>
            </div>
            <div className="flex gap-2 justify-center items-center mb-6">
              <p className="text-red-500"> QUANTITY:</p>
              <AiOutlinePlus
                onClick={() => setQuantity(quantity + 1)}
                className="border bg-white text-black cursor-pointer rounded p-1 text-2xl"
              />
              <p className="text-white/70 sm:text-xl">{quantity}</p>
              <AiOutlineMinus
                onClick={() => setQuantity(Math.max(quantity - 1, 1))}
                className="border bg-white text-black cursor-pointer rounded p-1 text-2xl"
              />
            </div>
            <button
              disabled={optionSize != "small" && optionSize != "big"}
              onClick={() => {
                handleAddToCart(pizzaV);
              }}
              className="flex text-white hover:text-white border border-white-400 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-800 rounded-lg px-5 py-2.5 text-center dark:border-white-300 dark:text-white-300 dark:hover:text-white dark:hover:bg-red-700 dark:focus:ring-white-900"
            >
              <div className="flex items-center gap-2">
                <FaShoppingCart />
                Add to cart
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PizzaDetailModal;
