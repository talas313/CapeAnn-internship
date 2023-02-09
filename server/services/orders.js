const db = require('./db')
const helper = require('../helper')
const router = require('../routes/pizza')

//getAll function gets all orders from the database
async function getAll() {
  const rows = await db.query(
    `SELECT bin_to_uuid(id) as id, address, card, time_placed, total_price, bin_to_uuid(userId) as userId
     FROM orders`
  )
  const data = helper.emptyOrRows(rows)

  return {
    data,
  }
}

//return order by id from user from the database
async function getOrder(id) {
  const rows = await db.query(
    `SELECT bin_to_uuid(orders.id) as id, address, card, time_placed, total_price, bin_to_uuid(users.id) as userId
     FROM orders
     INNER JOIN users ON orders.userId = users.id
     WHERE orders.userId=uuid_to_bin('${id}')`
  )
  const data = helper.emptyOrRows(rows)

  return {
    data,
  }
}

//createOrder function inserts a new order into the database
async function createOrder(orders) {
  const result = await db.query(
    `INSERT INTO orders
     (id, address, card, total_price, userId)
     VALUE
     (uuid_to_bin(uuid()), "${orders.address}", "${orders.card}", "${orders.total_price}", uuid_to_bin('${orders.userId}'))`
  )
  let message = 'Error in creating new order'

  if (result.affectedRows) {
    message = 'New order is created successfully'
  }
  return {
    message,
  }
}

//updateOrder function updates one order in database
async function updateOrder(id, orders) {
  const result = await db.query(
    `UPDATE orders
     SET address="${orders.address}", card="${orders.card}", total_price="${orders.total_price}", userId=uuid_to_bin('${orders.userId}')
     WHERE id=uuid_to_bin('${id}')`
  )
  let message = 'Error in updating order'

  if (result.affectedRows) {
    message = 'Order updated successfully'
  }
  return {
    message,
  }
}

//removeOrder function removes one order in the database
async function removeOrder(id) {
  await db.query(`DELETE FROM order_details WHERE orderId=uuid_to_bin('${id}')`)

  const result = await db.query(
    `DELETE FROM orders WHERE id=uuid_to_bin('${id}')`
  )
  let message = 'Error in deleting order'

  if (result.affectedRows) {
    message = 'Order is deleted successfully'
  }
  return {
    message,
  }
}

module.exports = {
  getAll,
  createOrder,
  updateOrder,
  removeOrder,
  getOrder,
}
