import React from "react";
import soon from "../../../images/soon.png";
import { MdModeEditOutline } from "react-icons/md";
import OrderHistoryCard from "../OrderHistoryCard";
import { IoChevronBackCircle } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


function ProfilePage() {
  const token = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();
  const id=token.data[0].id
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    fetchOrders();
    setLoading(true);
    setError(null);
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:5000/orders/"+id);
      const data = await response.json();

      setLoading(false);
      setOrders(data);
    } catch (error) {
      setError(error);
    }
  };
  let content = null;
  if (orders.data) {
    content = orders.data
    .map((order, key) => (
        <OrderHistoryCard
          order={order}
          key={key}  
        />
      ));
  }
  return (
    <div className="h-[150vh] lg:h-[100vh]">
      <div className="container mx-auto my-20">
        <div className="grid sm:h-screen flex text-white">
          <div className="flex gap-10 flex-col lg:flex-row items-center justify-center p-10">
            <div className="flex-1 ">
              <div className="">
                <div className="bg-zinc-900/80 backdrop-blur-sm rounded-lg py-3">
                  <Link to="/">
                    <IoChevronBackCircle className="absolute top-0 left-0 text-4xl xl:text-6xl text-red-500 m-8 cursor-pointer" />
                  </Link>
                  <div className="photo-wrapper p-2">
                    <img
                      className="w-32 h-32 rounded-full mx-auto"
                      src={soon}
                      alt="#"
                    />
                  </div>
                  <div className="p-2 text-lg">
                    <div className="flex justify-center items-center gap-2">
                      <h3 className="text-center text-xl font-medium leading-8">
                        {token.data[0].email.split("@")[0]}
                      </h3>
                      <MdModeEditOutline className="cursor-pointer text-red-500" />
                    </div>
                    <table className="text-md my-3 p-5">
                      <tbody>
                        <tr>
                          <td className="px-2 py-2 text-gray-500 font-semibold">
                            Email:
                          </td>
                          <td className="px-2 py-2">{token.data[0].email}</td>
                        </tr>
                        <tr>
                          <td className="px-2 py-2 text-gray-500 font-semibold">
                            Role:
                          </td>
                          <td className="px-2 py-2">{token.data[0].role}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="text-center my-10">
                    <button
                      className="text-white-400 mt-10 md:btn-wide hover:text-white border border-white-400 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-white-300 dark:text-white-300 dark:hover:text-white dark:hover:bg-red-700 dark:focus:ring-white-900"
                      onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/login");
                      }}
                    >
                      LOG OUT
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-2 items-center w-[70%]">
              <div className="bg-zinc-900/80 bg-blur-sm rounded-lg p-5 overflow-y-auto h-[60vh] mx-2">
                <h1 className="text-center my-10 text-4xl">ORDER HISTORY</h1>
                {content}
              
              
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
