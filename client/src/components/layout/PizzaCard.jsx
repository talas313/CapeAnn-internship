import React, { useState } from "react";
import PropTypes from "prop-types";
import PizzaDetailModal from "./PizzaDetailModal";
import Star from "./Star";

function PizzaCard({
  pizza: { name, category_name, rating, picture_link, ingredients, id },
  handleAddToCart,
}) {

  const [showMyDetailModal, setShowMyDetailModal] = useState(false);
  const [nameP, setNameP] = useState();
  const [ingredientsP, setIngredientsP] = useState();
  const [ratingP, setRatingP] = useState();
  const [pictureP, setPictureP] = useState();

  const handleOnCloseDetail = () => setShowMyDetailModal(false);

  return (
    <section className="parent-section mx-5 lg:mx-10">
      <div className="card flex flex-col xl:flex-row xl:mx-30">
        <img
          src={picture_link}
          className="thumbnail max-xl:mx-auto xl:mr-5 rounded-xl"
          width={200}
          height={90}
          alt={name}
        />
        <div className="card-details text-white/70">
          <div className="top flex flex-row justify-between mx-4 font-semibold text-gray-500">
            <div className="tag">{category_name}</div>
            <div className="rating mt-5 items-center text-amber-400 ">
              <Star stars={rating}></Star>
            </div>
          </div>
          <div className="middle">
            <h2 className="title text-2xl font-bold mb-5">{name}</h2>
            <div className="excerpt mb-5 min-w-[100px]">
              <p>{ingredients}</p>
            </div>
          </div>
          <div className="bottom mx-2 text-sky-600">
            <div className="add flex flex-col sm:flex-row items-center justify-between ">
        
              
              <div>
                <button
                  className="text-white hover:text-white border border-white-400 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-800 rounded-lg px-5 py-2.5 text-center mr-2 dark:border-white-300 dark:text-white-300 dark:hover:text-white dark:hover:bg-red-700 dark:focus:ring-white-900"
                  onClick={() => {
                    setShowMyDetailModal(true);
                    setNameP(name);
                    setIngredientsP(ingredients);
                    setRatingP(rating);
                    setPictureP(picture_link);
               
                  }}
                >
                  Details
                </button>
              </div>
            
            </div>
          </div>
      
        </div>
      </div>
      <PizzaDetailModal
        onClosePizzaDetail={handleOnCloseDetail}
        visiblePizzaDetail={showMyDetailModal}
        handleAddToCart={handleAddToCart}
        pizza={
          {
            id:id,
            name:nameP,
            rating:ratingP,
            picture:pictureP,
            ingredients:ingredientsP,
          
          }
        }
      />
      <hr className="opacity-10 my-10 mx-20" />
    </section>
  );
}
PizzaCard.propTypes = {
  pizza: PropTypes.object.isRequired,
};
export default PizzaCard;
