import React from "react";
import { useState } from "react";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

const sliderData = [
  {
    title: "Margherita",
    url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    title: "Capricciosa",
    url: "https://images.pexels.com/photos/3682837/pexels-photo-3682837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    title: "Quattro formaggi",
    url: "https://images.pexels.com/photos/12645186/pexels-photo-12645186.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

const Carousel = () => {
  const [slide, setSlide] = useState(0);
  const length = sliderData.length;

  const prevSlide = () => {
    setSlide(slide === length - 1 ? 0 : slide + 1);
  };

  const nextSlide = () => {
    setSlide(slide === 0 ? length - 1 : slide - 1);
  };

  return (
    <div className="sm:w-[100%] lg:max-w-[400px] mx-auto px-4 py-8 relative flex justify-center items-center">
      <BsFillArrowLeftCircleFill
        onClick={prevSlide}
        className="absolute top-[50%] text-2xl md:text-3xl mt-3 text-white cursor-pointer left-0 md:left-8"
      />
      <BsFillArrowRightCircleFill
        onClick={nextSlide}
        className="absolute top-[50%] text-2xl md:text-3xl mt-3 text-white cursor-pointer right-0 md:right-8"
      />
      {sliderData.map((item, index) => (
        <div className={index === slide ? "opacity-100" : "opacity-0"}>
          {index === slide && (
            <div>
              <p className="text-xl sm:text-2xl md:text-3xl mb-5 text-center">{item.title}</p>
              <img className="w-full rounded-md" src={item.url} alt="/" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Carousel;
