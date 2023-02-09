import React from "react";
import { useState,useEffect } from "react";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

const Carousel = () => {
const [pizzas,setPizzas] = useState([]);
useEffect(()=>{
  fetchPizzas();
},[]) 

const fetchPizzas=async () =>{
  const response = await fetch("http://localhost:5000/pizza");
  const data = await response.json();
  console.log(data);
 
  setPizzas(data);

}


  const [slide, setSlide] = useState(0);
const length =3;

const prevSlide = () => {
  setSlide(slide === length - 1 ? 0 : slide + 1);
};

const nextSlide = () => {
  setSlide(slide === 0 ? length - 1 : slide - 1);
};

  const pizzaFilter=pizzas.data?.filter((pizza,index)=>
    pizza.rating===5)
 const pizzaRating=pizzaFilter?.map((pizza,index)=>
 <div key={index} className={index === slide ? "opacity-100" : "opacity-0"}>
        {index === slide && (
  <div>
  <p className="text-xl sm:text-2xl md:text-3xl mb-5 text-center">{pizza.name}</p>
  <img className="object-contain hover:object-scale-down rounded-md" src={pizza.picture_link} alt="/" />
</div>
  )
}</div>
  )
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
    
    {pizzaRating} 

    
    
    
  </div>
  );
};

export default Carousel;
