import React from "react";
import logo2 from "../../images/logo2.png";

function Footer() {
  const footerYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="container m-auto">
        <div className="grid grid-cols-2 gap-8 py-4 px-6 md:grid-cols-3 items-center sm:text-sm md:text-md">
          <div>
            <p>&copy; BeAgile, {footerYear} Cape Ann Enterprises. All Rights Reserved.</p>
          </div>
          <div className="flex justify-center">
            <img src={logo2} alt="#" width={150} />
          </div>
          <div className="gap-10 justify-end hidden md:flex">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
