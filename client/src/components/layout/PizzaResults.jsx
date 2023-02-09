import React from 'react'
import PizzaCard from './PizzaCard'
import results from '../../images/results.png'
import spinner from '../../images/spinner.gif'

function PizzaResults({ pizzas, query, loading, error, setCart }) {
  // Add to cart
  const handleAddToCart = (pizza) => {
    setCart((prev) => {
      const findProductInCart = prev.find(
        (item) => item.pizza.id === pizza.pizza.id && item.size === pizza.size
      )

      if (findProductInCart) {
        return prev.map((item) =>
          item.pizza.id === pizza.pizza.id
            ? {
                ...item,
                amount: item.amount + 1,
                quantity: item.quantity + pizza.quantity,
                total_price: item.total_price + pizza.quantity * pizza.price,
              }
            : item
        )
      }

      return [...prev, { ...pizza, amount: 1 }]
    })
  }

  let content = null
  if (pizzas.data) {
    content = pizzas.data
      .filter(
        (pizza) =>
          pizza.name.toLowerCase().includes(query.toLowerCase()) ||
          pizza.category_name.toLowerCase() === query.toLowerCase()
      )
      .map((pizza, key) => (
        <PizzaCard pizza={pizza} key={key} handleAddToCart={handleAddToCart} />
      ))
  }

  return (
    <div>
      {loading && (
        <p>
          <img src={spinner} alt="#" width={200} />
        </p>
      )}
      {error && <p>Error: {error.message}</p>}
      {content ? (
        <div>
          {content.length > 0 ? (
            content
          ) : (
            <div className="text-center md:mx-20">
              <h1 className="text-3xl text-red-500">0 Results</h1>
              <img src={results} alt="#" width={350} />
            </div>
          )}
        </div>
      ) : (
        error
      )}
    </div>
  )
}
export default PizzaResults
