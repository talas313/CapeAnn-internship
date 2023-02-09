import React from 'react'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

function AdminDashboardOrders() {
  const [orders, setOrders] = useState([])
  const [error, setError] = useState(null)
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0.0)
  const [size, setSize] = useState('')
  const [quantity, setQuantity] = useState(0)
  const [total_price, setTotal_price] = useState(0.0)
  const [pizzaId, setPizzaId] = useState()
  const [orderId, setOrderId] = useState()
  const [userId, setUserId] = useState()

  useEffect(() => {
    fetchOrders()
    setError(null)
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:5000/order-details')
      const data = await response.json()
      setOrders(data.data)
    } catch (error) {
      setError(error)
    }
  }

  function deleteOrder(id) {
    fetch('http://localhost:5000/order-details/' + id, {
      method: 'DELETE',
      headers: {
        Autorization: `Bearer ${
          JSON.parse(localStorage.getItem('token')).token
        }`,
      },
    }).then((result) => {
      result.json().then((response) => {
        console.warn(response)
        fetchOrders()
      })
    })
  }

  function editOrder(id) {
    const data = {
      name: name,
      price: price,
      size: size,
      quantity: quantity,
      total_price: total_price,
      pizzaId: pizzaId,
      userId: userId,
    }
    console.log('Order:', data)
    fetch('http://localhost:5000/order-details/' + id, {
      method: 'PUT',
      headers: {
        Autorization: `Bearer ${
          JSON.parse(localStorage.getItem('token')).token
        }`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((response) => {
        console.warn(response)
        fetchOrders()
      })
    })
  }

  function saveOrder() {
    const data = {
      name,
      price,
      size,
      quantity,
      total_price,
      pizzaId,
      orderId,
      userId,
    }
    console.log('data', data)
    fetch('http://localhost:5000/order-details', {
      method: 'POST',
      headers: {
        Autorization: `Bearer ${
          JSON.parse(localStorage.getItem('token')).token
        }`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((response) => {
        console.warn(response)
        fetchOrders()
      })
    })
  }

  return (
    <div className="max-lg:h-[195vh] lg:min-h-[100vh] grid h-screen place-items-center">
      <div className="">
        <div className="flex  justify-center mb-10  btn-group">
          <button className="btn cursor-pointer text-red-500 hover:text-white  ">
            <Link to="/dashboard_users">
              <h1 className="cursor-pointer md:text-2xl">Users</h1>
            </Link>
          </button>
          <button className="btn text-red-500 hover:text-white border-x-stone-900">
            <Link to="/dashboard_pizza">
              <h1 className="cursor-pointer md:text-2xl">Pizza</h1>
            </Link>
          </button>
          <button className="btn text-red-500 hover:text-white  ">
            <Link to="/dashboard_orders">
              <h1 className="cursor-pointer md:text-2xl">Orders</h1>
            </Link>
          </button>
        </div>
        <div className="relative overflow-x overflow-y-auto h-[50vh]">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="max-lg:hidden">
                <th scope="col" className="px-6 py-3">
                  Pizza Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Size
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Total price
                </th>
                <th scope="col" className="px-6 py-3">
                  Pizza id
                </th>
                <th scope="col" className="px-6 py-3">
                  Order id
                </th>
                <th scope="col" className="px-6 py-3">
                  User id
                </th>
                <th scope="col" className="px-6 py-3">
                  Edit
                </th>
                <th scope="col" className="px-6 py-3">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, key) => {
                return (
                  <tr
                    key={order.id}
                    className="max-lg:flex max-lg:text-center max-lg:flex-col bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white max-lg:mt-5"
                    >
                      <input
                        className="rounded-xl w-full pl-3 outline-none p-3"
                        type="text"
                        defaultValue={order.name}
                        onChange={(e) => {
                          setName(e.target.value)
                        }}
                      ></input>
                    </th>
                    <td className="px-6 py-4">
                      <span className="lg:hidden text-red-500">CARD: </span>
                      <input
                        className="rounded-xl w-full pl-3 outline-none p-3"
                        type="text"
                        defaultValue={order.price}
                        onChange={(e) => {
                          setPrice(e.target.value)
                        }}
                      ></input>
                    </td>
                    <td className="px-6 py-4">
                      <span className="lg:hidden text-red-500">CARD: </span>

                      <input
                        className="rounded-xl w-full pl-3 outline-none p-3"
                        type="text"
                        defaultValue={order.size}
                        onChange={(e) => {
                          setSize(e.target.value)
                        }}
                      ></input>
                    </td>
                    <td className="px-6 py-4">
                      <span className="lg:hidden text-red-500">CARD: </span>
                      <input
                        className="rounded-xl w-full pl-3 outline-none p-3"
                        type="text"
                        defaultValue={order.quantity}
                        onChange={(e) => {
                          setQuantity(e.target.value)
                        }}
                      ></input>
                    </td>

                    <td className="px-6 py-4">
                      <span className="lg:hidden text-red-500">PRICE: </span>

                      <input
                        className="rounded-xl w-full pl-3 outline-none p-3"
                        type="text"
                        defaultValue={order.total_price}
                        onChange={(e) => {
                          setTotal_price(e.target.value)
                        }}
                      ></input>
                    </td>
                    <td className="px-6 py-4">
                      <span className="lg:hidden text-red-500">USER ID: </span>
                      <input
                        className="rounded-xl w-full pl-3 outline-none p-3"
                        type="text"
                        defaultValue={order.pizzaId}
                        onChange={(e) => {
                          setPizzaId(e.target.value)
                        }}
                      ></input>
                    </td>
                    <td className="px-6 py-4">
                      <span className="lg:hidden text-red-500">USER ID: </span>
                      <input
                        className="rounded-xl w-full pl-3 outline-none p-3"
                        type="text"
                        defaultValue={order.orderId}
                        onChange={(e) => {
                          setOrderId(e.target.value)
                        }}
                      ></input>
                    </td>
                    <td className="px-6 py-4">
                      <span className="lg:hidden text-red-500">USER ID: </span>
                      <input
                        className="rounded-xl w-full pl-3 outline-none p-3"
                        type="text"
                        defaultValue={order.userId}
                        onChange={(e) => {
                          setUserId(e.target.value)
                        }}
                      ></input>
                    </td>
                    <td className="px-6 py-4 text-red-500 text-xl">
                      <button
                        onClick={() => {
                          editOrder(order.id)
                          setName(order.name)
                          setPrice(order.price)
                          setSize(order.size)
                          setQuantity(order.quantity)
                          setTotal_price(order.total_price)
                          setPizzaId(order.pizzaId)
                          setOrderId(order.orderId)
                          setUserId(order.userId)
                        }}
                      >
                        <AiOutlineEdit className="cursor-pointer" />
                      </button>
                    </td>
                    <td className="px-6 py-4 text-red-500 text-xl">
                      <button onClick={() => deleteOrder(order.id)}>
                        <AiOutlineDelete className="cursor-pointer" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 max-lg:mt-5">
          <tbody>
            <tr className="max-lg:flex max-lg:text-center max-lg:flex-col bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <input
                  className="rounded-xl w-full pl-3 outline-none p-3 max-lg:mt-5"
                  type="text"
                  value={name}
                  placeholder="Pizza name"
                  onChange={(e) => {
                    setName(e.target.value)
                  }}
                  name="name"
                ></input>
              </td>
              <td className="px-6 py-4  min-w-[100px]">
                <input
                  className="rounded-xl w-full pl-3 outline-none p-3"
                  type="text"
                  value={price}
                  placeholder="Price"
                  onChange={(e) => {
                    setPrice(e.target.value)
                  }}
                  name="Price"
                ></input>
              </td>
              <td className="px-6 py-4">
                <input
                  className="rounded-xl w-full pl-3 outline-none p-3"
                  type="text"
                  value={size}
                  placeholder="Size"
                  onChange={(e) => {
                    setSize(e.target.value)
                  }}
                  name="size"
                ></input>
              </td>
              <td className="px-6 py-4">
                <input
                  className="rounded-xl w-full pl-3 outline-none p-3"
                  type="text"
                  value={quantity}
                  placeholder="Quantity"
                  onChange={(e) => {
                    setQuantity(e.target.value)
                  }}
                  name="quantity"
                ></input>
              </td>

              <td className="px-6 py-4  min-w-[100px]">
                <input
                  className="rounded-xl w-full pl-3 outline-none p-3"
                  type="text"
                  value={total_price}
                  placeholder="Total price"
                  onChange={(e) => {
                    setTotal_price(e.target.value)
                  }}
                  name="total_price"
                ></input>
              </td>
              <td className="px-6 py-4">
                <input
                  className="rounded-xl w-full pl-3 outline-none p-3"
                  type="text"
                  value={pizzaId}
                  placeholder="Pizza ID"
                  onChange={(e) => {
                    setPizzaId(e.target.value)
                  }}
                  name="pizzaId"
                ></input>
              </td>
              <td className="px-6 py-4">
                <input
                  className="rounded-xl w-full pl-3 outline-none p-3"
                  type="text"
                  value={orderId}
                  placeholder="Order ID"
                  onChange={(e) => {
                    setOrderId(e.target.value)
                  }}
                  name="orderId"
                ></input>
              </td>
              <td className="px-6 py-4">
                <input
                  className="rounded-xl w-full pl-3 outline-none p-3"
                  type="text"
                  value={userId}
                  placeholder="User ID"
                  onChange={(e) => {
                    setUserId(e.target.value)
                  }}
                  name="userId"
                ></input>
              </td>
              <td className="px-6 py-4 text-red-500 text-xl"></td>

              <td className="px-6 py-4 text-red-500 text-xl">
                <button type="button" onClick={saveOrder}>
                  Save New Order
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminDashboardOrders
