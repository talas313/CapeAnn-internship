import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";

const token = JSON.parse(localStorage.getItem("token"));

function OrderDetails({
  onCloseOrderHistoryDetail,
  visibleOrderHistoryDetail,
  order: { id, address, card, time_placed, total_price, userId },
}) {
  const [orders, setOrders] = useState([""]);

  useEffect(() => {
    fetch("http://localhost:5000/order-details/" + id)
      .then((data) => data.json())
      .then((val) => setOrders(val.data));
  }, [id]);

  console.log(orders, "values");

  let content = null;

  if (orders) {
    content = orders.map((order, key) => (
      <div order={order} key={key} className="block sm:flex justify-between">
        <div>
          <h2 className="text-red-500">Name</h2>
          <p className="mb-5">{order.name} </p>
        </div>
        <div>
          <h2 className="text-red-500">Price</h2>
          <p className="mb-5">{order.price} KM</p>
        </div>
        <div>
          <h2 className="text-red-500">Size</h2>
          <p className="mb-5">{order.size} </p>
        </div>
        <div>
          <h2 className="text-red-500">Quantity</h2>
          <p className="mb-5">{order.quantity} </p>
        </div>
      </div>
    ));
  }

  if (!visibleOrderHistoryDetail) return null;

  return (
    <div className="container m-auto w-[200px] sm:w-full">
      <div className="fixed inset-0 flex justify-center items-center z-10 sm:text-xl">
        <div className="border border-gray-500 rounded-lg p-10 bg-zinc-900/80 backdrop-blur-sm">
          <MdClose
            className="absolute top-0 right-0 m-10 text-2xl m-5 sm:text-4xl md:text-4xl lg:text-6xl cursor-pointer text-orange-500"
            onClick={onCloseOrderHistoryDetail}
          />
          <h1 className="text-center sm:text-lg xl:text-3xl mb-5 underline text-red-500">
            ORDER DETAILS
          </h1>
          <div className="mb-10">
            <div className="">
              <h2 className="text-red-500">ORDER ID</h2>
              <p className="mb-5">{id}</p>
              <div className="block sm:flex justify-between">
                <div>
                  <h2 className="text-red-500">CUSTOMER</h2>
                  <p className="mb-5">{token.data[0].email.split("@")[0]}</p>
                </div>
                <br></br>

                <div>
                  <h2 className="text-red-500">DATE</h2>
                  <p className="mb-5">{time_placed.split("T")[0]}</p>
                </div>
              </div>

              <div>
                <h2 className="text-red-500"></h2>
                <div>{content}</div>
              </div>
              <div>
                <h2 className="text-red-500">TOTAL PRICE</h2>
                <p className="mb-5">{total_price} KM</p>
              </div>
              <div>
                <h2 className="text-red-500">ADDRESS</h2>
                <p className="mb-5">{address}</p>
              </div>
              <div>
                <h2 className="text-red-500">PAYMENT</h2>
                <p>Credit Card ({card})</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
