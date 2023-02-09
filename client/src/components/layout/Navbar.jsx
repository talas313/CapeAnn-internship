import React from "react";
import logo from "../../images/logo.png";
import { Link } from "react-scroll";
import { Link as Link2 } from "react-router-dom";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdAdminPanelSettings } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

function Navbar({ cart }) {
  const [navbar, setNavbar] = useState(false);
  const [hamburger, setHamburger] = useState(true);
  const token = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();

  const handleNav = () => {
    setHamburger(!hamburger);
  };

  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  window.addEventListener("scroll", changeBackground);

  return (
    <nav
      className={
        navbar
          ? "navbar fixed top-0 z-10 md:shadow-lg md:bg-neutral text-neutral-content"
          : "navbar fixed top-0 z-10 bg-transparent text-neutral-content"
      }
    >
      <div className="relative container mx-auto">
        {/* Desktop Navbar */}
        <div className="flex-1 hidden md:block">
          <div className="flex justify-start xl:justify-center items-center">
            <Link
              to="welcome"
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
              className="btn btn-ghost rounded-btn"
            >
              Home
            </Link>
            <Link
              to="menu"
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
              className="btn btn-ghost rounded-btn"
            >
              Menu
            </Link>

            <Link
              to="/"
              onClick={() => {
                navigate("/");
              }}
            >
              <img
                src={logo}
                alt="#"
                className="inline cursor-pointer"
                width={150}
                height={150}
              />
            </Link>
            <Link
              to="about"
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
              className="btn btn-ghost rounded-btn"
            >
              About
            </Link>
            <Link
              to="contact"
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
              className="btn btn-ghost rounded-btn"
            >
              Contact Us
            </Link>
            <div className="md:absolute flex gap-5 xl:gap-10 right-0">
              <div className="relative">
                <Link2 to="/paymentpage">
                  <div className="flex gap-2">
                    <FaShoppingCart className="text-2xl cursor-pointer" />
                    {cart.length > 0 && (
                      <div className="absolute -right-4">
                        <span className="text-xl text-red-500">
                          {cart.length}
                        </span>
                      </div>
                    )}
                  </div>
                </Link2>
              </div>
              <div>
                {!token ? (
                  <Link2 to="/registration">
                    <FaUser className="text-2xl cursor-pointer" />
                  </Link2>
                ) : token.data[0].role === "user" ? (
                  <div className=" flex gap-5 xl:gap-10 ">
                    <Link2 to="/profilepage">
                      <FaUser className="text-2xl text-red-500 fa-beat  cursor-pointer" />
                    </Link2>

                    <button className="relative">
                      <Link2
                        to="/"
                        onClick={() => {
                          localStorage.removeItem("token");
                          navigate(0);
                        }}
                      >
                        LOGOUT
                      </Link2>
                    </button>
                  </div>
                ) : (
                  <div className=" flex gap-5 xl:gap-10 ">
                    <Link2 to="/profilepage">
                      <FaUser className="text-2xl text-red-500 fa-beat cursor-pointer" />
                    </Link2>

                    <Link2 to="/dashboard">
                      <MdAdminPanelSettings className="text-2xl text-red-500 fa-beat cursor-pointer" />
                    </Link2>

                    <button className="relative">
                      <Link2
                        to="/"
                        onClick={() => {
                          localStorage.removeItem("token");
                          navigate(0);
                        }}
                      >
                        LOGOUT
                      </Link2>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>



        {/* Mobile Navbar */}
        <div
          onClick={handleNav}
          className="flex justify-center md:hidden text-3xl"
        >
          {hamburger ? <GiHamburgerMenu /> : <IoClose className="text-4xl" />}
        </div>

        <div className="flex-1 md:hidden">
          <div
            onClick={handleNav}
            className={
              hamburger
                ? "absolute top-0 left-[120%]"
                : "absolute left-1/2 transform -translate-x-1/2 left-0 top-[32px] w-[100%] bg-neutral flex flex-col justify-start xl:justify-center items-center rounded-xl"
            }
          >
            <Link
              to="welcome"
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
              className="btn btn-ghost rounded-btn"
            >
              Home
            </Link>
            <Link
              to="menu"
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
              className="btn btn-ghost rounded-btn"
            >
              Menu
            </Link>

            <Link
              to="/"
              onClick={() => {
                navigate("/");
              }}
            >
              <img
                src={logo}
                alt="#"
                className="inline cursor-pointer"
                width={150}
                height={150}
              />
            </Link>
            <Link
              to="about"
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
              className="btn btn-ghost rounded-btn"
            >
              About
            </Link>
            <Link
              to="contact"
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
              className="btn btn-ghost rounded-btn"
            >
              Contact Us
            </Link>
            <div className="md:absolute flex gap-5 m-5 xl:gap-10 right-0">
              <div className="relative">
                <Link2 to="/paymentpage">
                  <div className="flex gap-2">
                    <FaShoppingCart className="text-2xl cursor-pointer" />
                    {cart.length > 0 && (
                      <div className="absolute -right-4">
                        <span className="text-xl text-red-500">
                          {cart.length}
                        </span>
                      </div>
                    )}
                  </div>
                </Link2>
              </div>
              <div>
                {!token ? (
                  <Link2 to="/registration">
                    <FaUser className="text-2xl cursor-pointer" />
                  </Link2>
                ) : token.data[0].role === "user" ? (
                  <div className=" flex gap-5 xl:gap-10 ">
                    <Link2 to="/profilepage">
                      <FaUser className="text-2xl text-red-500 fa-beat  cursor-pointer" />
                    </Link2>

                    <button className="relative">
                      <Link2
                        to="/"
                        onClick={() => {
                          localStorage.removeItem("token");
                          navigate(0);
                        }}
                      >
                        LOGOUT
                      </Link2>
                    </button>
                  </div>
                ) : (
                  <div className=" flex gap-5 xl:gap-10 ">
                    <Link2 to="/profilepage">
                      <FaUser className="text-2xl text-red-500 fa-beat cursor-pointer" />
                    </Link2>

                    <Link2 to="/dashboard">
                      <MdAdminPanelSettings className="text-2xl text-red-500 fa-beat cursor-pointer" />
                    </Link2>

                    <button className="relative">
                      <Link2
                        to="/"
                        onClick={() => {
                          localStorage.removeItem("token");
                          navigate(0);
                        }}
                      >
                        LOGOUT
                      </Link2>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
