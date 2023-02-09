const db = require('./db')
const helper = require('../helper')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const secret = 'secret'
const salt = 12

//getUsers function returns all users from the database
async function getUsers() {
  const rows = await db.query(
    `SELECT bin_to_uuid(id) as id, email, password, role 
     FROM users`
  )
  const data = helper.emptyOrRows(rows)

  return {
    data,
  }
}

//registerUser function inserts a new user into the databse
async function registerUser(user) {
  const hashedPassword = await bcrypt.hash(user.password, salt)

  const result = await db.query(
    `INSERT INTO users(id, email, password) 
     VALUES(uuid_to_bin(uuid()), ?, ?)`,
    [user.email, hashedPassword]
  )

  let message = 'Error in registering user'

  if (result.affectedRows) {
    message = 'User registered successfully'

    const token = jwt.sign({ id: result.insertId }, secret, {
      expiresIn: '1h',
    })

    return { message, token }
  }

  return { message }
}

//loginUser function returns user from the databse
async function loginUser(user) {
  const rows = await db.query(
    `SELECT bin_to_uuid(id) as id, email, password, role 
     FROM users 
     WHERE email = ?`,
    [user.email]
  )

  const data = helper.emptyOrRows(rows)

  if (data.length === 0) return console.log('Wrong email and/or password')

  const isPasswordCorrect = await bcrypt.compare(
    user.password,
    data[0].password
  )

  if (!isPasswordCorrect) return console.log('Wrong email and/or password')

  const token = jwt.sign({ id: rows.insertId }, secret, { expiresIn: '1h' })

  return { data, token }
}

//updateUser function updates one user in the databse
async function updateUser(id, user) {
  const result = await db.query(
    `UPDATE users SET email = ?, role = ? WHERE id = uuid_to_bin(?)`,
    [user.email, user.role, id]
  )

  let message = 'Error in updating user'

  if (result.affectedRows) {
    message = 'User updated successfully'
  }

  return { message }
}

//deleteUser function deletes one user in the databse
async function deleteUser(id) {
  await db.query(`DELETE FROM order_details WHERE userId=uuid_to_bin('${id}')`)

  await db.query(`DELETE FROM orders WHERE userId=uuid_to_bin('${id}')`)

  const result = await db.query(`DELETE FROM users WHERE id = uuid_to_bin(?)`, [
    id,
  ])

  let message = 'Error in deleting user'

  if (result.affectedRows) {
    message = 'User deleted successfully'
  }

  return { message }
}

module.exports = {
  getUsers,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
}
