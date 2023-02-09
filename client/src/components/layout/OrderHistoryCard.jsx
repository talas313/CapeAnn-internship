import React, { useState } from "react";
import { AiFillQuestionCircle} from "react-icons/ai";
import OrderDetails from "./OrderDetails";
import PropTypes from 'prop-types'
function OrderHistoryCard({ order: { id,address,card,time_placed,total_price,userId }}) {
  const [showMyOrderDetailModal, setshowMyOrderDetailModal] = useState(false);

  const handleOnCloseOrderDetail = () => setshowMyOrderDetailModal(false);
  const [idO,setIdO]=useState()
  const[addressO,setAddressO]=useState()
  const[cardO,setCardO]=useState()
  const[time_placedO,setTime_placedO]=useState()
  const[total_priceO,setTotal_priceO]=useState()
  const[userIdO,setUserIdO]=useState()

  return (
    <div className="container m-auto">
      <div className="bg-zinc-900/80 backdrop-blur-sm justify-around rounded-lg p-5 my-5 lg:flex text-lg">
        <div className="mb-5 lg:mx-1">
          <h1 className="text-gray-500">ORDER ID</h1><br></br>
          <p className="max-w-[300px]">"{id}"</p>
        </div>
        <div className="mb-5 lg:mx-5">
          <h1 className="text-gray-500">ADDRESS</h1>
          <p className="text-red-500 text-xl">{address}</p>
        </div>
        <div className="mb-5 lg:mx-5">
          <h1 className="text-gray-500">CARD</h1>
          <p className="text-red-500 text-xl">{card}</p>
        </div>
        <div className="mb-5">
          <h1 className="text-gray-500">TOTAL</h1>
          <p className="text-red-500 text-xl">{total_price} KM</p>
        </div>
        <div className="mb-5 lg:mx-5">
          <h1 className="text-gray-500">DATE</h1>
          <p className="text-red-500 text-xl">{time_placed.split("T")[0]}</p>
        </div>
        
  
        <div className="absolute right-0 top-0 lg:p-2 p-5 cursor-pointer text-2xl">
          <AiFillQuestionCircle
            onClick={() => {{
              setshowMyOrderDetailModal(true);
              setIdO(id)
              setAddressO(address)
              setCardO(card)
              setTime_placedO(time_placed)
              setTotal_priceO(total_price)
              setUserIdO(userId)
            }
             
            }}
          />
        </div>
      </div>
      <OrderDetails
        onCloseOrderHistoryDetail={handleOnCloseOrderDetail}
        visibleOrderHistoryDetail={showMyOrderDetailModal}
        order={
          {
            id:idO,
            address:addressO,
            card:cardO,
            time_placed:time_placedO,
            total_price:total_priceO,
            userId:userIdO
          
          }
        }
      />
    </div>
  );
}
OrderHistoryCard.propTypes={
  order:PropTypes.object.isRequired
}
export default OrderHistoryCard;
