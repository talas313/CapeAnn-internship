import React from "react";
import about from "../../images/about1.png";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

function ContactUs() {
  return (
    <div className="relative w-full h-[60vh]" id='contact'>
      <img className=" w-full h-full object-cover" src={about} alt="#" />
      <div className="container m-auto">
        <div className="absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:-[50%] p-10 text-white text-center">
          <h1 className="text-2xl md:3xl lg:text-6xl">CONTACT US</h1>
          <p className="mt-5">
            Feel free to contact us through links displayed bellow!
          </p>
          <div className="flex  gap-5 text-3xl justify-center mt-10">
            <a href="https://www.facebook.com/">
            <FaFacebook />
            </a>
            <a href="https://www.Instagram.com/">
            <FaInstagram />
            </a>
            <a href="https://www.Twitter.com/">
            <FaTwitter />
            </a>
            <a href="https://www.Youtube.com/">
            <FaYoutube />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
