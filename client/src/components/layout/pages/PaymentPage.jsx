import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoChevronBackCircle } from "react-icons/io5";
import PaymentCard from "../PaymentCard";
import visa from "../../../images/Visa.png";
import paypal from "../../../images/paypal.png";
import mastercard from "../../../images/mastercard.png";
import pouzece from "../../../images/placanje_pouzećem.png";
import Adress from "../Adress";

function PaymentPage({ cart, key, handleRemoveFromCart }) {
  const [address, setAddress] = useState("");
  const [card, setCard] = useState("");
  const [cityName, setCityName] = useState("");
  const token = JSON.parse(localStorage.getItem("token"));
  const userId = token.data[0].id;
  const addressCity = address + ", " + cityName;
  const [price, setPrice] = useState(0);

  const handlePrice = () => {
    let ans = 0;
    cart.map((item) => (ans += item.total_price));
    setPrice(ans);
  };

  useEffect(() => {
    handlePrice();
  });

  const submit = () => {
    const data = {
      address: addressCity,
      card: card,
      total_price: price.toFixed(2),
      userId: userId,
    };

    fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: {
        Autorization: `Bearer ${
          JSON.parse(localStorage.getItem("token")).token
        }`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((response) => {
        console.warn(response);
      });
    });
  };

  return (
    <div className="h-[160vh] lg:h-[100vh]">
      <div className="container mx-auto my-20">
        <div className="grid sm:h-screen flex text-white">
          <div className="flex gap-10 flex-col lg:flex-row items-center justify-center">
            <div className="absolute top-10 md:top-20 left-[-20px]">
              <Link to="/">
                <IoChevronBackCircle className="absolute top-0 left-0 z-1000 text-4xl md:text-6xl text-red-500 m-8 cursor-pointer" />
              </Link>
            </div>
            <div className="relative flex-2 items-center w-[70%]">
              <h1 className="text-sm sm:text-xl mb-2">
                You have{" "}
                <span className="text-red-500">
                  {cart.length} {cart.length < 2 ? "item" : "items"}
                </span>{" "}
                in your order.
              </h1>
              <div className="bg-zinc-900/80 bg-blur-sm rounded-lg overflow-y-auto h-[60vh] mx-2">
                <div className="p-5 h overflow-y-auto h-[50vh]">
                  <PaymentCard
                    cart={cart}
                    key={key}
                    handleRemoveFromCart={handleRemoveFromCart}
                  />
                </div>
              </div>
            </div>

            <div className="flex-1 ">
              <div className="">
                <div className="bg-zinc-900/80 backdrop-blur-sm rounded-lg py-3">
                  <div className="photo-wrapper p-2">
                    <h1 className="text-center text-red-500 text-2xl">
                      PAYMENT
                    </h1>
                  </div>
                  <div className="p-2 text-lg">
                    <div className="flex justify-center gap-2 sm:gap-5 items-center mt-5">
                      <div className="bg-white rounded-full">
                        <img
                          src={visa}
                          alt="#"
                          className="h-16 w-16 rounded-full cursor-pointer"
                        />
                      </div>
                      <div className="bg-white rounded-full">
                        <img
                          src={paypal}
                          alt="#"
                          className="h-16 w-16 rounded-full cursor-pointer"
                        />
                      </div>
                      <div className="bg-white rounded-full">
                        <img
                          src={mastercard}
                          alt="#"
                          className="h-16 w-16 rounded-full cursor-pointer"
                        />
                      </div>
                      <div className="bg-white rounded-full">
                        <img
                          src={pouzece}
                          alt="#"
                          className="h-16 w-16 rounded-full cursor-pointer"
                        />
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="flex justify-center items-center my-5">
                        <p className="pr-2">Card: </p>
                        <select
                          className="p-2 rounded-xl"
                          onChange={(e) => setCard(e.target.value)}
                        >
                          <option defaultValue="Select card">
                            Select card
                          </option>
                          <option>Visa</option>
                          <option>Paypal</option>
                          <option>Mastercard</option>
                          <option>Plaćanje pouzećem</option>
                        </select>
                      </div>
                      <hr className="opacity-10 mt-5 mb-2 mx-10" />
                      <h1 className="">or</h1>
                      <hr className="opacity-10 my-2 mx-10" />
                      <div className="flex justify-center items-center">
                        <p className="pr-2">Your Address: </p>
                        <input
                          className="rounded-xl outline-none p-2 my-3"
                          type="text"
                          placeholder="Address"
                          onChange={(e) => setAddress(e.target.value)}
                          value={address}
                        />
                      </div>
                      <Adress cityName={cityName} setCityName={setCityName} />
                      <Link to="/confirm">
                      <div>
                        <button
                          disabled={
                            address === "" ||
                            card === "Select card" ||
                            cityName === "Select card" ||
                            cart.length === 0
                          }
                          type="button"
                          onClick=
                            {
                              submit
                            }
                          className="text-white-400 mt-5 md:btn-wide hover:text-white border border-white-400 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-800 font-medium rounded-lg text-sm px-10 py-3.5 text-center mr-2 mb-2 dark:border-white-300 dark:text-white-300 dark:hover:text-white dark:hover:bg-red-700 dark:focus:ring-white-900"
                          >
                          PLACE ORDER
                        </button>
                      </div>
                          </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
