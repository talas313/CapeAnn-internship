import React from "react";
import Delivery from "../../../images/Delivery-cuate.png";
import { RiSendPlane2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

function Confirm() {
  return (
    <div className="text-center my-20">
      <div className="">
        <div className="mb-10">
          <p className="text-6xl mb-10">Thank you!</p>
          <p className="text-3xl">Contact us if you have any questions.</p>
        </div>
        <div className="w-full flex justify-center">
          <img
            className="object-center"
            src={Delivery}
            alt="delivery"
            width={410}
          />
        </div>
            <Link to="/">
        <div>
          <button class="absolute flex justify-center items-center right-0 bottom-0 mb-40 mr-20 bg-red-700 hover:bg-red-500 text-white font-bold py-4 px-8 border border-red-700 rounded">
            Next
            <RiSendPlane2Fill className="ml-5" />
          </button>
        </div>
            </Link>
      </div>
    </div>
  );
}

export default Confirm;
