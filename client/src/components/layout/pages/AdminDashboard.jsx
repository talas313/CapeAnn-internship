import React from "react";
import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="min-h-[100vh] grid h-screen place-items-center">
      <div className="flex  mb-5 btn-group">
        <div className="flex  justify-center mb-10">
          <button className="btn cursor-pointer text-red-500 hover:text-white  ">
            <Link to="/dashboard_users">
              <h1 className="cursor-pointer md:text-2xl">Users</h1>
            </Link>
          </button>
          <button className="btn text-red-500 hover:text-white border-x-stone-900 ">
            <Link to="/dashboard_pizza">
              <h1 className="cursor-pointer md:text-2xl">Pizza</h1>
            </Link>
          </button>
          <button className="btn text-red-500 hover:text-white border ">
            <Link to="/dashboard_orders">
              <h1 className="cursor-pointer md:text-2xl">Orders</h1>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
