import React from 'react'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

function AdminDashboardPizza() {
  const [pizzas, setPizzas] = useState([])
  const [error, setError] = useState(null)
  const [name, setName] = useState('')
  const [rating, setRating] = useState(1)
  const [ingredients, setIngredient] = useState('')
  const [picture_link, setPictureLink] = useState('')
  const [description, setDescription] = useState('')
  const [category_id, setCategory_id] = useState()

  useEffect(() => {
    fetchPizzas()
    setError(null)
  }, [])

  const fetchPizzas = async () => {
    try {
      const response = await fetch('http://localhost:5000/pizza')
      const data = await response.json()
      setPizzas(data.data)
    } catch (error) {
      setError(error)
    }
  }

  function deletePizza(id) {
    fetch('http://localhost:5000/pizza/' + id, {
      method: 'DELETE',
      headers: {
        Autorization: `Bearer ${
          JSON.parse(localStorage.getItem('token')).token
        }`,
      },
    }).then((result) => {
      result.json().then((response) => {
        console.warn(response)
        fetchPizzas()
      })
    })
  }
  function editPizza(id) {
    console.log(
      'Pizza:',
      name,
      rating,
      description,
      ingredients,
      picture_link,
      category_id
    )
    const data = {
      name: name,
      rating: rating,
      description: description,
      ingredients: ingredients,
      picture_link: picture_link,
      category_id: category_id,
    }
    console.log('data', data)
    fetch('http://localhost:5000/pizza/' + id, {
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
        fetchPizzas()
      })
    })
  }

  function savePizza() {
    console.log(
      name,
      rating,
      description,
      ingredients,
      picture_link,
      category_id
    )
    const data = {
      name,
      rating,
      description,
      ingredients,
      picture_link,
      category_id,
    }

    fetch('http://localhost:5000/pizza', {
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
        fetchPizzas()
      })
    })
  }

  return (
    <div className="max-lg:h-[170vh] lg:min-h-[100vh] grid h-screen place-items-center">
      <div className="">
        <div className="flex justify-center mb-10 btn-group">
          <button className="btn cursor-pointer text-red-500 hover:text-white">
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
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Rating
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Ingredients
                </th>
                <th scope="col" className="px-6 py-3">
                  Picture link
                </th>
                <th scope="col" className="px-6 py-3">
                  Category id
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
              {pizzas.map((pizza, key) => {
                return (
                  <tr
                    key={pizza.id}
                    className="max-lg:flex max-lg:text-center max-lg:flex-col bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-6 py-4">
                      <span className="lg:hidden text-red-500">
                        PIZZA NAME:{' '}
                      </span>
                      <input
                        className="rounded-xl w-full pl-3 outline-none p-3"
                        type="text"
                        defaultValue={pizza.name}
                        onChange={(e) => {
                          setName(e.target.value)
                        }}
                      ></input>
                    </td>
                    <td className="px-6 py-4">
                      <span className="lg:hidden text-red-500">RATING: </span>
                      <input
                        className="rounded-xl w-full pl-3 outline-none p-3"
                        type="text"
                        defaultValue={pizza.rating}
                        onChange={(e) => {
                          setRating(e.target.value)
                        }}
                      ></input>
                    </td>
                    <td className="px-6 py-4">
                      <span className="lg:hidden text-red-500">
                        DESCRIPTION:{' '}
                      </span>
                      <input
                        className="rounded-xl w-full pl-3 outline-none p-3"
                        type="text"
                        defaultValue={pizza.description}
                        onChange={(e) => {
                          setDescription(e.target.value)
                        }}
                      ></input>
                    </td>
                    <td className="px-6 py-4">
                      <span className="lg:hidden text-red-500">
                        INGREDIENTS:{' '}
                      </span>
                      <input
                        className="rounded-xl w-full pl-3 outline-none p-3"
                        type="text"
                        defaultValue={pizza.ingredients}
                        onChange={(e) => {
                          setIngredient(e.target.value)
                        }}
                      ></input>
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {' '}
                      <input
                        className="rounded-xl w-full pl-3 outline-none p-3"
                        type="text"
                        defaultValue={pizza.picture_link}
                        onChange={(e) => {
                          setPictureLink(e.target.value)
                        }}
                      ></input>
                    </td>

                    <td className="px-6 py-4">
                      <span className="lg:hidden text-red-500">
                        CATEGORY ID:{' '}
                      </span>
                      <input
                        className="rounded-xl w-full pl-3 outline-none p-3"
                        type="text"
                        defaultValue={pizza.category_id}
                        onChange={(e) => {
                          setCategory_id(e.target.value)
                        }}
                      ></input>
                    </td>

                    <td className="px-6 py-4 text-red-500 text-xl">
                      <button
                        onClick={() => {
                          editPizza(pizza.id)

                          setName(pizza.name)
                          setRating(pizza.rating)
                          setDescription(pizza.description)
                          setIngredient(pizza.ingredients)
                          setPictureLink(pizza.picture_link)
                          setCategory_id(pizza.category_id)
                        }}
                      >
                        <AiOutlineEdit className="cursor-pointer" />
                      </button>
                    </td>
                    <td className="px-6 py-4 text-red-500 text-xl">
                      <button onClick={() => deletePizza(pizza.id)}>
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
              <td className="px-4 py-3">
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
              <td className="px-6 py-4">
                <input
                  className="rounded-xl w-full pl-3 outline-none p-3"
                  type="text"
                  value={rating}
                  placeholder="Pizza rating 1/5"
                  onChange={(e) => {
                    setRating(e.target.value)
                  }}
                  name="rating"
                ></input>
              </td>
              <td className="px-6 py-4">
                <input
                  className="rounded-xl w-full pl-3 outline-none p-3"
                  type="text"
                  value={description}
                  placeholder="Description"
                  onChange={(e) => {
                    setDescription(e.target.value)
                  }}
                  name="description"
                ></input>
              </td>
              <td className="px-6 py-4  min-w-[100px]">
                <input
                  className="rounded-xl w-full pl-3 outline-none p-3"
                  type="text"
                  value={ingredients}
                  placeholder="Ingradients"
                  onChange={(e) => {
                    setIngredient(e.target.value)
                  }}
                  name="ingradients"
                ></input>
              </td>
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <input
                  className="rounded-xl w-full pl-3 outline-none p-3"
                  type="text"
                  value={picture_link}
                  placeholder="Picture link"
                  onChange={(e) => {
                    setPictureLink(e.target.value)
                  }}
                  name="picture_link"
                ></input>
              </td>

              <td className="px-6 py-4">
                <input
                  className="rounded-xl w-full pl-3 outline-none p-3"
                  type="text"
                  value={category_id}
                  placeholder="Category id"
                  onChange={(e) => {
                    setCategory_id(e.target.value)
                  }}
                  name="category_id"
                ></input>
              </td>

              <td className="px-6 py-4 text-red-500 text-xl">
                <button type="button" onClick={savePizza}>
                  Save New Pizza
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminDashboardPizza
