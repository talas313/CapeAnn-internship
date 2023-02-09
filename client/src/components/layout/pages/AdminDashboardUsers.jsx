import React, { useEffect, useState } from 'react'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { Link } from 'react-router-dom'

function AdminDashboardUsers() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  const [email, setEmail] = useState()
  const [editEmail, setEditEmail] = useState()
  const [editRole, setEditRole] = useState()
  useEffect(() => {
    fetchUsers()
    setError(null)
  }, [])

  function fetchUsers() {
    fetch('http://localhost:5000/users', {
      method: 'GET',
      headers: {
        Autorization: `Bearer ${
          JSON.parse(localStorage.getItem('token')).token
        }`,
      },
    }).then((result) => {
      result.json().then((response) => {
        console.warn(response)
        setUsers(response.data)
      })
    })
  }

  function deleteUser(id) {
    fetch('http://localhost:5000/users/' + id, {
      method: 'DELETE',
      headers: {
        Autorization: `Bearer ${
          JSON.parse(localStorage.getItem('token')).token
        }`,
      },
    }).then((result) => {
      result.json().then((response) => {
        console.warn(response)
        fetchUsers()
      })
    })
  }

  function editUser(id) {
    console.log('Email:', editEmail)
    console.log('Role:', editRole)
    console.log('User:', editEmail, editRole)
    const data = { email: editEmail, role: editRole }
    fetch('http://localhost:5000/users/' + id, {
      method: 'PATCH',
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
        fetchUsers()
      })
    })
  }

  function saveUser() {
    const data = { email, password }

    let url = 'http://localhost:5000/users/register'
    fetch(url, {
      method: 'POST',
      headers: {
        Autorization: `Bearer ${
          JSON.parse(localStorage.getItem('token')).token
        }`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        if (data.error) {
          console.log(data.error)
        }
        fetchUsers()
        console.log(data)
      })
  }

  return (
    <div className="max-sm:h-[150vh] sm:min-h-[100vh] grid h-screen place-items-center">
      <div className="">
        <div className="flex justify-center mb-10 btn-group">
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
        <div className="relative overflow-y-auto h-[50vh]">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="max-sm:hidden">
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Role
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
              {users.map((user, key) => {
                return (
                  <tr
                    key={key}
                    className="max-sm:flex max-sm:text-center max-sm:flex-col bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      <span className="sm:hidden text-red-500">NAME: </span>
                      <input
                        className="rounded-xl w-full pl-3 outline-none p-3"
                        type="text"
                        defaultValue={user.email.split('@')[0]}
                      ></input>
                    </th>
                    <td className="px-6 py-4">
                      <span className="sm:hidden text-red-500">EMAIL: </span>{' '}
                      <input
                        className="rounded-xl w-full pl-3 outline-none p-3"
                        type="text"
                        defaultValue={user.email}
                        onChange={(e) => {
                          setEditEmail(e.target.value)
                        }}
                      ></input>
                    </td>
                    <td className="px-6 py-4">
                      <span className="sm:hidden text-red-500">ROLE: </span>
                      <input
                        className="rounded-xl w-full pl-3 outline-none p-3"
                        type="text"
                        defaultValue={user.role}
                        onChange={(e) => {
                          setEditRole(e.target.value)
                        }}
                      ></input>{' '}
                    </td>
                    <td className="px-6 py-4 text-red-500 text-xl">
                      <button
                        onClick={() => {
                          editUser(user.id)
                          setEditEmail(user.email)
                          setEditRole(user.role)
                        }}
                      >
                        <AiOutlineEdit className="cursor-pointer" />
                      </button>
                    </td>
                    <td className="px-6 py-4 text-red-500 text-xl">
                      {!(user.role === 'admin') ? (
                        <button onClick={() => deleteUser(user.id)}>
                          <AiOutlineDelete className="cursor-pointer" />
                        </button>
                      ) : (
                        <div className="hidden"></div>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 max-sm:mt-5">
          <tbody className="">
            <tr className="max-sm:flex max-sm:text-center max-sm:flex-col bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <input
                  className="rounded-xl w-full pl-3 outline-none p-3 max-sm:mt-5"
                  type="email"
                  value={email}
                  placeholder="Email Address"
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }}
                  name="email"
                ></input>
              </td>
              <td className="px-6 py-4">
                <input
                  className="rounded-xl w-full pl-3 outline-none p-3"
                  type="password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                  name="password"
                ></input>
              </td>
              <td className="px-6 py-4  min-w-[100px]">
                <input
                  className="rounded-xl w-full pl-3 outline-none p-3"
                  type="password"
                  value={confirmPassword}
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                  name="confirmPassword"
                ></input>
              </td>

              <td className="px-6 py-4 text-red-500 text-xl">
                <button type="button" onClick={saveUser}>
                  Save New User
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminDashboardUsers
