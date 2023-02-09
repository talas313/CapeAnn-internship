const db = require('./db');
const helper = require('../helper');

//getSizes function returns all pizza-sizes from the database
async function getSizes() {
  const rows = await db.query(
    `SELECT bin_to_uuid(id) as id, size, price, bin_to_uuid(pizzaId) as pizzaId 
     FROM pizza_size`
  );
  const data = helper.emptyOrRows(rows);

  return {
    data,
  };
}

//getSizeByPizzaId function returns pizza-size by pizzaId from the database
async function getSizeByPizzaId(pizzaId) {
  const rows = await db.query(
    `SELECT bin_to_uuid(id) as id, size, price, bin_to_uuid(pizzaId) as pizzaId 
     FROM pizza_size 
     WHERE pizzaId = uuid_to_bin(?)`,
    [pizzaId]
  );
  const data = helper.emptyOrRows(rows);

  return {
    data,
  };
}

//createSize function inserts a new pizza-size into the database
async function createSize(pizzaSize) {
  const result = await db.query(
    `INSERT INTO pizza_size(id, size, price, pizzaId) 
     VALUES(uuid_to_bin(uuid()),?,?,uuid_to_bin(?))`,
    [pizzaSize.size, pizzaSize.price, pizzaSize.pizzaId]
  );

  let message = 'Error in creating new size';

  if (result.affectedRows) {
    message = 'New size is created successfully';
  }

  return { message };
}

//updateSize function updates one pizza-size in the database
async function updateSize(id, pizzaSize) {
  const result = await db.query(
    `UPDATE pizza_size 
     SET size = ?, price = ?, pizzaId = uuid_to_bin(?) 
     WHERE id = uuid_to_bin(?)`,
    [pizzaSize.size, pizzaSize.price, pizzaSize.pizzaId, id]
  );

  let message = 'Error in updating size';

  if (result.affectedRows) {
    message = 'Size updated successfully';
  }

  return { message };
}

//deleteSize function deletes one pizza-size in the database
async function deleteSize(id) {
  const result = await db.query(
    `DELETE FROM pizza_size WHERE id = uuid_to_bin(?)`,
    [id]
  );

  let message = 'Error in deleting size';

  if (result.affectedRows) {
    message = 'Size deleted successfully';
  }

  return { message };
}

module.exports = {
  getSizes,
  getSizeByPizzaId,
  createSize,
  updateSize,
  deleteSize,
};
