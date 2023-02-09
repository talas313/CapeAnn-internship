import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";

function PaymentCard({ cart, key, handleRemoveFromCart }) {
  const [price, setPrice] = useState(0);

  const handlePrice = () => {
    let ans = 0;
    cart.map((item) => (ans += item.total_price));
    setPrice(ans);
  };

  useEffect(() => {
    handlePrice();
  });

  return (
    <div className="">
      {cart.map((item, key) => (
        <div key={item.pizza.id} className="container m-auto">
          <div className="bg-zinc-900/80 backdrop-blur-sm text-center lg:justify-around items-center rounded-lg p-3 my-5 lg:flex text-lg">
            <div className="flex justify-center">
              <img
                src={item.pizza.picture}
                alt={item.pizza.name}
                className="thumbnail max-xl:mx-auto xl:mr-5 h-[190px] rounded-xl"
                width={200}
                height={90}
              />
            </div>
            <div className="mb-5">
              <h1 className="text-gray-500">NAME</h1>
              <p className="">{item.pizza.name}</p>
            </div>
            <div className="mb-5">
              <h1 className="text-gray-500">PRICE</h1>
              <div className="text-white text-xl">{item.price} KM</div>
            </div>

            <div className="mb-5">
              <h1 className="text-gray-500">SIZE:</h1>
              <div className="text-white text-xl">{item.size}</div>
            </div>
            <div className="mb-5">
              <h1 className="text-gray-500">QUANTITY</h1>
              <div className="text-white text-xl">{item.quantity}</div>
            </div>

            <div className="mb-5">
              <p className="text-red-500 text-3xl mt-5">
                {" "}
                {
                  (item.total_price = Number(
                    (item.quantity * item.price).toFixed(2)
                  ))
                }{" "}
                BAM
              </p>
            </div>
            <div
              onClick={() => handleRemoveFromCart(item.id)}
              className="absolute top-0 right-0 m-5 text-4xl cursor-pointer"
            >
              <MdClose />
            </div>
          </div>

          <div className="absolute bottom-0 right-0 flex justify-center md:justify-end text-center mr-10 mb-5">
            <h1 className="text-red-500 text-xl sm:text-2xl md:text-4xl">
              Total: {price.toFixed(2)} KM
            </h1>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PaymentCard;
