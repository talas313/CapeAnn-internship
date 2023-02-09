const db = require('./db');
const helper = require('../helper');

//getAllOrderDetails function: returns all order details
async function getAllOrderDetails() {
  const rows = await db.query(
    `SELECT bin_to_uuid(id) as id, name, price, size, quantity, total_price, bin_to_uuid(pizzaId) as pizzaId, bin_to_uuid(orderId) as orderId, bin_to_uuid(userId) as userId 
     FROM order_details`
  );
  const data = helper.emptyOrRows(rows);

  return {
    data,
  };
}

//function getOrderDetails returns order details for order via id
async function getOrderDetails(id) {
  const rows = await db.query(
    `SELECT bin_to_uuid(order_details.id) as id, name, price, size, quantity, order_details.total_price, bin_to_uuid(pizzaId) as pizzaId, bin_to_uuid(orderId) as orderId, bin_to_uuid(order_details.userId) as userId
     FROM order_details 
     INNER JOIN orders ON orders.id=order_details.orderId
     WHERE orders.id=uuid_to_bin('${id}')`
  );
  const data = helper.emptyOrRows(rows);

  return {
    data,
  };
}

//function createOrderDetails inserts new order details into the database
async function createOrderDetails(orderDetails) {
  const result = await db.query(
    `INSERT INTO order_details(id, name, price, size, quantity, total_price, pizzaId, orderId, userId) 
     VALUE(uuid_to_bin(uuid()), '${orderDetails.name}', '${orderDetails.price}', '${orderDetails.size}', '${orderDetails.quantity}', '${orderDetails.total_price}', uuid_to_bin('${orderDetails.pizzaId}'), uuid_to_bin('${orderDetails.orderId}'), uuid_to_bin('${orderDetails.userId}'))`
  );

  let message = 'Error in creating new order details';

  if (result.affectedRows) {
    message = 'New order details are created successfully';
  }

  return { message };
}

//function updateOrderDetails updates order details for one order
async function updateOrderDetails(id, orderDetails) {
  const result = await db.query(
    `UPDATE order_details 
     SET name="${orderDetails.name}", price="${orderDetails.price}", size="${orderDetails.size}", quantity = "${orderDetails.quantity}", total_price="${orderDetails.total_price}", pizzaId = uuid_to_bin('${orderDetails.pizzaId}'), userId = uuid_to_bin('${orderDetails.userId}')
     WHERE id=uuid_to_bin('${id}')`
  );

  let message = 'Error in updating pizza';

  if (result.affectedRows) {
    message = 'Pizza updated successfully';
  }

  return { message };
}

//function removeOrderDetails removes order details for one order
async function removeOrderDetails(id) {
  const result = await db.query(
    `DELETE FROM order_details WHERE id=uuid_to_bin('${id}')`
  );

  let message = 'Error in deleting order details';

  if (result.affectedRows) {
    message = `Order details for ID=${id} are deleted successfully`;
  }

  return { message };
}

module.exports = {
  getAllOrderDetails,
  getOrderDetails,
  createOrderDetails,
  updateOrderDetails,
  removeOrderDetails,
};
