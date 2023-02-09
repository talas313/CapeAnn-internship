import React from "react";
import aboutus from "../../images/AboutUs.png";
import { FaRegClock, FaMapMarkerAlt } from "react-icons/fa";

function AboutUs() {
  return (
    <div className="relative w-full h-[100vh] sm:h-[60vh]" id='about'>
      <img className=" w-full h-full object-cover" src={aboutus} alt="#" />
      <div className="container m-auto">
        <div className="absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:-[50%] w-full p-10 text-white text-center">
          <h1 className="text-2xl md:3xl lg:text-6xl text-red-500 mb-10">ABOUT US</h1>
          <p className="max-w-lg m-auto mb-20 text-lg">
            Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
            consectetur, adipisci velit, sed quia non numquam eius modi tempora
            incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-20">
            <div className="flex gap-3">
              <FaRegClock color="#e12e11" fontSize="1.5em" />
              <p>9:00-21:00h, Mon-Sun</p>
            </div>
            <div className="flex gap-3">
              <FaMapMarkerAlt color="#e12e11" fontSize="1.5em" />
              <p>Ul. Mehe Puzića 23, Zenica</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
